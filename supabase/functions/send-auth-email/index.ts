import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const mailBridgeUrl = Deno.env.get('LYNX_MAIL_URL')!
const mailBridgeSecret = Deno.env.get('LYNX_MAIL_SECRET')!
const hookSecret = (Deno.env.get('SEND_EMAIL_HOOK_SECRET') || '').replace('v1,whsec_', '')

function verificationUrl(tokenHash: string, actionType: string, redirectTo: string) {
  const query = new URLSearchParams({
    token: tokenHash,
    type: actionType,
    redirect_to: redirectTo || 'https://www.lynx.pe/',
  })
  return `${supabaseUrl}/auth/v1/verify?${query}`
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') return new Response('Not allowed', { status: 405 })
  try {
    const payload = await request.text()
    const headers = Object.fromEntries(request.headers)
    const webhook = new Webhook(hookSecret)
    const { user, email_data } = webhook.verify(payload, headers) as {
      user: { email: string }
      email_data: { token_hash: string; redirect_to: string; email_action_type: string }
    }

    const confirmUrl = verificationUrl(email_data.token_hash, email_data.email_action_type, email_data.redirect_to)
    const html = `<div style="background:#090909;color:#fff;padding:40px;font-family:Arial,sans-serif"><p style="color:#e1bb38;letter-spacing:3px;font-size:12px">LYNX BOUTIQUE</p><h1>Verifica tu correo</h1><p>Confirma que este correo es tuyo para recibir tu cÃ³digo privado del 10% en tu primera compra.</p><p style="margin:32px 0"><a href="${confirmUrl}" style="background:#e1bb38;color:#090909;padding:15px 24px;text-decoration:none;font-weight:800">VERIFICAR MI CORREO</a></p><p>TambiÃ©n te avisaremos sobre promociones, nuevo stock y nuestros prÃ³ximos lives.</p><p style="color:#999;font-size:12px">Si no solicitaste este registro, ignora este mensaje.</p></div>`

    const mailResponse = await fetch(mailBridgeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: mailBridgeSecret,
        to: user.email,
        subject: 'Verifica tu correo y recibe 10% en LYNX',
        html,
      }),
    })
    const mailResult = await mailResponse.json().catch(() => null)
    if (!mailResponse.ok || !mailResult?.ok) throw new Error(mailResult?.error || 'No se pudo enviar el correo')
    return Response.json({})
  } catch (error) {
    return Response.json(
      { error: { http_code: 401, message: error instanceof Error ? error.message : 'Solicitud no vÃ¡lida' } },
      { status: 401 },
    )
  }
})
