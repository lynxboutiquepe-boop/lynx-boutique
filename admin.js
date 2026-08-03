const supabaseClient = window.getLynxSupabase?.() || null;
const authFlowType = new URLSearchParams(location.hash.slice(1)).get('type')
    || new URLSearchParams(location.search).get('type');

const STATUS_META = {
    available: { label: 'Disponible', badge: 'DISPONIBLE' },
    low_stock: { label: 'Últimas unidades', badge: 'ÚLTIMAS UNIDADES' },
    preorder: { label: 'Preventa', badge: 'PREVENTA' },
    sold_out: { label: 'Agotado', badge: 'AGOTADO' },
    archived: { label: 'Archivado', badge: 'ARCHIVADO' }
};

const state = {
    user: null,
    products: [],
    sales: [],
    finances: [],
    customers: [],
    reviews: []
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
}

function safeImageUrl(value) {
    const url = String(value || '').trim();
    if (/^(https?:\/\/|assets\/|mockups-finales\/|data:image\/)/i.test(url)) return url;
    return 'assets/logo-transparent.png';
}

function money(value) {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(value || 0));
}

function localDate(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
        .format(new Date(`${value}T12:00:00`));
}

function localDateTime(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
}

function showToast(message, type = 'success') {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.toggle('error', type === 'error');
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3200);
}

function setButtonLoading(button, isLoading, loadingLabel = 'Guardando...') {
    if (!button) return;
    if (isLoading) {
        button.dataset.originalHtml = button.innerHTML;
        button.disabled = true;
        button.textContent = loadingLabel;
    } else {
        button.disabled = false;
        if (button.dataset.originalHtml) button.innerHTML = button.dataset.originalHtml;
    }
}

function showLogin(message = '') {
    $('#admin-app').hidden = true;
    $('#login-shell').hidden = false;
    $('#login-form').hidden = false;
    $('#set-password-form').hidden = true;
    $('#login-message').textContent = message;
    lucide.createIcons();
}

function showAdmin() {
    $('#login-shell').hidden = true;
    $('#admin-app').hidden = false;
    $('#admin-email').textContent = state.user?.email || '';
    lucide.createIcons();
}

function showPasswordSetup(user) {
    state.user = user;
    $('#admin-app').hidden = true;
    $('#login-shell').hidden = false;
    $('#login-form').hidden = true;
    $('#set-password-form').hidden = false;
    $('#set-password-message').textContent = '';
    lucide.createIcons();
}

async function verifyAdmin(user) {
    if (!user || !supabaseClient) return false;
    const { data, error } = await supabaseClient
        .from('admin_users')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();
    if (error) throw error;
    return Boolean(data);
}

async function initialize() {
    $('#finance-date').value = new Date().toISOString().slice(0, 10);

    if (!supabaseClient) {
        $('#setup-warning').hidden = false;
        $$('#login-form input, #login-form button').forEach(control => { control.disabled = true; });
        showLogin('El panel está preparado, pero todavía falta conectar el proyecto de Supabase.');
        return;
    }

    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session?.user) {
        showLogin();
        return;
    }

    try {
        if (!await verifyAdmin(session.user)) {
            await supabaseClient.auth.signOut();
            showLogin('Este usuario no tiene permisos de administrador.');
            return;
        }
        if (authFlowType === 'invite' || authFlowType === 'recovery') {
            showPasswordSetup(session.user);
            return;
        }
        state.user = session.user;
        showAdmin();
        await loadAll();
    } catch (error) {
        showLogin(`No se pudo verificar el acceso: ${error.message}`);
    }
}

async function loadAll() {
    const [{ data: products, error: productError }, { data: sales, error: salesError }, { data: finances, error: financeError }, { data: customers, error: customerError }, { data: reviews, error: reviewError }] = await Promise.all([
        supabaseClient.rpc('get_admin_products'),
        supabaseClient.from('sales').select('*, products(title)').order('created_at', { ascending: false }).limit(1000),
        supabaseClient.from('finance_entries').select('*').order('entry_date', { ascending: false }).order('created_at', { ascending: false }).limit(500),
        supabaseClient.from('customer_profiles').select('*').order('created_at', { ascending: false }).limit(2000),
        supabaseClient.from('customer_reviews').select('*').order('created_at', { ascending: false }).limit(500)
    ]);

    if (productError) throw productError;
    if (salesError) throw salesError;
    if (financeError) throw financeError;
    if (customerError) throw customerError;
    if (reviewError) throw reviewError;

    state.products = products || [];
    state.sales = sales || [];
    state.finances = finances || [];
    state.customers = customers || [];
    state.reviews = reviews || [];
    renderEverything();
}

