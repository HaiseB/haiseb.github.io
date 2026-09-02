import { cards as mementoCards } from './decks/memento/cards.js';
import { combos as mementoCombos } from './decks/memento/combos.js';

/**
 * Registre des decks. Ajouter un deck = ajouter une entrée ici,
 * le moteur et les mini-jeux n'ont aucune connaissance de Memento.
 */
export const decks = [
    {
        id: 'memento',
        name: 'Memento',
        displayName: 'Memento / Mementotlan',
        emoji: '🦴',
        cards: mementoCards,
        combos: mementoCombos
    }
];

export function getDeck(deckId) {
    return decks.find(deck => deck.id === deckId) || null;
}
