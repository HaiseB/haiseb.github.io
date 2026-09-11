const SETTINGS_COOKIE = 'formData';

function defaultSettings() {
    return {
        fetchChangelog: true,
        ygoCardVisualMode: 'emoji'
    };
}

function readSettingsFromCookie() {
    const cookieData = document.cookie.replace(/(?:(?:^|.*;\s*)formData\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const defaults = defaultSettings();
    if (!cookieData) return defaults;

    try {
        const parsed = JSON.parse(decodeURIComponent(cookieData));
        return {
            ...defaults,
            ...parsed,
            ygoCardVisualMode: parsed && parsed.ygoCardVisualMode === 'image' ? 'image' : 'emoji'
        };
    } catch (error) {
        console.warn('Cookie settings unreadable, fallback to defaults.', error);
        return defaults;
    }
}

function writeSettingsToCookie(settings) {
    const formDataJSON = JSON.stringify(settings);
    document.cookie = `${SETTINGS_COOKIE}=${encodeURIComponent(formDataJSON)}; path=/; max-age=31536000; SameSite=Lax`;
}

function applySettingsToForm(settings) {
    const fetchChangelogCheckbox = document.getElementById('fetchChangelog');
    if (fetchChangelogCheckbox) {
        fetchChangelogCheckbox.checked = Boolean(settings.fetchChangelog);
    }

    const ygoCardVisualModeSelect = document.getElementById('ygoCardVisualMode');
    if (ygoCardVisualModeSelect) {
        ygoCardVisualModeSelect.value = settings.ygoCardVisualMode === 'image' ? 'image' : 'emoji';
    }
}

function readSettingsFromForm() {
    const current = readSettingsFromCookie();
    const fetchChangelogCheckbox = document.getElementById('fetchChangelog');
    const ygoCardVisualModeSelect = document.getElementById('ygoCardVisualMode');

    return {
        fetchChangelog: fetchChangelogCheckbox ? fetchChangelogCheckbox.checked : current.fetchChangelog,
        ygoCardVisualMode: ygoCardVisualModeSelect && ygoCardVisualModeSelect.value === 'image' ? 'image' : 'emoji'
    };
}

function includeChangelog(settings) {
    const changelog = document.getElementById('changelog');
    if (!changelog) return;

    if (settings.fetchChangelog) {
        const changelogScript = document.createElement('script');
        changelog.style.display = 'block';
        changelogScript.src = './js/changelog.js';

        const existingScript = document.querySelector('script[src="./js/changelog.js"]');
        if (!existingScript) {
            document.body.appendChild(changelogScript);
        }
    } else {
        changelog.style.display = 'none';
    }
}

function routeSearch(query, rootPrefix) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;

    const pages = [
        { keywords: ['accueil', 'home', 'index'], path: 'index.html' },
        { keywords: ['radio'], path: 'module/radio/index.html' },
        { keywords: ['league'], path: 'module/league/index.html' },
        {
            keywords: [
                'yugioh', 'yu-gi-oh', 'yu gi oh', 'ygo', 'combo',
                'memento', 'mementotlan', 'angwitch', 'tecuhtlica', 'bone party',
                'ghattic', 'mementomictlan', 'tatsunootoshigo'
            ],
            path: 'module/yugioh/index.html'
        },
        { keywords: ['encyclopedie', 'encyclopédie', 'knowledge', 'wiki'], path: 'module/knowledgeBase/index.html' },
        { keywords: ['mtg', 'magic'], path: 'module/mtg/index.html' },
        { keywords: ['resume', 'cv'], path: 'module/resume/index.html' }
    ];

    const target = pages.find(page => page.keywords.some(keyword => normalized.includes(keyword)));
    if (target) {
        const prefix = (rootPrefix || './').replace(/\/$/, '');
        window.location.href = `${prefix}/${target.path}`;
        return;
    }

    const url = `https://www.google.com/search?q=${encodeURIComponent(`site:haiseb.github.io ${query}`)}`;
    window.open(url, '_blank', 'noopener');
}

function initNavbarSearch() {
    const forms = document.querySelectorAll('form[role="search"]');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const input = form.querySelector('input[type="search"]');
            if (!input) return;

            const button = form.querySelector('button[type="submit"]');
            const initialButtonText = button ? button.textContent : '';
            if (button) {
                button.disabled = true;
                button.textContent = 'Recherche en cours...';
            }

            const rootPrefix = form.getAttribute('data-root-prefix') || './';
            try {
                routeSearch(input.value, rootPrefix);
            } finally {
                // In case no navigation happens, restore the control quickly.
                window.setTimeout(() => {
                    if (!button) return;
                    button.disabled = false;
                    button.textContent = initialButtonText || 'Rechercher';
                }, 350);
            }
        });
    });
}

function initSettingsForm() {
    const form = document.getElementById('settingsForm');
    const settings = readSettingsFromCookie();
    applySettingsToForm(settings);
    includeChangelog(settings);

    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();
        const nextSettings = readSettingsFromForm();
        writeSettingsToCookie(nextSettings);
        includeChangelog(nextSettings);
        window.dispatchEvent(new CustomEvent('settings:updated', { detail: nextSettings }));
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initSettingsForm();
    initNavbarSearch();
});