function renderEverything() {
    renderStats();
    renderProducts();
    renderSales();
    renderFinanceChart();
    renderFinance();
    renderCustomers();
    renderReviews();
    renderSaleProducts();
    renderAttention();
    lucide.createIcons();
}

function currentMonthEntries() {
    const now = new Date();
    const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return state.finances.filter(entry => String(entry.entry_date).startsWith(prefix));
}

function renderStats() {
    const visibleProducts = state.products.filter(product => product.status !== 'archived');
    const sellableProducts = visibleProducts.filter(product => Number(product.stock || 0) > 0);
    const costedProducts = sellableProducts.filter(product => Number(product.cost || 0) > 0);
    const entries = currentMonthEntries();
    const income = entries.filter(entry => entry.entry_type === 'income').reduce((sum, entry) => sum + Number(entry.amount), 0);
    const expense = entries.filter(entry => entry.entry_type === 'expense').reduce((sum, entry) => sum + Number(entry.amount), 0);
    const accountBalance = state.finances.reduce(
        (total, entry) => total + (entry.entry_type === 'income' ? Number(entry.amount) : -Number(entry.amount)),
        0
    );
    const inventoryUnits = sellableProducts.reduce((sum, product) => sum + Number(product.stock || 0), 0);
    const inventoryValue = sellableProducts.reduce(
        (sum, product) => sum + (Number(product.price || 0) * Number(product.stock || 0)),
        0
    );
    const inventoryCost = costedProducts.reduce(
        (sum, product) => sum + (Number(product.cost || 0) * Number(product.stock || 0)),
        0
    );
    const costedRevenue = costedProducts.reduce(
        (sum, product) => sum + (Number(product.price || 0) * Number(product.stock || 0)),
        0
    );
    const costedUnits = costedProducts.reduce((sum, product) => sum + Number(product.stock || 0), 0);

    $('#stat-products').textContent = visibleProducts.length;
    $('#stat-stock').textContent = inventoryUnits;
    $('#stat-preorder').textContent = visibleProducts.filter(product => product.status === 'preorder').length;
    $('#stat-soldout').textContent = visibleProducts.filter(product => product.status === 'sold_out').length;
    $('#stat-income').textContent = money(income);
    $('#stat-expense').textContent = money(expense);
    $('#stat-balance').textContent = money(income - expense);
    $('#stat-account-balance').textContent = money(accountBalance);
    $('#stat-inventory-value').textContent = money(inventoryValue);
    $('#stat-inventory-units').textContent = `${inventoryUnits} ${inventoryUnits === 1 ? 'unidad' : 'unidades'}`;
    $('#stat-inventory-cost').textContent = money(inventoryCost);
    $('#stat-costed-revenue').textContent = money(costedRevenue);
    $('#stat-inventory-profit').textContent = money(costedRevenue - inventoryCost);
    $('#stat-costed-units').textContent = `Ganancia calculada sobre ${costedUnits} ${costedUnits === 1 ? 'prenda' : 'prendas'} con costo registrado.`;
    $('#stat-customers').textContent = state.customers.length;
    $('#stat-subscribers').textContent = state.customers.filter(customer => customer.email_verified && customer.marketing_opt_in).length;
    const hour = new Date().getHours();
    $('#dashboard-greeting').textContent = `${hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches'}, LYNX`;
    $('#dashboard-date').textContent = new Intl.DateTimeFormat('es-PE', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());

    const recent = state.finances.slice(0, 5);
    $('#recent-finance-list').innerHTML = recent.length ? recent.map(entry => `
        <div class="mini-item">
            <div><strong>${escapeHtml(entry.description)}</strong><span>${localDate(entry.entry_date)} · ${escapeHtml(entry.category)}</span></div>
            <b class="amount-${entry.entry_type}">${entry.entry_type === 'income' ? '+' : '-'}${money(entry.amount)}</b>
        </div>
    `).join('') : '<p class="empty-state">Todavía no hay movimientos.</p>';
}

function renderFinanceChart() {
    const formatter = new Intl.DateTimeFormat('es-PE', { month: 'short' });
    const months = Array.from({ length: 6 }, (_, index) => {
        const date = new Date();
        date.setDate(1);
        date.setMonth(date.getMonth() - (5 - index));
        const prefix = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const entries = state.finances.filter(entry => String(entry.entry_date).startsWith(prefix));
        return {
            label: formatter.format(date).replace('.', ''),
            income: entries.filter(entry => entry.entry_type === 'income').reduce((sum, entry) => sum + Number(entry.amount), 0),
            expense: entries.filter(entry => entry.entry_type === 'expense').reduce((sum, entry) => sum + Number(entry.amount), 0)
        };
    });
    const max = Math.max(1, ...months.flatMap(month => [month.income, month.expense]));
    $('#finance-chart').innerHTML = months.map(month => `
        <div class="chart-month"><div class="chart-bars"><i class="income-bar" style="height:${Math.max(3, month.income / max * 100)}%" title="Ingresos: ${money(month.income)}"></i><i class="expense-bar" style="height:${Math.max(3, month.expense / max * 100)}%" title="Gastos: ${money(month.expense)}"></i></div><span>${escapeHtml(month.label)}</span></div>
    `).join('');
}

