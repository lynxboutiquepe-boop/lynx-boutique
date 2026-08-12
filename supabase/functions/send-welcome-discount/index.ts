import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const authorization = request.headers.get('Authorization')
    if (!authorization) throw new Error('Sesión no válida.')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const resendKey = Deno.env.get('RESEND_API_KEY')!
    const fromEmail = Deno.env.get('DISCOUNT_FROM_EMAIL') || 'LYNX Boutique <lynxboutique.pe@gmail.com>'

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
    })
    const { data: { user }, error: userError } = await userClient.auth.getUser()
    if (userError || !user?.email || !user.email_confirmed_at) throw new Error('Primero verifica tu correo.')

    const admin = createClient(supabaseUrl, serviceKey)
    const { data: existing } = await admin.from('welcome_discount_codes')
      .select('code,sent_at').eq('user_id', user.id).maybeSingle()
    if (existing?.sent_at) return Response.json({ sent: true }, { headers: corsHeaders })

    const code = existing?.code || `LYNX10-${crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()}`
    await admin.from('welcome_discount_codes').upsert({ user_id: user.id, email: user.email, code })

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: [user.email],
        subject: 'Tu 10% de descuento en LYNX',
        html: `<div style="background:#090909;color:#fff;padding:40px;font-family:Arial,sans-serif"><h1 style="color:#e1bb38">BIENVENIDO A LYNX</h1><p>Tu correo ya está verificado. Este es tu código privado para la primera compra:</p><p style="font-size:30px;font-weight:800;letter-spacing:3px">${code}</p><p>También te avisaremos sobre promociones, nuevo stock y nuestros próximos lives.</p><p style="color:#999;font-size:12px">Si no deseas recibir novedades, puedes cancelar la suscripción desde cualquiera de nuestros correos.</p></div>`,
      }),
    })
    if (!emailResponse.ok) throw new Error('No se pudo enviar el correo de descuento.')

    await admin.from('welcome_discount_codes').update({ sent_at: new Date().toISOString() }).eq('user_id', user.id)
    await admin.from('customer_profiles').update({ welcome_discount_sent_at: new Date().toISOString() }).eq('user_id', user.id)
    return Response.json({ sent: true }, { headers: corsHeaders })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400, headers: corsHeaders })
  }
})
