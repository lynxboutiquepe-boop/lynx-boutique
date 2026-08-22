const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const client = window.getLynxSupabase?.() || null;
const PENDING_EMAIL_KEY = 'lynx_account_pending_email';
const PENDING_MARKETING_KEY = 'lynx_account_pending_marketing';
let currentUser = null;
let currentProfile = null;

function safeReturnTarget() {
    const candidate = new URLSearchParams(location.search).get('return') || '';
    return candidate.startsWith('/') && !candidate.startsWith('//') ? candidate : '';
}

function accountError(error) {
    const message = String(error?.message || error || 'No pudimos completar la operación.');
    if (/expired|invalid.*token|token.*invalid/i.test(message)) return 'El código no es válido o ya expiró. Solicita uno nuevo.';
    if (/rate limit|too many/i.test(message)) return 'Hiciste varios intentos. Espera unos minutos antes de volver a probar.';
    if (/network|fetch/i.test(message)) return 'No pudimos conectarnos. Revisa tu internet y vuelve a intentar.';
    return message;
}

function setMessage(id, message = '', success = false) {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = message;
    element.classList.toggle('success', success);
}

function setLoading(button, loading, text) {
    if (!button) return;
    if (loading) {
        button.dataset.label = button.innerHTML;
        button.disabled = true;
        button.textContent = text;
    } else {
        button.disabled = false;
        if (button.dataset.label) button.innerHTML = button.dataset.label;
        window.lucide?.createIcons();
    }
}

function showEmailView() {
    $('#email-view').hidden = false;
    $('#otp-view').hidden = true;
    setMessage('login-message');
    setMessage('otp-message');
}

function showOtpView(email) {
    $('#email-view').hidden = true;
    $('#otp-view').hidden = false;
    $('#otp-copy').textContent = `Enviamos un código de acceso a ${email}. Escríbelo para entrar de forma segura.`;
    $('#login-otp').value = '';
    window.setTimeout(() => $('#login-otp')?.focus(), 120);
    window.lucide?.createIcons();
}