function renderSales() {
    const monthSales = state.sales.filter(sale => {
        const date = new Date(sale.created_at);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    });
    const total = monthSales.reduce((sum, sale) => sum + Number(sale.total), 0);
    const units = monthSales.reduce((sum, sale) => sum + Number(sale.quantity), 0);
    $('#sales-summary').innerHTML = `<article><span>VENTAS DEL MES</span><strong>${monthSales.length}</strong></article><article><span>UNIDADES VENDIDAS</span><strong>${units}</strong></article><article class="highlight"><span>INGRESO GENERADO</span><strong>${money(total)}</strong></article>`;
    const rows = state.sales.map(sale => `<tr><td>${localDateTime(sale.created_at)}</td><td><strong>${escapeHtml(sale.products?.title || 'Producto')}</strong></td><td>${sale.quantity}</td><td>${money(sale.unit_price)}</td><td class="amount-income">${money(sale.total)}</td><td>${escapeHtml(sale.note || '—')}</td></tr>`).join('');
    $('#sales-tbody').innerHTML = rows || '<tr><td class="empty-state" colspan="6">Todavía no hay ventas registradas.</td></tr>';
    $('#mobile-sales-list').innerHTML = state.sales.length ? state.sales.map(sale => `<article class="mobile-sale-card"><div><strong>${escapeHtml(sale.products?.title || 'Producto')}</strong><span>${localDateTime(sale.created_at)} · ${sale.quantity} und.</span></div><b>${money(sale.total)}</b></article>`).join('') : '<p class="empty-state">Todavía no hay ventas registradas.</p>';
}

function renderAttention() {
    const attention = state.products
        .filter(product => ['low_stock', 'sold_out', 'preorder'].includes(product.status))
        .slice(0, 8);
    $('#attention-list').innerHTML = attention.length ? attention.map(product => `
        <div class="attention-item">
            <div><strong>${escapeHtml(product.title)}</strong><span>${STATUS_META[product.status].label}</span></div>
            <b>${product.status === 'preorder' ? '—' : `${product.stock} und.`}</b>
        </div>
    `).join('') : '<p class="empty-state">El inventario no requiere atención.</p>';
}

function productStatusOptions(selected) {
    return Object.entries(STATUS_META).map(([value, meta]) =>
        `<option value="${value}" ${value === selected ? 'selected' : ''}>${meta.label}</option>`
    ).join('');
}

function filteredProducts() {
    const query = $('#product-search').value.trim().toLowerCase();
    const status = $('#product-status-filter').value;
    return state.products.filter(product => {
        const matchesQuery = !query || product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
        const matchesStatus = status === 'all' || product.status === status;
        return matchesQuery && matchesStatus;
    });
}

function renderProducts() {
    const products = filteredProducts();
    const rows = products.map(product => {
        const image = safeImageUrl(product.images?.[0]);
        return `
            <tr>
                <td><div class="product-cell"><img src="${escapeHtml(image)}" alt=""><div><strong>${escapeHtml(product.title)}</strong><span>${escapeHtml(product.category)}</span></div></div></td>
                <td><select class="status-select product-status-control" data-id="${product.id}">${productStatusOptions(product.status)}</select></td>
                <td><label class="quick-edit"><span>S/</span><input class="quick-product-value" data-id="${product.id}" data-field="price" type="number" min="0" step="0.01" value="${Number(product.price || 0)}" aria-label="Precio de ${escapeHtml(product.title)}"></label></td>
                <td><label class="quick-edit stock"><input class="quick-product-value" data-id="${product.id}" data-field="stock" type="number" min="0" step="1" value="${Number(product.stock || 0)}" aria-label="Stock de ${escapeHtml(product.title)}"><span>und.</span></label></td>
                <td>${escapeHtml((product.sizes || []).join(', ') || '—')}</td>
                <td><div class="row-actions"><button class="row-action edit-product" data-id="${product.id}" title="Editar"><i data-lucide="pencil"></i></button><button class="row-action delete delete-product" data-id="${product.id}" title="Eliminar"><i data-lucide="trash-2"></i></button></div></td>
            </tr>`;
    }).join('');

    $('#products-tbody').innerHTML = rows || '<tr><td class="empty-state" colspan="6">No se encontraron productos.</td></tr>';
    $('#mobile-product-list').innerHTML = products.length ? products.map(product => `
        <article class="mobile-product-card">
            <div class="mobile-product-head"><img src="${escapeHtml(safeImageUrl(product.images?.[0]))}" alt=""><div class="mobile-product-copy"><strong>${escapeHtml(product.title)}</strong><span>${money(product.price)} · Stock ${product.stock}</span><span>${escapeHtml((product.sizes || []).join(', ') || 'Sin tallas')}</span></div></div>
            <div class="mobile-product-actions"><select class="status-select product-status-control" data-id="${product.id}">${productStatusOptions(product.status)}</select><button class="row-action edit-product" data-id="${product.id}" aria-label="Editar"><i data-lucide="pencil"></i></button><button class="row-action delete delete-product" data-id="${product.id}" aria-label="Eliminar"><i data-lucide="trash-2"></i></button></div>
        </article>
    `).join('') : '<p class="empty-state">No se encontraron productos.</p>';
    lucide.createIcons();
}

