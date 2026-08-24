import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const clean = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] || char)

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const authorization = request.headers.get('Authorization')
    if (!authorization) throw new Error('Sesión no válida.')
    const { productId } = await request.json().catch(() => ({})) as { productId?: number }
    if (!Number.isInteger(Number(productId))) throw new Error('Producto no válido.')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const mailBridgeUrl = Deno.env.get('LYNX_MAIL_URL')!
    const mailBridgeSecret = Deno.env.get('LYNX_MAIL_SECRET')!

    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authorization } } })
    const { data: { user }, error: userError } = await userClient.auth.getUser()
    if (userError || !user) throw new Error('Sesión no válida.')

    const admin = createClient(supabaseUrl, serviceKey)
    const { data: access } = await admin.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
    if (!access) throw new Error('No tienes permiso para enviar avisos.')

    const { data: product, error: productError } = await admin.from('products')
      .select('id,title,slug,stock,status,size_stock').eq('id', productId).single()
    if (productError || !product) throw new Error('Producto no encontrado.')
    if (Number(product.stock || 0) < 1 || product.status === 'sold_out') throw new Error('El producto todavía no tiene stock disponible.')

    const { data: requests, error: requestError } = await admin.from('restock_requests')
      .select('id,email,requested_size').eq('product_id', productId).eq('status', 'pending').order('created_at')
    if (requestError) throw requestError

    const available = (requests || []).filter(item => {
      const stockBySize = product.size_stock || {}
      return !(item.requested_size in stockBySize) || Number(stockBySize[item.requested_size] || 0) > 0
    })
    let sent = 0
    const failed: string[] = []
    for (const item of available) {
      const response = await fetch(mailBridgeUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: mailBridgeSecret,
          to: item.email,
          subject: `${product.title} volvió a LYNX`,
          html: `<div style="margin:0;background:#090909;color:#fff;padding:42px 24px;font-family:Arial,sans-serif"><div style="max-width:560px;margin:auto"><p style="color:#e1bb38;letter-spacing:3px;font-size:12px;font-weight:700">LYNX BOUTIQUE</p><h1 style="margin:12px 0 20px;font-size:32px">VOLVIÓ TU TALLA</h1><p style="color:#ddd;line-height:1.6"><strong>${clean(product.title)}</strong> ya está disponible en talla <strong>${clean(item.requested_size)}</strong>.</p><p style="margin:28px 0"><a href="https://www.lynx.pe/producto/${encodeURIComponent(product.slug)}" style="display:inline-block;background:#e1bb38;color:#090909;padding:15px 24px;text-decoration:none;font-weight:800">VER LA PRENDA</a></p><p style="color:#aaa;line-height:1.6">El stock es limitado y puede agotarse nuevamente.</p></div></div>`,
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) { failed.push(item.email); continue }
      await admin.from('restock_requests').update({ status: 'notified', notified_at: new Date().toISOString() }).eq('id', item.id)
      sent += 1
    }

    return Response.json({ sent, pending: (requests || []).length, failed }, { headers: corsHeaders })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400, headers: corsHeaders })
  }
})