async function loadProfile() {
    if (!client || !currentUser) return null;
    const { data, error } = await client
        .from('customer_profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .maybeSingle();
    if (error) throw error;

    if (data) {
        currentProfile = data;
        return data;
    }

    const fallback = {
        user_id: currentUser.id,
        full_name: '',
        phone: '',
        email: currentUser.email || '',
        email_verified: Boolean(currentUser.email_confirmed_at),
        marketing_opt_in: false
    };
    const { data: created, error: createError } = await client
        .from('customer_profiles')
        .upsert(fallback, { onConflict: 'user_id' })
        .select('*')
        .single();
    if (createError) throw createError;
    currentProfile = created;
    return created;
}

function customerName() {
    const profileName = String(currentProfile?.full_name || '').trim();
    if (profileName) return profileName;
    return String(currentUser?.email || 'Cliente LYNX').split('@')[0];
}

function renderDashboard() {
    const name = customerName();
    const firstName = name.split(/\s+/)[0] || 'LYNX';
    const email = currentUser?.email || currentProfile?.email || '';
    $('#sidebar-name').textContent = name;
    $('#identity-mark').textContent = firstName.charAt(0).toUpperCase();
    $('#welcome-name').textContent = firstName.toUpperCase();
    $('#overview-email').textContent = email;
    $('#profile-name').value = currentProfile?.full_name || '';
    $('#profile-phone').value = currentProfile?.phone || '';
    $('#profile-email').value = email;
    $('#notification-marketing').checked = Boolean(currentProfile?.marketing_opt_in);
    $('#discount-status').textContent = currentProfile?.welcome_discount_sent_at
        ? 'Tu código privado fue enviado por correo'
        : 'Se envía a tu correo después de verificarlo';
    $('#auth-shell').hidden = true;
    $('#dashboard-shell').hidden = false;
    window.lucide?.createIcons();
}

function showAuth() {
    $('#dashboard-shell').hidden = true;
    $('#auth-shell').hidden = false;
    showEmailView();
}

async function applyPendingMarketing() {
    if (!currentUser || sessionStorage.getItem(PENDING_MARKETING_KEY) !== '1') return;
    const now = new Date().toISOString();
    const { error } = await client.from('customer_profiles').upsert({
        user_id: currentUser.id,
        full_name: currentProfile?.full_name || '',
        phone: currentProfile?.phone || '',
        email: currentUser.email || '',
        email_verified: Boolean(currentUser.email_confirmed_at),
        marketing_opt_in: true,
        marketing_opt_in_at: currentProfile?.marketing_opt_in_at || now
    }, { onConflict: 'user_id' });
    if (error) throw error;
    sessionStorage.removeItem(PENDING_MARKETING_KEY);
    await loadProfile();
}

async function requestWelcomeDiscount({ force = false } = {}) {
    if (!client || !currentUser?.email_confirmed_at) return false;
    const status = $('#discount-status');
    if (status) status.textContent = force ? 'Reenviando tu código…' : 'Preparando tu código…';

    try {
        if (force) {
            const { error: resetError } = await client.rpc('request_welcome_discount_resend');
            if (resetError) throw resetError;
        }

        const { data, error } = await client.functions.invoke('send-welcome-discount', {
            body: { force }
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        await loadProfile();
        if (status) status.textContent = data?.alreadySent
            ? 'Tu código privado ya fue enviado a tu correo'
            : 'Código enviado. Revisa también Spam o Promociones';
        return true;
    } catch (error) {
        console.warn('No se pudo enviar el beneficio de bienvenida.', error);
        if (status) status.textContent = 'No pudimos enviarlo. Pulsa “Reenviar código”';
        return false;
    }
}

async function completeSignIn(user) {
    currentUser = user;
    await loadProfile();
    await applyPendingMarketing();
    sessionStorage.removeItem(PENDING_EMAIL_KEY);
    renderDashboard();
    if (currentUser.email_confirmed_at && !currentProfile?.welcome_discount_sent_at) {
        await requestWelcomeDiscount();
    }
    const returnTarget = safeReturnTarget();
    if (returnTarget) window.setTimeout(() => location.replace(returnTarget), 450);
}

async function requestAccessCode(email, marketing, button) {
    if (!client) throw new Error('El acceso a clientes no está disponible en este momento.');
    setLoading(button, true, 'ENVIANDO CÓDIGO...');
    try {
        const redirectTo = location.protocol === 'file:' ? 'https://www.lynx.pe/cuenta' : `${location.origin}/cuenta`;
        const { error } = await client.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: redirectTo,
                shouldCreateUser: true,
                data: { marketing_opt_in: marketing }
            }
        });
        if (error) throw error;
        sessionStorage.setItem(PENDING_EMAIL_KEY, email);
        sessionStorage.setItem(PENDING_MARKETING_KEY, marketing ? '1' : '0');
        showOtpView(email);
    } finally {
        setLoading(button, false);
    }
}

