// Configuración pública de Supabase para LYNX.
// La publishable/anon key puede estar en el navegador: la seguridad real está en RLS.
// NUNCA coloques aquí la secret key ni la service_role key.
window.LYNX_SUPABASE_CONFIG = {
    url: 'https://vousorxqvjkurqvozrat.supabase.co',
    publishableKey: 'sb_publishable_xbOzrw6XIbLQ4iHS3FayyQ_jf2KLhSs'
};

window.getLynxSupabase = function getLynxSupabase() {
    const config = window.LYNX_SUPABASE_CONFIG;
    const sdk = window.supabase;
    if (!sdk?.createClient || !config?.url || !config?.publishableKey) return null;

    if (!window.__lynxSupabaseClient) {
        window.__lynxSupabaseClient = sdk.createClient(config.url, config.publishableKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
    }
    return window.__lynxSupabaseClient;
};
