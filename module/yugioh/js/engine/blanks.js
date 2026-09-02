import { ACTION_KEYWORDS } from '../data/lexicon.js';
import { shuffle, pickDistractors } from './combo.js';

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
}

function findMatches(text, terms, kind) {
    const matches = [];
    const sorted = [...terms].sort((a, b) => b.term.length - a.term.length);
    for (const entry of sorted) {
        const pattern = new RegExp(`(^|[^\\w-])(${escapeRegExp(entry.term)})(?![\\w-])`, 'g');
        let match;
        while ((match = pattern.exec(text)) !== null) {
            const start = match.index + match[1].length;
            matches.push({ start, end: start + entry.term.length, value: entry.term, kind, meta: entry.meta });
            pattern.lastIndex = start + entry.term.length;
        }
    }
    return matches;
}

function removeOverlaps(matches) {
    const sorted = [...matches].sort((a, b) => (a.start - b.start) || (b.end - b.start) - (a.end - a.start));
    const kept = [];
    for (const match of sorted) {
        if (kept.some(other => match.start < other.end && other.start < match.end)) continue;
        kept.push(match);
    }
    return kept.sort((a, b) => a.start - b.start);
}

/**
 * Découpe le texte technique exact d'une étape en tokens exploitables :
 * { kind: 'text' | 'card' | 'action', value }
 */
export function tokenizeStep(step, cardNames) {
    const text = step.text;
    const cardMatches = findMatches(text, cardNames.map(term => ({ term })), 'card');
    const actionMatches = findMatches(text, ACTION_KEYWORDS.map(entry => ({ term: entry.keyword, meta: entry.action })), 'action');
    const matches = removeOverlaps([...cardMatches, ...actionMatches]);

    const tokens = [];
    let cursor = 0;
    for (const match of matches) {
        if (match.start > cursor) tokens.push({ kind: 'text', value: text.slice(cursor, match.start) });
        tokens.push({ kind: match.kind, value: match.value, meta: match.meta });
        cursor = match.end;
    }
    if (cursor < text.length) tokens.push({ kind: 'text', value: text.slice(cursor) });
    return tokens;
}

export const DIFFICULTIES = [
    { id: 'easy', label: 'Easy', hint: 'Nom de carte manquant', multiplier: 1 },
    { id: 'medium', label: 'Medium', hint: 'Action manquante', multiplier: 1.2 },
    { id: 'hard', label: 'Hard', hint: 'Carte + action manquantes', multiplier: 1.5 },
    { id: 'expert', label: 'Expert', hint: 'Toute l\'étape masquée', multiplier: 2 }
];

function chooseIndexes(tokens, kind, count) {
    const indexes = tokens.map((token, index) => (token.kind === kind ? index : -1)).filter(index => index >= 0);
    if (count === Infinity) return indexes;
    return shuffle(indexes).slice(0, count);
}

/**
 * Construit une question "Fill the Blank" à partir d'une étape.
 * Retourne les tokens avec des trous + les options proposées pour chaque trou.
 */
export function buildBlankQuestion(step, cardNames, difficultyId) {
    const tokens = tokenizeStep(step, cardNames);
    let blanked = [];

    if (difficultyId === 'easy') {
        blanked = chooseIndexes(tokens, 'card', 1);
    } else if (difficultyId === 'medium') {
        blanked = chooseIndexes(tokens, 'action', 1);
        if (!blanked.length) blanked = chooseIndexes(tokens, 'card', 1);
    } else if (difficultyId === 'hard') {
        blanked = [...chooseIndexes(tokens, 'card', 1), ...chooseIndexes(tokens, 'action', 1)];
    } else {
        blanked = [...chooseIndexes(tokens, 'card', Infinity), ...chooseIndexes(tokens, 'action', Infinity)];
    }

    const blankSet = new Set(blanked);

    const parts = tokens.map((token, index) => {
        if (!blankSet.has(index)) return { kind: 'text', value: token.value };
        const pool = token.kind === 'card'
            ? cardNames
            // On exclut les autres formes du MÊME verbe (pop / popping) : jargon standardisé, pas de piège.
            : [...new Set(ACTION_KEYWORDS
                .filter(entry => !token.meta || entry.action.code !== token.meta.code)
                .map(entry => entry.action.display))];
        const options = shuffle([token.value, ...pickDistractors(pool, token.value, 3)]);
        return { kind: 'blank', blankKind: token.kind, answer: token.value, options };
    });

    if (!parts.some(part => part.kind === 'blank')) return null;
    return { stepId: step.id, parts };
}