function renderSaleProducts() {
    const products = state.products.filter(product => !['sold_out', 'archived'].includes(product.status));
    $('#sale-product').innerHTML = products.length ? products.map(product =>
        `<option value="${product.id}">${escapeHtml(product.title)} · ${money(product.price)} · Stock ${product.stock}</option>`
    ).join('') : '<option value="">No hay productos disponibles</option>';
}

function renderFinance() {
    $('#finance-count').textContent = `${state.finances.length} movimientos`;
    $('#finance-tbody').innerHTML = state.finances.length ? state.finances.map(entry => `
        <tr>
            <td>${localDate(entry.entry_date)}</td>
            <td><span class="type-pill ${entry.entry_type}">${entry.entry_type === 'income' ? 'INGRESO' : 'GASTO'}</span></td>
            <td>${escapeHtml(entry.description)}</td>
            <td>${escapeHtml(entry.category)}</td>
            <td class="amount-${entry.entry_type}">${entry.entry_type === 'income' ? '+' : '-'}${money(entry.amount)}</td>
            <td><button class="row-action delete delete-finance" data-id="${entry.id}" title="Eliminar"><i data-lucide="trash-2"></i></button></td>
        </tr>
    `).join('') : '<tr><td class="empty-state" colspan="6">Todavía no hay movimientos.</td></tr>';

    $('#mobile-finance-list').innerHTML = state.finances.length ? state.finances.map(entry => `
        <article class="mobile-finance-card"><div><strong>${escapeHtml(entry.description)}</strong><span>${localDate(entry.entry_date)} · ${escapeHtml(entry.category)}</span></div><b class="amount-${entry.entry_type}">${entry.entry_type === 'income' ? '+' : '-'}${money(entry.amount)}</b></article>
    `).join('') : '<p class="empty-state">Todavía no hay movimientos.</p>';
}

