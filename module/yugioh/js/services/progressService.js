/**
 * Progression locale (localStorage) : aucune connexion requise.
 * Clé : deckId / routeId / modeId
 */
const KEY = 'ygo-trainer:progress:v1';

const MASTERY_LABELS = [
    'Jamais vu',
    'Découverte',
    'Fragile',
    'Correct',
    'Maîtrisé',
    'Automatique'
];

function load() {
    try {
        const raw = localStorage.getItem(KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
        return {};
    }
}

function save(state) {
    try {
        localStorage.setItem(KEY, JSON.stringify(state));
    } catch (error) {
        /* storage indisponible : la progression est optionnelle */
    }
}

function entryKey(deckId, routeId, modeId) {
    return `${deckId}/${routeId}/${modeId}`;
}

function emptyEntry() {
    return { attempts: 0, successes: 0, bestScore: 0, bestTimeMs: null, streak: 0, bestStreak: 0, mastery: 0 };
}

export function getEntry(deckId, routeId, modeId) {
    const state = load();
    return { ...emptyEntry(), ...(state[entryKey(deckId, routeId, modeId)] || {}) };
}

export function getRouteSummary(deckId, routeId, modeIds) {
    return modeIds.map(modeId => ({ modeId, entry: getEntry(deckId, routeId, modeId) }));
}

/**
 * @param {{success:boolean, score:number, timeMs:number, accuracy:number}} result
 */
export function recordResult(deckId, routeId, modeId, result) {
    const state = load();
    const key = entryKey(deckId, routeId, modeId);
    const entry = { ...emptyEntry(), ...(state[key] || {}) };

    entry.attempts += 1;
    if (result.success) {
        entry.successes += 1;
        entry.streak += 1;
        entry.bestStreak = Math.max(entry.bestStreak, entry.streak);
        if (result.accuracy >= 0.9) entry.mastery = Math.min(5, entry.mastery + 1);
        else entry.mastery = Math.max(entry.mastery, 2);
    } else {
        entry.streak = 0;
        entry.mastery = Math.max(1, entry.mastery - 1);
    }
    entry.bestScore = Math.max(entry.bestScore, result.score || 0);
    if (result.timeMs && (entry.bestTimeMs === null || result.timeMs < entry.bestTimeMs)) {
        entry.bestTimeMs = result.timeMs;
    }

    state[key] = entry;
    save(state);
    return entry;
}

export function masteryLabel(mastery) {
    return MASTERY_LABELS[Math.max(0, Math.min(5, mastery))];
}

export function masteryStars(mastery) {
    const filled = Math.round((Math.max(0, Math.min(5, mastery)) / 5) * 5);
    return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

export function resetProgress() {
    save({});
}

export function successRate(entry) {
    if (!entry.attempts) return 0;
    return Math.round((entry.successes / entry.attempts) * 100);
}
