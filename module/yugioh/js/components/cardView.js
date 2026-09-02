import { el } from './ui.js';
import { imageUrlSync, imageUrl, placeholderImage } from '../services/cardImageService.js';

/**
 * Carte visuelle réutilisable.
 * Tailles : small | medium | large. États : selected, correct, wrong, locked.
 */
export function cardView(name, { size = 'medium', emoji = '🃏', state = null, label = null, onClick = null, apiName = null } = {}) {
    const classes = ['ygo-card', `ygo-card--${size}`];
    if (state) classes.push(`is-${state}`);

    const image = el('img', {
        class: 'ygo-card__img',
        attrs: { src: imageUrlSync(name), alt: name, loading: 'lazy' }
    });
    image.addEventListener('error', () => { image.src = placeholderImage(); });

    imageUrl(name, apiName).then(url => {
        if (url && image.src !== url) image.src = url;
    });

    const node = el(onClick ? 'button' : 'div', {
        class: classes.join(' '),
        attrs: onClick ? { type: 'button' } : {},
        on: onClick ? { click: () => onClick(name) } : {}
    }, [
        el('span', { class: 'ygo-card__emoji', text: emoji }),
        image,
        el('span', { class: 'ygo-card__name', text: label || name })
    ]);
    return node;
}

export function cardRow(names, options = {}) {
    return el('div', { class: 'ygo-card-row' }, names.map(name => cardView(name, options.forName ? options.forName(name) : options)));
}