function filteredCustomers() {
    const query = $('#customer-search').value.trim().toLowerCase();
    const filter = $('#customer-marketing-filter').value;
    return state.customers.filter(customer => {
        const haystack = `${customer.full_name || ''} ${customer.email || ''} ${customer.phone || ''}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        const matchesConsent = filter === 'all'
            || (filter === 'subscribed' && customer.email_verified && customer.marketing_opt_in)
            || (filter === 'not-subscribed' && (!customer.email_verified || !customer.marketing_opt_in));
        return matchesQuery && matchesConsent;
    });
}

function renderCustomers() {
    const customers = filteredCustomers();
    $('#customers-tbody').innerHTML = customers.length ? customers.map(customer => `
        <tr>
            <td><div class="customer-identity"><strong>${escapeHtml(customer.full_name)}</strong><span>Cliente LYNX</span></div></td>
            <td><div class="customer-identity"><strong>${escapeHtml(customer.email)}</strong><span class="verification-status ${customer.email_verified ? 'verified' : ''}">${customer.email_verified ? '✓ Verificado' : 'Pendiente de verificar'}</span></div></td>
            <td>${escapeHtml(customer.phone)}</td>
            <td><span class="consent-pill ${customer.marketing_opt_in ? 'yes' : ''}">${customer.marketing_opt_in ? 'SÍ, ACEPTÓ' : 'NO'}</span></td>
            <td>${localDateTime(customer.created_at)}</td>
        </tr>
    `).join('') : '<tr><td class="empty-state" colspan="5">No se encontraron clientes.</td></tr>';

    $('#mobile-customer-list').innerHTML = customers.length ? customers.map(customer => `
        <article class="mobile-customer-card">
            <header><div class="customer-identity"><strong>${escapeHtml(customer.full_name)}</strong><span>${escapeHtml(customer.email)}</span><span class="verification-status ${customer.email_verified ? 'verified' : ''}">${customer.email_verified ? '✓ Correo verificado' : 'Correo pendiente'}</span></div><span class="consent-pill ${customer.marketing_opt_in ? 'yes' : ''}">${customer.marketing_opt_in ? 'SÍ' : 'NO'}</span></header>
            <p>${escapeHtml(customer.phone)} · Registrado ${localDateTime(customer.created_at)}</p>
        </article>
    `).join('') : '<p class="empty-state">No se encontraron clientes.</p>';
}

function renderReviews() {
    const filter = $('#review-status-filter')?.value || 'all';
    const reviews = state.reviews.filter(review => filter === 'all' || review.status === filter);
    $('#reviews-tbody').innerHTML = reviews.length ? reviews.map(review => `
        <tr>
            <td><div class="customer-identity"><strong>${escapeHtml(review.author_name)}</strong><span>Cliente verificado</span></div></td>
            <td><span class="review-rating-admin">${'★'.repeat(Number(review.rating) || 0)}<span class="review-rating-empty">${'☆'.repeat(5 - (Number(review.rating) || 0))}</span></span></td>
            <td class="review-comment-cell">${escapeHtml(review.comment)}</td>
            <td><span class="review-status ${escapeHtml(review.status)}">${review.status === 'published' ? 'PUBLICADA' : review.status === 'hidden' ? 'OCULTA' : 'PENDIENTE'}</span></td>
            <td>${localDateTime(review.created_at)}</td>
            <td><div class="row-actions">
                <button class="row-action approve-review" data-id="${review.id}" title="Publicar" ${review.status === 'published' ? 'disabled' : ''}><i data-lucide="check"></i></button>
                <button class="row-action hide-review" data-id="${review.id}" title="Ocultar" ${review.status === 'hidden' ? 'disabled' : ''}><i data-lucide="eye-off"></i></button>
            </div></td>
        </tr>
    `).join('') : '<tr><td class="empty-state" colspan="6">No se encontraron reseñas.</td></tr>';
}

async function updateReviewStatus(id, status) {
    const { error } = await supabaseClient.from('customer_reviews').update({ status }).eq('id', id);
    if (error) throw error;
    const review = state.reviews.find(item => String(item.id) === String(id));
    if (review) review.status = status;
    renderReviews();
    lucide.createIcons();
    showToast(status === 'published' ? 'Reseña publicada en la tienda.' : 'Reseña ocultada.');
}

function exportSubscribedCustomers() {
    const customers = state.customers.filter(customer => customer.email_verified && customer.marketing_opt_in);
    if (!customers.length) {
        showToast('Todavía no hay clientes suscritos para exportar.', 'error');
        return;
    }
    const quote = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const rows = [
        ['Nombre', 'Correo', 'WhatsApp', 'Fecha de registro'],
        ...customers.map(customer => [customer.full_name, customer.email, customer.phone, customer.created_at])
    ];
    const csv = `\uFEFF${rows.map(row => row.map(quote).join(',')).join('\r\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `clientes-lynx-suscritos-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`${customers.length} contactos suscritos exportados.`);
}

function openProductForm(product = null) {
    $('#product-form').reset();
    $('#product-id').value = product?.id || '';
    $('#product-form-title').textContent = product ? 'Editar producto' : 'Añadir producto';
    $('#product-title').value = product?.title || '';
    $('#product-category').value = product?.category || 'hoodies-jackets';
    $('#product-price').value = product?.price ?? '';
    $('#product-cost').value = product?.cost ?? 0;
    $('#product-stock').value = product?.stock ?? 1;
    $('#product-status').value = product?.status || 'available';
    $('#product-sizes').value = (product?.sizes || []).join(', ');
    $('#product-badge').value = product?.badge || 'NUEVO';
    $('#product-description').value = product?.description || '';
    $('#product-images').value = (product?.images || []).join('\n');
    $('#product-fit').checked = product?.fit_recommendation !== false;
    $('#product-form-message').textContent = '';
    $('#product-dialog').showModal();
    lucide.createIcons();
}

function closeProductForm() {
    $('#product-dialog').close();
}

async function uploadProductImages(files, slug) {
    const uploaded = [];
    for (const file of files) {
        if (file.size > 10 * 1024 * 1024) throw new Error(`${file.name} supera el máximo de 10 MB.`);
        const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const unique = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const path = `${slug}/${unique}.${extension}`;
        const { error } = await supabaseClient.storage.from('product-images').upload(path, file, { cacheControl: '3600', upsert: false });
        if (error) throw error;
        const { data } = supabaseClient.storage.from('product-images').getPublicUrl(path);
        uploaded.push(data.publicUrl);
    }
    return uploaded;
}

function slugify(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function saveProduct(event) {
    event.preventDefault();
    const button = event.submitter;
    const message = $('#product-form-message');
    message.textContent = '';
    setButtonLoading(button, true, 'Guardando...');

    try {
        const id = $('#product-id').value;
        const title = $('#product-title').value.trim();
        const existingProduct = id
            ? state.products.find(product => String(product.id) === String(id))
            : null;
        // El slug es la URL pública permanente del producto. Al editar el
        // título se conserva para no romper enlaces publicados o indexados.
        const slug = existingProduct?.slug || slugify(title);
        if (!slug) throw new Error('Escribe un nombre válido para generar el enlace del producto.');
        const repeatedSlug = state.products.find(product =>
            product.slug === slug && String(product.id) !== String(id)
        );
        if (repeatedSlug) {
            throw new Error(`Ya existe un producto con este enlace: ${repeatedSlug.title}.`);
        }
        const existingImages = $('#product-images').value.split('\n').map(value => value.trim()).filter(Boolean);
        const files = [...$('#product-image-files').files];
        const uploadedImages = files.length ? await uploadProductImages(files, slug) : [];
        const status = $('#product-status').value;
        const stock = status === 'sold_out' ? 0 : Number($('#product-stock').value || 0);
        const payload = {
            title,
            slug,
            category: $('#product-category').value,
            price: Number($('#product-price').value),
            cost: Number($('#product-cost').value || 0),
            stock,
            status,
            sizes: $('#product-sizes').value.split(',').map(value => value.trim()).filter(Boolean),
            badge: $('#product-badge').value.trim() || STATUS_META[status].badge,
            description: $('#product-description').value.trim(),
            images: [...existingImages, ...uploadedImages],
            fit_recommendation: $('#product-fit').checked
        };

        const query = id
            ? supabaseClient.from('products').update(payload).eq('id', id)
            : supabaseClient.from('products').insert({ ...payload, sort_order: state.products.length + 1 });
        const { error } = await query;
        if (error) throw error;

        closeProductForm();
        showToast(id ? 'Producto actualizado.' : 'Producto añadido al catálogo.');
        await loadAll();
    } catch (error) {
        message.textContent = error.message;
    } finally {
        setButtonLoading(button, false);
        lucide.createIcons();
    }
}

async function updateProductStatus(id, status) {
    const payload = { status, badge: STATUS_META[status].badge };
    if (status === 'sold_out') payload.stock = 0;
    const { error } = await supabaseClient.from('products').update(payload).eq('id', id);
    if (error) throw error;
    showToast(`Estado cambiado a ${STATUS_META[status].label}.`);
    await loadAll();
}

async function quickUpdateProduct(id, field, rawValue, input) {
    const value = field === 'stock' ? Math.max(0, Math.round(Number(rawValue))) : Math.max(0, Number(rawValue));
    if (!Number.isFinite(value)) return;
    input.disabled = true;
    const payload = { [field]: value };
    if (field === 'stock') payload.status = value === 0 ? 'sold_out' : value <= 2 ? 'low_stock' : 'available';
    const { error } = await supabaseClient.from('products').update(payload).eq('id', id);
    input.disabled = false;
    if (error) throw error;
    showToast(`${field === 'stock' ? 'Stock' : 'Precio'} actualizado.`);
    await loadAll();
}

function requestConfirmation({ title, message, acceptLabel = 'Confirmar' }) {
    return new Promise(resolve => {
        const dialog = $('#confirm-dialog');
        $('#confirm-title').textContent = title;
        $('#confirm-message').textContent = message;
        $('#confirm-accept').textContent = acceptLabel;
        const finish = value => { dialog.close(); resolve(value); };
        $('#confirm-cancel').onclick = () => finish(false);
        $('#confirm-accept').onclick = () => finish(true);
        dialog.oncancel = event => { event.preventDefault(); finish(false); };
        dialog.showModal();
        lucide.createIcons();
    });
}

async function deleteProduct(id) {
    const product = state.products.find(item => String(item.id) === String(id));
    if (!product || !await requestConfirmation({ title: 'Eliminar producto', message: `“${product.title}” se eliminará definitivamente. Te recomendamos archivarlo si podría volver al catálogo.`, acceptLabel: 'Eliminar definitivamente' })) return;
    const { error } = await supabaseClient.from('products').delete().eq('id', id);
    if (error) throw error;
    showToast('Producto eliminado.');
    await loadAll();
}

async function importCatalog(button) {
    if (state.products.length && !confirm('Ya existen productos. La importación actualizará los que coincidan con el catálogo original. ¿Continuar?')) return;
    setButtonLoading(button, true, 'Importando...');
    try {
        const response = await fetch('catalog-seed.json', { cache: 'no-store' });
        if (!response.ok) throw new Error('No se pudo leer catalog-seed.json');
        const seed = await response.json();
        const publicSeed = seed.map(({ cost, ...product }) => product);
        const { error } = await supabaseClient.from('products').upsert(publicSeed, { onConflict: 'legacy_id' });
        if (error) throw error;
        showToast(`${seed.length} productos importados correctamente.`);
        await loadAll();
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        setButtonLoading(button, false);
        lucide.createIcons();
    }
}

async function registerSale(event) {
    event.preventDefault();
    const button = event.submitter;
    setButtonLoading(button, true, 'Registrando...');
    try {
        const productId = Number($('#sale-product').value);
        const quantity = Number($('#sale-quantity').value);
        if (!productId) throw new Error('Selecciona un producto.');
        const { error } = await supabaseClient.rpc('register_sale', {
            p_product_id: productId,
            p_quantity: quantity,
            p_note: $('#sale-note').value.trim()
        });
        if (error) throw error;
        event.target.reset();
        $('#sale-quantity').value = 1;
        showToast('Venta registrada, stock descontado e ingreso creado.');
        await loadAll();
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        setButtonLoading(button, false);
        lucide.createIcons();
    }
}

async function saveFinance(event) {
    event.preventDefault();
    const button = event.submitter;
    setButtonLoading(button, true, 'Guardando...');
    try {
        const payload = {
            entry_type: $('#finance-type').value,
            amount: Number($('#finance-amount').value),
            category: $('#finance-category').value.trim(),
            description: $('#finance-description').value.trim(),
            entry_date: $('#finance-date').value,
            created_by: state.user.id
        };
        const { error } = await supabaseClient.from('finance_entries').insert(payload);
        if (error) throw error;
        event.target.reset();
        $('#finance-date').value = new Date().toISOString().slice(0, 10);
        showToast('Movimiento guardado.');
        await loadAll();
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        setButtonLoading(button, false);
        lucide.createIcons();
    }
}

async function deleteFinance(id) {
    if (!await requestConfirmation({ title: 'Eliminar movimiento', message: 'Este movimiento desaparecerá del historial y cambiará el balance calculado.', acceptLabel: 'Eliminar movimiento' })) return;
    const { error } = await supabaseClient.from('finance_entries').delete().eq('id', id);
    if (error) throw error;
    showToast('Movimiento eliminado.');
    await loadAll();
}

function bindEvents() {
    supabaseClient?.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY' && session?.user) showPasswordSetup(session.user);
    });

    $('#login-form').addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        $('#login-message').textContent = '';
        setButtonLoading(button, true, 'Ingresando...');
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: $('#login-email').value.trim(),
                password: $('#login-password').value
            });
            if (error) throw error;
            if (!await verifyAdmin(data.user)) {
                await supabaseClient.auth.signOut();
                throw new Error('Tu cuenta existe, pero no tiene permiso de administrador.');
            }
            state.user = data.user;
            showAdmin();
            await loadAll();
        } catch (error) {
            $('#login-message').textContent = error.message;
        } finally {
            setButtonLoading(button, false);
            lucide.createIcons();
        }
    });

    $('#toggle-password').addEventListener('click', () => {
        const input = $('#login-password');
        input.type = input.type === 'password' ? 'text' : 'password';
        $('#toggle-password').innerHTML = `<i data-lucide="${input.type === 'password' ? 'eye' : 'eye-off'}"></i>`;
        lucide.createIcons();
    });

    $('.toggle-new-password').addEventListener('click', event => {
        const input = $('#new-password');
        input.type = input.type === 'password' ? 'text' : 'password';
        event.currentTarget.innerHTML = `<i data-lucide="${input.type === 'password' ? 'eye' : 'eye-off'}"></i>`;
        lucide.createIcons();
    });

    $('#set-password-form').addEventListener('submit', async event => {
        event.preventDefault();
        const password = $('#new-password').value;
        const confirmation = $('#confirm-new-password').value;
        const message = $('#set-password-message');
        const button = event.submitter;

        message.classList.remove('success');
        message.textContent = '';
        if (password.length < 12) {
            message.textContent = 'La contraseña debe tener al menos 12 caracteres.';
            return;
        }
        if (password !== confirmation) {
            message.textContent = 'Las contraseñas no coinciden.';
            return;
        }

        setButtonLoading(button, true, 'Guardando...');
        try {
            const { data, error } = await supabaseClient.auth.updateUser({ password });
            if (error) throw error;
            state.user = data.user || state.user;
            history.replaceState({}, document.title, location.pathname);
            $('#set-password-form').reset();
            showAdmin();
            await loadAll();
            showToast('Contraseña creada correctamente.');
        } catch (error) {
            message.textContent = error.message;
        } finally {
            setButtonLoading(button, false);
            lucide.createIcons();
        }
    });

    $('#reset-password-btn').addEventListener('click', async () => {
        const email = $('#login-email').value.trim();
        if (!email) {
            $('#login-message').textContent = 'Escribe primero tu correo de administrador.';
            return;
        }
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: location.href.split('#')[0] });
        $('#login-message').textContent = error ? error.message : 'Revisa tu correo para cambiar la contraseña.';
        $('#login-message').classList.toggle('success', !error);
    });

    $('#logout-btn').addEventListener('click', async () => {
        await supabaseClient.auth.signOut();
        state.user = null;
        showLogin();
    });

    $$('.admin-tab').forEach(tab => tab.addEventListener('click', () => {
        $$('.admin-tab').forEach(item => item.classList.toggle('active', item === tab));
        $$('.admin-panel').forEach(panel => panel.classList.toggle('active', panel.id === tab.dataset.panel));
    }));
    $$('[data-go-panel]').forEach(button => button.addEventListener('click', () => $(`.admin-tab[data-panel="${button.dataset.goPanel}"]`)?.click()));
    $('.go-finance-sale')?.addEventListener('click', () => { $('.admin-tab[data-panel="finance-panel"]')?.click(); $('#sale-product')?.focus(); });

    $$('.refresh-btn').forEach(button => button.addEventListener('click', async () => {
        setButtonLoading(button, true, 'Actualizando...');
        try { await loadAll(); } catch (error) { showToast(error.message, 'error'); }
        finally { setButtonLoading(button, false); lucide.createIcons(); }
    }));

    $('#new-product-btn').addEventListener('click', () => openProductForm());
    $('#close-product-dialog').addEventListener('click', closeProductForm);
    $('#cancel-product-btn').addEventListener('click', closeProductForm);
    $('#product-form').addEventListener('submit', saveProduct);
    $('#import-catalog-btn').addEventListener('click', event => importCatalog(event.currentTarget));
    $('#product-search').addEventListener('input', renderProducts);
    $('#product-status-filter').addEventListener('change', renderProducts);
    $('#customer-search').addEventListener('input', renderCustomers);
    $('#customer-marketing-filter').addEventListener('change', renderCustomers);
    $('#review-status-filter').addEventListener('change', renderReviews);
    $('#export-customers-btn').addEventListener('click', exportSubscribedCustomers);
    $('#sale-form').addEventListener('submit', registerSale);
    $('#finance-form').addEventListener('submit', saveFinance);

    ['#products-tbody', '#mobile-product-list'].forEach(selector => $(selector).addEventListener('click', async event => {
        const editButton = event.target.closest('.edit-product');
        const deleteButton = event.target.closest('.delete-product');
        try {
            if (editButton) openProductForm(state.products.find(product => String(product.id) === editButton.dataset.id));
            if (deleteButton) await deleteProduct(deleteButton.dataset.id);
        } catch (error) { showToast(error.message, 'error'); }
    }));

    ['#products-tbody', '#mobile-product-list'].forEach(selector => $(selector).addEventListener('change', async event => {
        const quick = event.target.closest('.quick-product-value');
        if (quick) {
            try { await quickUpdateProduct(quick.dataset.id, quick.dataset.field, quick.value, quick); }
            catch (error) { showToast(error.message, 'error'); await loadAll(); }
            return;
        }
        const control = event.target.closest('.product-status-control');
        if (!control) return;
        try { await updateProductStatus(control.dataset.id, control.value); }
        catch (error) { showToast(error.message, 'error'); await loadAll(); }
    }));

    $('#finance-tbody').addEventListener('click', async event => {
        const button = event.target.closest('.delete-finance');
        if (!button) return;
        try { await deleteFinance(button.dataset.id); }
        catch (error) { showToast(error.message, 'error'); }
    });

    $('#reviews-tbody').addEventListener('click', async event => {
        const approveButton = event.target.closest('.approve-review');
        const hideButton = event.target.closest('.hide-review');
        try {
            if (approveButton) await updateReviewStatus(approveButton.dataset.id, 'published');
            if (hideButton) await updateReviewStatus(hideButton.dataset.id, 'hidden');
        } catch (error) { showToast(error.message, 'error'); }
    });

    $('#product-dialog').addEventListener('click', event => {
        if (event.target === $('#product-dialog')) closeProductForm();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    initialize();
    lucide.createIcons();
});
