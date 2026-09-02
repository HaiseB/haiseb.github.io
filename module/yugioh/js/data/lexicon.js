/**
 * Jargon standardisé de l'application.
 * Chaque action possède UN libellé officiel : le moteur ne reformule jamais une action.
 * Les `keywords` servent uniquement à repérer l'action dans le texte technique d'une étape.
 */
export const ACTIONS = {
    NS: { code: 'NS', display: 'NS', label: 'Normal Summon', emoji: '🔼', keywords: ['NS'] },
    SS: { code: 'SS', display: 'SS', label: 'Special Summon', emoji: '⬆️', keywords: ['SS'] },
    ACTIVATE: { code: 'ACTIVATE', display: 'Activate', label: 'Activer', emoji: '✨', keywords: ['Activate'] },
    SEARCH: { code: 'SEARCH', display: 'search', label: 'Chercher', emoji: '🔎', keywords: ['search'] },
    ADD: { code: 'ADD', display: 'add', label: 'Ajouter à la main', emoji: '🖐️', keywords: ['add'] },
    SEND: { code: 'SEND', display: 'send', label: 'Envoyer au GY', emoji: '📤', keywords: ['send'] },
    POP: { code: 'POP', display: 'pop', label: 'Détruire', emoji: '💥', keywords: ['popping', 'pop'] },
    SHUFFLE: { code: 'SHUFFLE', display: 'shuffle', label: 'Mélanger dans le Deck', emoji: '🌀', keywords: ['shuffling', 'shuffle'] },
    BANISH: { code: 'BANISH', display: 'banish', label: 'Bannir', emoji: '🚫', keywords: ['banished', 'banish'] },
    REVIVE: { code: 'REVIVE', display: 'revive', label: 'Renvoyer depuis le GY', emoji: '⚰️', keywords: ['revive'] },
    SUMMON: { code: 'SUMMON', display: 'summon', label: 'Invoquer', emoji: '🃏', keywords: ['summon'] },
    FUSE: { code: 'FUSE', display: 'fuse', label: 'Fusionner', emoji: '🔗', keywords: ['fuse'] },
    SET: { code: 'SET', display: 'Set', label: 'Poser', emoji: '🂠', keywords: ['Set'] },
    FLOAT: { code: 'FLOAT', display: 'float', label: 'Flotter', emoji: '🫧', keywords: ['float'] },
    RECOVER: { code: 'RECOVER', display: 'recover', label: 'Récupérer', emoji: '♻️', keywords: ['recover'] },
    MILL: { code: 'MILL', display: 'mill', label: 'Mill', emoji: '📚', keywords: ['mill'] },
    LINK_SUMMON: { code: 'LINK_SUMMON', display: 'Link summon', label: 'Invocation Lien', emoji: '🔻', keywords: ['Link summon'] }
};

/** Tous les mots-clés utilisables comme "trou d'action", du plus long au plus court. */
export const ACTION_KEYWORDS = Object.values(ACTIONS)
    .flatMap(action => action.keywords.map(keyword => ({ keyword, action })))
    .sort((a, b) => b.keyword.length - a.keyword.length);

export function actionByCode(code) {
    return ACTIONS[code] || null;
}

export function actionByKeyword(keyword) {
    const found = ACTION_KEYWORDS.find(entry => entry.keyword.toLowerCase() === String(keyword).toLowerCase());
    return found ? found.action : null;
}

/** Libellés des phases du squelette d'une combo. */
export const PHASES = {
    STARTER: { code: 'STARTER', label: 'Starter', emoji: '🎬' },
    SETUP: { code: 'SETUP', label: 'Setup', emoji: '⚙️' },
    GY_SETUP: { code: 'GY_SETUP', label: 'GY Setup', emoji: '⚰️' },
    BOARD_SETUP: { code: 'BOARD_SETUP', label: 'Board Setup', emoji: '🛡️' },
    END_BOARD: { code: 'END_BOARD', label: 'End Board', emoji: '🏁' }
};

export function phaseByCode(code) {
    return PHASES[code] || { code, label: code, emoji: '•' };
}
