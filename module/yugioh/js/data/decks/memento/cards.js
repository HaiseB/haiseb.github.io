/**
 * Cartes du deck Memento / Mementotlan.
 * `name`    : nom exact utilisé dans les combos (c'est CE nom que le joueur doit mémoriser).
 * `apiName` : nom à envoyer à la base de cartes si différent (optionnel).
 * `emoji`   : utilisé par la Memory View et le Story Mode.
 */
export const cards = [
    { name: 'Mementotlan Angwitch', short: 'Angwitch', emoji: '🧙‍♀️', role: 'starter' },
    { name: 'Mementotlan Tatsunootoshigo', short: 'Tatsunootoshigo', emoji: '🐉', role: 'main' },
    { name: 'Mementotlan Mace', short: 'Mace', emoji: '🔨', role: 'main' },
    { name: 'Mementotlan Goblin', short: 'Goblin', emoji: '👺', role: 'main' },
    { name: 'Mementotlan Shleepy', short: 'Shleepy', emoji: '🐑', role: 'main' },
    { name: 'Mementotlan Ghattic', short: 'Ghattic', emoji: '🐱', role: 'main' },
    { name: 'Mementotlan Akihiron', short: 'Akihiron', emoji: '🦖', role: 'main' },
    { name: 'Mementotlan Dark Blade', short: 'Dark Blade', emoji: '⚔️', role: 'main' },
    { name: 'Mementotlan-Horned Dragon', apiName: 'Mementotlan Horned Dragon', short: 'Horned Dragon', emoji: '🦕', role: 'main' },
    { name: 'Mementotlan Fusion', short: 'Fusion', emoji: '🌀', role: 'spell' },
    { name: 'Mementotlan Bone Party', short: 'Bone Party', emoji: '🦴', role: 'spell' },
    { name: 'Mementomictlan', short: 'Mementomictlan', emoji: '🏟️', role: 'field' },
    { name: 'Mementomictlan Tecuhtlica - Creation King', short: 'Tecuhtlica', emoji: '👑', role: 'fusion' },
    { name: 'Mementoal Tecuhtlica - Combined Creation', short: 'Combined Creation', emoji: '👹', role: 'fusion' },
    { name: 'Mementotlan Twin Dragon', short: 'Twin Dragon', emoji: '🐉🐉', role: 'fusion' },
    { name: 'Cross-Sheep', short: 'Cross-Sheep', emoji: '🐏', role: 'extra' }
];