function switchPanel(panelName) {
    $$('.account-nav-link').forEach(button => button.classList.toggle('active', button.dataset.panel === panelName));
    $$('[data-account-panel]').forEach(panel => {
        const active = panel.dataset.accountPanel === panelName;
        panel.hidden = !active;
        panel.classList.toggle('active', active);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindEvents() {
    $('#login-email-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        setMessage('login-message');
        const email = $('#login-email').value.trim();
        try {
            await requestAccessCode(email, $('#login-marketing').checked, event.submitter);
        } catch (error) {
            setMessage('login-message', accountError(error));
        }
    });

    $('#login-otp-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        const email = sessionStorage.getItem(PENDING_EMAIL_KEY) || $('#login-email').value.trim();
        const token = $('#login-otp').value.trim();
        setMessage('otp-message');
        if (!email || !token) {
            setMessage('otp-message', 'Escribe el código que llegó a tu correo.');
            return;
        }
        setLoading(button, true, 'VERIFICANDO...');
        try {
            const { data, error } = await client.auth.verifyOtp({ email, token, type: 'email' });
            if (error) throw error;
            setMessage('otp-message', 'Acceso verificado correctamente.', true);
            await completeSignIn(data.user);
        } catch (error) {
            setMessage('otp-message', accountError(error));
        } finally {
            setLoading(button, false);
        }
    });

    $('#change-email-btn')?.addEventListener('click', () => {
        sessionStorage.removeItem(PENDING_EMAIL_KEY);
        sessionStorage.removeItem(PENDING_MARKETING_KEY);
        showEmailView();
        $('#login-email')?.focus();
    });

    $('#resend-code-btn')?.addEventListener('click', async event => {
        const email = sessionStorage.getItem(PENDING_EMAIL_KEY) || $('#login-email').value.trim();
        if (!email) return showEmailView();
        setMessage('otp-message');
        try {
            await requestAccessCode(email, sessionStorage.getItem(PENDING_MARKETING_KEY) === '1', event.currentTarget);
            setMessage('otp-message', 'Te enviamos un código nuevo.', true);
        } catch (error) {
            setMessage('otp-message', accountError(error));
        }
    });

    $('#resend-discount-btn')?.addEventListener('click', async event => {
        setLoading(event.currentTarget, true, 'REENVIANDO…');
        await requestWelcomeDiscount({ force: true });
        setLoading(event.currentTarget, false);
    });

    $$('.account-nav-link').forEach(button => button.addEventListener('click', () => switchPanel(button.dataset.panel)));

    $('#profile-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        setMessage('profile-message');
        setLoading(button, true, 'GUARDANDO...');
        try {
            const payload = {
                user_id: currentUser.id,
                full_name: $('#profile-name').value.trim(),
                phone: $('#profile-phone').value.trim(),
                email: currentUser.email || '',
                email_verified: Boolean(currentUser.email_confirmed_at),
                marketing_opt_in: Boolean(currentProfile?.marketing_opt_in),
                marketing_opt_in_at: currentProfile?.marketing_opt_in_at || null
            };
            const { error } = await client.from('customer_profiles').upsert(payload, { onConflict: 'user_id' });
            if (error) throw error;
            await loadProfile();
            renderDashboard();
            switchPanel('profile');
            setMessage('profile-message', 'Tus datos se guardaron correctamente.', true);
        } catch (error) {
            setMessage('profile-message', accountError(error));
        } finally {
            setLoading(button, false);
        }
    });

    $('#notification-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        const enabled = $('#notification-marketing').checked;
        setMessage('notification-message');
        setLoading(button, true, 'GUARDANDO...');
        try {
            const { error } = await client.from('customer_profiles').update({
                marketing_opt_in: enabled,
                marketing_opt_in_at: enabled ? (currentProfile?.marketing_opt_in_at || new Date().toISOString()) : null
            }).eq('user_id', currentUser.id);
            if (error) throw error;
            await loadProfile();
            setMessage('notification-message', enabled ? 'Listo. Recibirás las novedades de LYNX.' : 'Desactivamos los correos promocionales.', true);
        } catch (error) {
            setMessage('notification-message', accountError(error));
        } finally {
            setLoading(button, false);
        }
    });

    $('#logout-btn')?.addEventListener('click', async event => {
        setLoading(event.currentTarget, true, 'CERRANDO...');
        await client?.auth.signOut();
        currentUser = null;
        currentProfile = null;
        sessionStorage.removeItem(PENDING_EMAIL_KEY);
        sessionStorage.removeItem(PENDING_MARKETING_KEY);
        showAuth();
        setLoading(event.currentTarget, false);
    });
}

async function initializeAccount() {
    bindEvents();
    window.lucide?.createIcons();
    if (!client) {
        showAuth();
        setMessage('login-message', 'El acceso a clientes no está disponible en este momento.');
        return;
    }

    const { data: { session } } = await client.auth.getSession();
    if (session?.user) {
        try {
            await completeSignIn(session.user);
        } catch (error) {
            showAuth();
            setMessage('login-message', accountError(error));
        }
    } else {
        showAuth();
        const pendingEmail = sessionStorage.getItem(PENDING_EMAIL_KEY);
        if (pendingEmail) {
            $('#login-email').value = pendingEmail;
            showOtpView(pendingEmail);
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeAccount);
