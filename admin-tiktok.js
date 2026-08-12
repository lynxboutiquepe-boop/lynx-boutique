(function () {
    'use strict';

    const STORAGE_KEY = 'lynx_tiktok_videos_v1';
    const DEFAULT_VIDEOS = [
        { id: '7659622237057715477', url: 'https://www.tiktok.com/@boutique_lynx/video/7659622237057715477', title: 'Fit LYNX', visible: true, order: 0 },
        { id: '7672482687348722964', url: 'https://www.tiktok.com/@boutique_lynx/video/7672482687348722964', title: 'Streetwear LYNX', visible: true, order: 1 },
        { id: '7667430616794746132', url: 'https://www.tiktok.com/@boutique_lynx/video/7667430616794746132', title: 'Nuevo drop', visible: true, order: 2 },
        { id: '7672835678857694484', url: 'https://www.tiktok.com/@boutique_lynx/video/7672835678857694484', title: 'Detalles del fit', visible: true, order: 3 }
    ];
    const form = document.getElementById('tiktok-video-form');
    const list = document.getElementById('tiktok-admin-list');
    if (!form || !list) return;

    const urlInput = document.getElementById('tiktok-video-url');
    const titleInput = document.getElementById('tiktok-video-title');
    const message = document.getElementById('tiktok-video-message');

    function readVideos() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return DEFAULT_VIDEOS.map(video => ({ ...video }));
            const value = JSON.parse(saved);
            return Array.isArray(value) ? value : DEFAULT_VIDEOS.map(video => ({ ...video }));
        } catch (_) { return DEFAULT_VIDEOS.map(video => ({ ...video })); }
    }
    function saveVideos(videos) { localStorage.setItem(STORAGE_KEY, JSON.stringify(videos.map((video, index) => ({ ...video, order: index })))); }
    function escapeHtml(value) { return String(value || '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]); }
    function normalizeTikTokUrl(value) {
        try {
            const url = new URL(String(value || '').trim());
            if (!/(^|\.)tiktok\.com$/i.test(url.hostname) || !/\/video\/\d+/i.test(url.pathname)) return '';
            return `${url.origin}${url.pathname}`;
        } catch (_) { return ''; }
    }

    function render() {
        const videos = readVideos().sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
        if (!videos.length) {
            list.innerHTML = '<div class="tiktok-admin-empty"><i data-lucide="video"></i><strong>Todavía no agregaste videos</strong><span>Pega tu primer enlace arriba.</span></div>';
            window.lucide?.createIcons(); return;
        }
        list.innerHTML = videos.map((video, index) => `<article class="tiktok-admin-item ${video.visible === false ? 'is-hidden' : ''}" data-id="${escapeHtml(video.id)}"><div class="tiktok-admin-number">${String(index + 1).padStart(2, '0')}</div><div class="tiktok-admin-copy"><strong>${escapeHtml(video.title || 'Video de TikTok')}</strong><a href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer">Abrir video <span>↗</span></a></div><span class="tiktok-admin-status">${video.visible === false ? 'OCULTO' : 'VISIBLE'}</span><div class="tiktok-admin-actions"><button type="button" data-action="up" aria-label="Subir video" ${index === 0 ? 'disabled' : ''}><i data-lucide="arrow-up"></i></button><button type="button" data-action="down" aria-label="Bajar video" ${index === videos.length - 1 ? 'disabled' : ''}><i data-lucide="arrow-down"></i></button><button type="button" data-action="toggle" aria-label="${video.visible === false ? 'Mostrar' : 'Ocultar'} video"><i data-lucide="${video.visible === false ? 'eye' : 'eye-off'}"></i></button><button class="danger" type="button" data-action="remove" aria-label="Eliminar video"><i data-lucide="trash-2"></i></button></div></article>`).join('');
        window.lucide?.createIcons();
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        const url = normalizeTikTokUrl(urlInput.value);
        message.classList.remove('success');
        if (!url) { message.textContent = 'Pega el enlace directo del video: tiktok.com/@usuario/video/...'; return; }
        const videos = readVideos();
        if (videos.some(video => normalizeTikTokUrl(video.url) === url)) { message.textContent = 'Ese video ya está agregado.'; return; }
        const id = (url.match(/\/video\/(\d+)/i) || [])[1] || `local-${Date.now()}`;
        videos.push({ id, url, title: titleInput.value.trim(), visible: true, order: videos.length });
        saveVideos(videos); form.reset(); message.textContent = 'Video agregado. Ya puedes revisarlo en la tienda local.'; message.classList.add('success'); render();
    });

    list.addEventListener('click', event => {
        const button = event.target.closest('button[data-action]');
        const item = event.target.closest('[data-id]');
        if (!button || !item) return;
        const videos = readVideos().sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
        const index = videos.findIndex(video => String(video.id) === item.dataset.id);
        if (index < 0) return;
        if (button.dataset.action === 'up' && index > 0) [videos[index - 1], videos[index]] = [videos[index], videos[index - 1]];
        if (button.dataset.action === 'down' && index < videos.length - 1) [videos[index + 1], videos[index]] = [videos[index], videos[index + 1]];
        if (button.dataset.action === 'toggle') videos[index].visible = videos[index].visible === false;
        if (button.dataset.action === 'remove') videos.splice(index, 1);
        saveVideos(videos); render();
    });
    render();
})();
