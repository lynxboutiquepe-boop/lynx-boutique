(function () {
    'use strict';

    const STORAGE_KEY = 'lynx_tiktok_videos_v1';
    const DEFAULT_VIDEOS = [
        { id: '7659622237057715477', url: 'https://www.tiktok.com/@boutique_lynx/video/7659622237057715477', title: 'Fit LYNX', visible: true, order: 0 },
        { id: '7672482687348722964', url: 'https://www.tiktok.com/@boutique_lynx/video/7672482687348722964', title: 'Streetwear LYNX', visible: true, order: 1 },
        { id: '7667430616794746132', url: 'https://www.tiktok.com/@boutique_lynx/video/7667430616794746132', title: 'Nuevo drop', visible: true, order: 2 },
        { id: '7672835678857694484', url: 'https://www.tiktok.com/@boutique_lynx/video/7672835678857694484', title: 'Detalles del fit', visible: true, order: 3 }
    ];
    const rail = document.getElementById('tiktok-video-rail');
    if (!rail) return;

    function readVideos() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return DEFAULT_VIDEOS;
            const value = JSON.parse(saved);
            return Array.isArray(value) ? value : DEFAULT_VIDEOS;
        } catch (_) {
            return DEFAULT_VIDEOS;
        }
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>'"]/g, character => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        })[character]);
    }

    function normalizeTikTokUrl(value) {
        try {
            const url = new URL(String(value || '').trim());
            if (!/(^|\.)tiktok\.com$/i.test(url.hostname) || !/\/video\/\d+/i.test(url.pathname)) return '';
            return `${url.origin}${url.pathname}`;
        } catch (_) {
            return '';
        }
    }

    function render() {
        const videos = readVideos().filter(video => video.visible !== false && normalizeTikTokUrl(video.url)).sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
        if (!videos.length) {
            rail.innerHTML = '<article class="tiktok-empty-card"><div class="tiktok-empty-icon" aria-hidden="true"><span>♪</span></div><div><strong>Próximamente: los mejores fits de LYNX</strong><p>Síguenos en TikTok para ver drops, tallas y prendas en movimiento.</p></div><a href="https://www.tiktok.com/@boutique_lynx" target="_blank" rel="noopener noreferrer">@boutique_lynx <span>↗</span></a></article>';
            return;
        }

        rail.innerHTML = videos.map((video, index) => {
            const url = normalizeTikTokUrl(video.url);
            const id = (url.match(/\/video\/(\d+)/i) || [])[1] || '';
            const title = escapeHtml(video.title || `Video LYNX ${index + 1}`);
            const cover = `assets/tiktok-covers/${id}.png`;
            return `<article class="tiktok-video-card">
                <div class="tiktok-card-top"><span>${String(index + 1).padStart(2, '0')}</span><strong>${title}</strong><span class="tiktok-card-mark">LYNX / TV</span></div>
                <div class="tiktok-player-frame" data-video-id="${id}" data-video-title="${title}">
                    <button class="tiktok-player-launch" type="button" aria-label="Reproducir ${title}" style="--tiktok-cover:url('${cover}')"><span class="tiktok-player-play" aria-hidden="true"></span><small>TOCA PARA REPRODUCIR</small></button>
                </div>
                <div class="tiktok-card-footer"><span>FIT CHECK</span><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">VER EN TIKTOK <span>↗</span></a></div>
            </article>`;
        }).join('');
    }

    function pauseOtherPlayers(activeWindow) {
        rail.querySelectorAll('.tiktok-player-frame iframe').forEach(player => {
            if (!player.contentWindow || player.contentWindow === activeWindow) return;
            player.contentWindow.postMessage({ type: 'pause', value: null, 'x-tiktok-player': true }, '*');
        });
    }

    function openPlayer(frame) {
        const id = frame.dataset.videoId;
        const title = frame.dataset.videoTitle || 'Video LYNX';
        if (!id) return;
        rail.querySelectorAll('.tiktok-player-frame').forEach(otherFrame => {
            if (otherFrame === frame || !otherFrame.querySelector('iframe')) return;
            const otherTitle = otherFrame.dataset.videoTitle || 'Video LYNX';
            const otherCover = `assets/tiktok-covers/${otherFrame.dataset.videoId}.png`;
            otherFrame.innerHTML = `<button class="tiktok-player-launch" type="button" aria-label="Reproducir ${otherTitle}" style="--tiktok-cover:url('${otherCover}')"><span class="tiktok-player-play" aria-hidden="true"></span><small>TOCA PARA REPRODUCIR</small></button>`;
        });
        const playerUrl = `https://www.tiktok.com/player/v1/${id}?autoplay=1&controls=1&progress_bar=1&play_button=1&volume_control=1&fullscreen_button=1&timestamp=0&loop=1&music_info=0&description=0&rel=0&native_context_menu=0`;
        frame.innerHTML = `<iframe src="${playerUrl}" title="${title}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe><div class="tiktok-player-fallback"><span>¿No reproduce?</span><a href="https://www.tiktok.com/@boutique_lynx/video/${id}" target="_blank" rel="noopener noreferrer">ABRIR EN TIKTOK ↗</a></div>`;
    }

    rail.addEventListener('click', event => {
        const launch = event.target.closest('.tiktok-player-launch');
        if (launch) openPlayer(launch.closest('.tiktok-player-frame'));
    });

    window.addEventListener('message', event => {
        if (!event.data || event.data['x-tiktok-player'] !== true) return;
        if (event.data.type !== 'onStateChange' || Number(event.data.value) !== 1) return;
        const belongsToThisSection = [...rail.querySelectorAll('.tiktok-player-frame iframe')]
            .some(player => player.contentWindow === event.source);
        if (belongsToThisSection) pauseOtherPlayers(event.source);
    });

    render();
    window.addEventListener('storage', event => { if (event.key === STORAGE_KEY) render(); });
})();
