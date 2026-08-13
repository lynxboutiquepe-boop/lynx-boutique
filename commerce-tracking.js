(function () {
    const STORAGE_KEY = 'lynx_commerce_events_v1';
    const SESSION_KEY = 'lynx_session_id_v1';
    const MAX_LOCAL_EVENTS = 200;

    function sessionId() {
        let value = sessionStorage.getItem(SESSION_KEY);
        if (!value) {
            value = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
            sessionStorage.setItem(SESSION_KEY, value);
        }
        return value;
    }

    function deviceType() {
        if (matchMedia('(max-width: 600px)').matches) return 'mobile';
        if (matchMedia('(max-width: 1024px)').matches) return 'tablet';
        return 'desktop';
    }

    function cleanPayload(payload) {
        return Object.fromEntries(Object.entries(payload || {}).filter(([, value]) => value !== undefined && value !== null));
    }

    function saveLocally(event) {
        try {
            const events = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            events.push(event);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_LOCAL_EVENTS)));
        } catch (_) {}
    }

    async function persist(event) {
        const client = window.getLynxSupabase?.();
        if (!client) return;
        try {
            await client.from('commerce_events').insert({
                session_id: event.session_id,
                event_name: event.event_name,
                page_path: event.page_path,
                device_type: event.device_type,
                source: event.source,
                payload: event.payload
            });
        } catch (_) {
            // La analítica nunca debe impedir una compra.
        }
    }

    function track(eventName, payload = {}) {
        const event = {
            event_name: String(eventName),
            session_id: sessionId(),
            page_path: location.pathname + location.search,
            device_type: deviceType(),
            source: new URLSearchParams(location.search).get('utm_source') || document.referrer || 'direct',
            payload: cleanPayload(payload),
            created_at: new Date().toISOString()
        };
        saveLocally(event);
        persist(event);
        if (typeof window.gtag === 'function') window.gtag('event', event.event_name, event.payload);
        window.dispatchEvent(new CustomEvent('lynx:commerce-event', { detail: event }));
        return event;
    }

    window.LynxTracking = { track };
    document.addEventListener('DOMContentLoaded', () => track('page_view', { title: document.title }));
}());
