import { decks, getDeck } from './data/index.js';
import { listRoutes, getRoute, routeCards } from './engine/combo.js';
import { preloadDeck } from './services/cardRepository.js';
import { artUrlSync, artUrl, placeholderArt } from './services/cardImageService.js';
import { getEntry, recordResult, masteryLabel, masteryStars, successRate } from './services/progressService.js';
import { formatTime } from './services/scoreService.js';
import { el, clear, button } from './components/ui.js';
import * as basicForm from './games/basicForm.js';
import * as fillBlank from './games/fillBlank.js';
import * as putInOrder from './games/putInOrder.js';
import * as storyMode from './games/storyMode.js';

const MODES = [basicForm, fillBlank, putInOrder, storyMode].map(module => ({ ...module.meta, start: module.start }));
const MODE_IDS = MODES.map(mode => mode.id);

const root = document.getElementById('app');

function getSettingsCookie() {
    const cookieData = document.cookie.replace(/(?:(?:^|.*;\s*)formData\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (!cookieData) return null;
    try {
        return JSON.parse(decodeURIComponent(cookieData));
    } catch (_) {
        return null;
    }
}

function cardVisualMode() {
    const settings = getSettingsCookie();
    return settings && settings.ygoCardVisualMode === 'image' ? 'image' : 'emoji';
}

function emojiOfFactory(deck) {
    const byName = new Map(deck.cards.map(card => [card.name, card.emoji]));
    return name => byName.get(name) || '🃏';
}

function screen(title, subtitle, backHash, content) {
    clear(root);
    root.append(
        el('header', { class: 'ygo-header' }, [
            backHash !== null
                ? el('a', { class: 'ygo-back', attrs: { href: backHash }, text: '◀' })
                : el('span', { class: 'ygo-back is-hidden', text: '◀' }),
            el('div', { class: 'ygo-header__titles' }, [
                el('h1', { class: 'ygo-title', text: title }),
                subtitle ? el('p', { class: 'ygo-subtitle', text: subtitle }) : null
            ])
        ]),
        el('main', { class: 'ygo-main' }, content)
    );
}

function renderDecks() {
    screen('Combo Breakdown', 'Choisis ton deck', null, [
        el('div', { class: 'ygo-list' }, decks.map(deck =>
            el('a', { class: 'ygo-list-item ygo-list-item--deck', attrs: { href: `#/deck/${deck.id}` } }, [
                deckAvatar(deck),
                el('span', { class: 'ygo-list-item__body' }, [
                    el('span', { class: 'ygo-list-item__title', text: deck.displayName }),
                    el('span', { class: 'ygo-list-item__sub', text: `${deck.combos.length} combo(s) · ${deck.cards.length} cartes` })
                ])
            ])))
    ]);
}

/** Avatar rond du deck : artwork d'une de ses cartes, jamais une URL en dur. */
function deckAvatar(deck) {
    const cardName = deck.avatarCard || (deck.cards[0] && deck.cards[0].name);
    if (!cardName) return el('span', { class: 'ygo-deck-avatar', text: deck.emoji });

    const card = deck.cards.find(entry => entry.name === cardName);
    const image = el('img', {
        class: 'ygo-deck-avatar',
        attrs: { src: artUrlSync(cardName), alt: cardName, loading: 'lazy' }
    });
    image.addEventListener('error', () => { image.src = placeholderArt(); });
    artUrl(cardName, card && card.apiName).then(url => {
        if (url && image.src !== url) image.src = url;
    });
    return image;
}

function renderRoutes(deckId) {
    const deck = getDeck(deckId);
    if (!deck) return renderDecks();
    preloadDeck(deck.cards);

    const routes = listRoutes(deck);
    const mains = routes.filter(route => !route.branchId);
    const branches = routes.filter(route => route.branchId);

    screen(deck.displayName, 'Choisis une combo ou une branche', '#/', [
        el('h2', { class: 'ygo-section-title', text: 'Combos' }),
        el('div', { class: 'ygo-list' }, mains.map(route => routeItem(deck, route))),
        branches.length ? el('h2', { class: 'ygo-section-title', text: 'Branches' }) : null,
        branches.length ? el('div', { class: 'ygo-list' }, branches.map(route => routeItem(deck, route))) : null
    ]);
}

function routeItem(deck, route) {
    const best = MODE_IDS
        .map(modeId => getEntry(deck.id, route.id, modeId).mastery)
        .reduce((max, value) => Math.max(max, value), 0);
    return el('a', { class: 'ygo-list-item', attrs: { href: `#/route/${deck.id}/${encodeURIComponent(route.id)}` } }, [
        el('span', { class: 'ygo-list-item__title', text: `${route.emoji} ${route.name}` }),
        el('span', { class: 'ygo-list-item__sub', text: `${route.steps.length} étapes · ${route.branchId ? route.comboName : 'ligne principale'}` }),
        el('span', { class: 'ygo-list-item__meta', text: masteryStars(best) })
    ]);
}

function renderModes(deckId, routeId) {
    const deck = getDeck(deckId);
    const route = deck && getRoute(deck, routeId);
    if (!route) return renderDecks();
    preloadDeck(deck.cards);

    screen(route.name, `${deck.displayName} · ${route.steps.length} étapes`, `#/deck/${deck.id}`, [
        el('div', { class: 'ygo-tags' }, [
            ...route.tags.map(tag => el('span', { class: 'ygo-tag', text: `#${tag}` })),
            el('span', { class: 'ygo-tag', text: `${routeCards(route).length} cartes` })
        ]),
        el('h2', { class: 'ygo-section-title', text: 'Choisis un entraînement' }),
        el('div', { class: 'ygo-list' }, MODES.map(mode => {
            const entry = getEntry(deck.id, route.id, mode.id);
            return el('a', {
                class: 'ygo-list-item',
                attrs: { href: `#/play/${deck.id}/${encodeURIComponent(route.id)}/${mode.id}` }
            }, [
                el('span', { class: 'ygo-list-item__title', text: `${mode.emoji} ${mode.name}` }),
                el('span', { class: 'ygo-list-item__sub', text: mode.description }),
                el('span', { class: 'ygo-list-item__meta', text: masteryStars(entry.mastery) }),
                entry.attempts
                    ? el('span', { class: 'ygo-list-item__stats', text: `${masteryLabel(entry.mastery)} · ${successRate(entry)}% · best ${entry.bestScore}` })
                    : null
            ]);
        }))
    ]);
}

function renderPlay(deckId, routeId, modeId) {
    const deck = getDeck(deckId);
    const route = deck && getRoute(deck, routeId);
    const mode = MODES.find(item => item.id === modeId);
    if (!route || !mode) return renderDecks();
    preloadDeck(deck.cards);

    screen(`${mode.emoji} ${mode.name}`, route.name, `#/route/${deck.id}/${encodeURIComponent(route.id)}`, []);
    const main = root.querySelector('.ygo-main');

    mode.start(main, {
        deck,
        route,
        emojiOf: emojiOfFactory(deck),
        cardVisualMode: cardVisualMode(),
        finish: result => {
            const entry = recordResult(deck.id, route.id, mode.id, result);
            renderResult(deck, route, mode, result, entry);
        },
        exit: () => { window.location.hash = `#/route/${deck.id}/${encodeURIComponent(route.id)}`; }
    });
}

function renderResult(deck, route, mode, result, entry) {
    screen(result.success ? '🏆 Terminé' : '💀 À retravailler', `${mode.name} · ${route.name}`, `#/route/${deck.id}/${encodeURIComponent(route.id)}`, [
        el('div', { class: 'ygo-score' }, [
            el('p', { class: 'ygo-score__value', text: `${result.score} pts` }),
            el('p', { class: 'ygo-score__sub', text: `Précision ${Math.round(result.accuracy * 100)}% · ${formatTime(result.timeMs)}` })
        ]),
        el('ul', { class: 'ygo-score__details' }, (result.details || []).map(detail => el('li', { text: detail }))),
        el('div', { class: 'ygo-score__mastery' }, [
            el('p', { text: `Maîtrise : ${masteryStars(entry.mastery)} ${masteryLabel(entry.mastery)}` }),
            el('p', { text: `Tentatives ${entry.attempts} · Réussites ${entry.successes} · Série ${entry.streak}` }),
            el('p', { text: `Meilleur score ${entry.bestScore} · Meilleur temps ${formatTime(entry.bestTimeMs)}` })
        ]),
        !result.success || (entry.attempts > 2 && entry.mastery <= 2)
            ? el('p', { class: 'ygo-note', text: 'Tu rates souvent cette partie : refais-la une ou deux fois avant de passer à la suite.' })
            : null,
        el('div', { class: 'ygo-nav' }, [
            button('Rejouer ↻', { variant: 'ghost', onClick: () => renderPlay(deck.id, route.id, mode.id) }),
            button('Autres modes ▶', { variant: 'primary', onClick: () => { window.location.hash = `#/route/${deck.id}/${encodeURIComponent(route.id)}`; } })
        ])
    ]);
}

function router() {
    const parts = (window.location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    if (parts[0] === 'deck' && parts[1]) return renderRoutes(parts[1]);
    if (parts[0] === 'route' && parts[1] && parts[2]) return renderModes(parts[1], parts[2]);
    if (parts[0] === 'play' && parts[1] && parts[2] && parts[3]) return renderPlay(parts[1], parts[2], parts[3]);
    return renderDecks();
}

window.addEventListener('hashchange', router);
window.addEventListener('settings:updated', router);
router();
