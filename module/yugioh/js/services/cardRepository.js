/**
 * CardRepository : seule couche qui connaît la source de données des cartes.
 * Source actuelle : YGOPRODeck (API publique, aucun backend propriétaire).
 * Changer de source = modifier ce fichier uniquement.
 */
const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
const CACHE_KEY = 'ygo-trainer:cards:v2';
const TTL_MS = 1000 * 60 * 60 * 24 * 30;
const BACKOFF_MS = 1000 * 60 * 2;

let cache = loadCache();
const pending = new Map();
const apiNames = new Map();
let unreachableSince = 0;

/** L'API est injoignable : on attend avant de retenter (l'app reste utilisable). */
function isBackingOff() {
    return unreachableSince > 0 && (Date.now() - unreachableSince) < BACKOFF_MS;
}

function loadCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
        return {};
    }
}

function saveCache() {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
        /* quota plein ou storage indisponible : le cache est optionnel */
    }
}

function isFresh(entry) {
    return Boolean(entry) && (Date.now() - entry.fetchedAt) < TTL_MS;
}

function normalize(card) {
    const image = (card.card_images && card.card_images[0]) || {};
    return {
        id: card.id,
        name: card.name,
        type: card.type || null,
        attribute: card.attribute || null,
        level: card.level || null,
        desc: card.desc || null,
        imageSmall: image.image_url_small || image.image_url || null,
        imageLarge: image.image_url || null,
        imageArt: image.image_url_cropped || null,
        fetchedAt: Date.now()
    };
}

function store(key, card) {
    cache[key.toLowerCase()] = normalize(card);
}

async function requestJson(params) {
    try {
        const response = await fetch(`${API_URL}?${params.toString()}`);
        if (!response.ok) throw new Error(`Card API ${response.status}`);
        const json = await response.json();
        unreachableSince = 0;
        return Array.isArray(json.data) ? json.data : [];
    } catch (error) {
        unreachableSince = Date.now();
        throw error;
    }
}

/** Retourne les métadonnées connues d'une carte, ou null si non chargée. */
export function getCard(name) {
    const entry = cache[String(name).toLowerCase()];
    return isFresh(entry) ? entry : null;
}

/** Charge une carte (nom exact puis recherche approchée en secours). */
export async function loadCard(name, apiName) {
    const key = String(name).toLowerCase();
    if (getCard(name)) return getCard(name);
    if (pending.has(key)) return pending.get(key);
    if (isBackingOff()) return null;

    const query = apiName || apiNames.get(key) || name;
    const task = (async () => {
        try {
            const exact = await requestJson(new URLSearchParams({ name: query }));
            if (exact.length) {
                store(name, exact[0]);
                saveCache();
                return cache[key];
            }
        } catch (error) {
            /* on tente la recherche approchée */
        }
        try {
            const fuzzy = await requestJson(new URLSearchParams({ fname: query }));
            if (fuzzy.length) {
                store(name, fuzzy[0]);
                saveCache();
                return cache[key];
            }
        } catch (error) {
            /* API indisponible : placeholder côté UI */
        }
        return null;
    })();

    pending.set(key, task);
    const result = await task;
    pending.delete(key);
    return result;
}

/** Précharge tout un deck en une requête groupée (fallback carte par carte). */
export async function preloadDeck(deckCards) {
    for (const card of deckCards) {
        if (card.apiName) apiNames.set(card.name.toLowerCase(), card.apiName);
    }
    const missing = deckCards.filter(card => !getCard(card.name));
    if (!missing.length || isBackingOff()) return;

    try {
        const params = new URLSearchParams({ name: missing.map(card => card.apiName || card.name).join('|') });
        const data = await requestJson(params);
        const byName = new Map(data.map(card => [card.name.toLowerCase(), card]));
        const stillMissing = [];
        for (const card of missing) {
            const found = byName.get((card.apiName || card.name).toLowerCase());
            if (found) store(card.name, found);
            else stillMissing.push(card);
        }
        saveCache();
        await Promise.allSettled(stillMissing.map(card => loadCard(card.name, card.apiName)));
    } catch (error) {
        await Promise.allSettled(missing.map(card => loadCard(card.name, card.apiName)));
    }
}

export function clearCache() {
    cache = {};
    saveCache();
}
