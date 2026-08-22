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
    const { orderId } = await request.json()
    if (!orderId) throw new Error('Pedido inválido.')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const mailBridgeUrl = Deno.env.get('LYNX_MAIL_URL')!
    const mailBridgeSecret = Deno.env.get('LYNX_MAIL_SECRET')!

    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authorization } } })
    const { data: { user }, error: userError } = await userClient.auth.getUser()
    if (userError || !user) throw new Error('Sesión no válida.')

    const admin = createClient(supabaseUrl, serviceKey)
    const { data: role } = await admin.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
    if (!role) throw new Error('Acceso no autorizado.')

    const { data: order, error } = await admin.from('orders').select('*,order_items(*)').eq('id', orderId).maybeSingle()
    if (error || !order) throw new Error('Pedido no encontrado.')
    if (!['confirmed','paid','shipped','completed'].includes(order.status)) throw new Error('El pedido todavía no está confirmado.')

    const rows = (order.order_items || []).map((item: Record<string, unknown>) =>
      `<tr><td style="padding:8px;border-bottom:1px solid #2b2b2b">${item.quantity}× ${item.product_title}<br><small>Talla ${item.size}</small></td><td style="padding:8px;border-bottom:1px solid #2b2b2b;text-align:right">S/ ${Number(item.line_total).toFixed(2)}</td></tr>`
    ).join('')
    const html = `<div style="background:#080808;color:#f8f5ec;padding:38px;font-family:Arial,sans-serif;max-width:620px;margin:auto"><p style="color:#d9b632;letter-spacing:2px;font-size:12px">LYNX BOUTIQUE</p><h1 style="margin:8px 0 20px">PEDIDO CONFIRMADO</h1><p>Hola ${order.customer_name}, confirmamos tu pedido <strong style="color:#d9b632">${order.order_code}</strong>.</p><table style="width:100%;border-collapse:collapse;margin:24px 0">${rows}<tr><td style="padding:12px 8px;font-weight:bold">TOTAL</td><td style="padding:12px 8px;text-align:right;font-weight:bold;color:#d9b632">S/ ${Number(order.total).toFixed(2)}</td></tr></table><p>Entrega: ${order.shipping_method === 'shalom' ? 'Shalom · flete pagado en agencia' : 'Motorizado en Lima'}.</p><p style="color:#aaa;font-size:12px;line-height:1.6">Guarda este correo. Te avisaremos por WhatsApp cuando tu pedido cambie de estado.</p></div>`

    const emailResponse = await fetch(mailBridgeUrl, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: mailBridgeSecret, to: order.customer_email, subject: `Pedido ${order.order_code} confirmado · LYNX`, html }),
    })
    const result = await emailResponse.json().catch(() => null)
    if (!emailResponse.ok || !result?.ok) throw new Error('No se pudo enviar el correo.')
    return Response.json({ sent: true }, { headers: corsHeaders })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400, headers: corsHeaders })
  }
})
