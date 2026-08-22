import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const body = await request.json().catch(() => ({})) as { force?: boolean }
    const force = body.force === true
    const authorization = request.headers.get('Authorization')
    if (!authorization) throw new Error('Sesión no válida.')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const mailBridgeUrl = Deno.env.get('LYNX_MAIL_URL')!
    const mailBridgeSecret = Deno.env.get('LYNX_MAIL_SECRET')!

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
    })
    const { data: { user }, error: userError } = await userClient.auth.getUser()
    if (userError || !user?.email || !user.email_confirmed_at) throw new Error('Primero verifica tu correo.')

    const admin = createClient(supabaseUrl, serviceKey)
    const { data: existing } = await admin.from('welcome_discount_codes')
      .select('code,sent_at').eq('user_id', user.id).maybeSingle()
    if (existing?.sent_at && !force) {
      return Response.json({ sent: true, alreadySent: true }, { headers: corsHeaders })
    }

    const code = existing?.code || `LYNX10-${crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()}`
    const { error: saveError } = await admin.from('welcome_discount_codes').upsert({
      user_id: user.id,
      email: user.email,
      code,
      discount_percent: 10,
    })
    if (saveError) throw new Error(`No pudimos preparar el código: ${saveError.message}`)

    const emailResponse = await fetch(mailBridgeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: mailBridgeSecret,
        to: user.email,
        subject: 'Tu 10% de descuento en LYNX',
        html: `<div style="margin:0;background:#090909;color:#fff;padding:42px 24px;font-family:Arial,sans-serif"><div style="max-width:560px;margin:auto"><p style="color:#e1bb38;letter-spacing:3px;font-size:12px;font-weight:700">LYNX BOUTIQUE</p><h1 style="margin:12px 0 20px;font-size:34px">TU 10% YA ESTÁ LISTO</h1><p style="color:#ddd;line-height:1.6">Tu correo fue verificado. Copia este código y agrégalo en el carrito antes de finalizar tu pedido:</p><div style="margin:28px 0;padding:22px 14px;border:1px solid #e1bb38;background:#15130b;color:#f4d45d;text-align:center;font-size:28px;font-weight:800;letter-spacing:3px">${code}</div><p style="margin:28px 0"><a href="https://www.lynx.pe/#catalog" style="display:inline-block;background:#e1bb38;color:#090909;padding:15px 24px;text-decoration:none;font-weight:800">USAR MI 10% EN LYNX</a></p><p style="color:#ddd;line-height:1.6">Al aplicarlo verás el descuento de inmediato en el carrito y en el total del pedido.</p><p style="color:#aaa;line-height:1.6">También te avisaremos sobre promociones, nuevo stock y nuestros próximos lives.</p><p style="color:#777;font-size:12px;line-height:1.5">Código personal de un solo uso. Si no deseas recibir novedades, puedes cancelar la suscripción desde cualquiera de nuestros correos.</p></div></div>`,
      }),
    })
    const emailResult = await emailResponse.json().catch(() => null)
    if (!emailResponse.ok || !emailResult?.ok) {
      throw new Error(emailResult?.error || `El servicio de correo respondió ${emailResponse.status}.`)
    }

    const sentAt = new Date().toISOString()
    const { error: sentError } = await admin.from('welcome_discount_codes').update({ sent_at: sentAt }).eq('user_id', user.id)
    if (sentError) throw new Error(`El correo salió, pero no pudimos registrar el envío: ${sentError.message}`)
    await admin.from('customer_profiles').update({ welcome_discount_sent_at: sentAt }).eq('user_id', user.id)
    return Response.json({ sent: true, alreadySent: false }, { headers: corsHeaders })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400, headers: corsHeaders })
  }
})
