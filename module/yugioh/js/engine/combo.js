import { actionByCode, phaseByCode } from '../data/lexicon.js';

/**
 * Une "route" = unité entraînable : la ligne principale d'une combo, ou une de ses branches.
 * Les mini-jeux ne manipulent que des routes, jamais un deck en particulier.
 */
export function listRoutes(deck) {
    const routes = [];
    for (const combo of deck.combos) {
        routes.push({
            id: combo.id,
            comboId: combo.id,
            branchId: null,
            name: combo.name,
            comboName: combo.name,
            emoji: combo.emoji || '🃏',
            difficulty: combo.difficulty || 1,
            tags: combo.tags || [],
            endNote: combo.endNote || null,
            steps: combo.steps
        });
        for (const branch of combo.branches || []) {
            routes.push({
                id: `${combo.id}:${branch.id}`,
                comboId: combo.id,
                branchId: branch.id,
                name: branch.name,
                comboName: combo.name,
                emoji: branch.emoji || '🌿',
                difficulty: branch.difficulty || 1,
                tags: branch.tags || [],
                endNote: branch.endNote || null,
                steps: branch.steps
            });
        }
    }
    return routes;
}

export function getRoute(deck, routeId) {
    return listRoutes(deck).find(route => route.id === routeId) || null;
}

/** Cartes citées par une étape (acteur + cibles), sans doublon. */
export function stepCards(step) {
    const names = [step.actor, ...(step.targets || [])].filter(Boolean);
    return [...new Set(names)];
}

/** Toutes les cartes utilisées par une route, dans l'ordre d'apparition. */
export function routeCards(route) {
    const names = [];
    for (const step of route.steps) {
        for (const name of stepCards(step)) {
            if (!names.includes(name)) names.push(name);
        }
    }
    return names;
}

export function stepActions(step) {
    return (step.actions || []).map(actionByCode).filter(Boolean);
}

export function stepPhase(step) {
    return phaseByCode(step.phase);
}

export function stepChainLabel(step) {
    return step.chain ? `CL${step.chain.link}` : null;
}

/** Memory View : ligne 100% visuelle générée depuis les données. */
export function memoryLine(step, emojiOf) {
    const parts = [];
    if (step.actor) parts.push(emojiOf(step.actor));
    const actions = stepActions(step).map(action => action.emoji);
    if (actions.length) parts.push(actions.join(' '));
    const targets = (step.targets || []).filter(name => name !== step.actor).map(emojiOf);
    if (targets.length) parts.push(targets.join(' '));
    return parts.join(' ➡️ ');
}

/** Story Mode : ligne narrative (donnée si fournie, sinon générée). */
export function storyLine(step, emojiOf) {
    return step.story || memoryLine(step, emojiOf);
}

export function shuffle(items, random = Math.random) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export function pickDistractors(pool, correct, count) {
    return shuffle(pool.filter(item => item !== correct)).slice(0, count);
}
