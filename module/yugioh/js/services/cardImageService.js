import { getCard, loadCard } from './cardRepository.js';

const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 146">
        <rect width="100" height="146" rx="6" fill="#1b1720" stroke="#6c5a8f" stroke-width="2"/>
        <circle cx="50" cy="62" r="20" fill="none" stroke="#6c5a8f" stroke-width="2"/>
        <path d="M50 92 L50 118" stroke="#6c5a8f" stroke-width="2"/>
    </svg>`
);

export function placeholderImage() {
    return PLACEHOLDER;
}

/** URL immédiate (cache) : jamais d'URL écrite à la main dans les données. */
export function imageUrlSync(name) {
    const card = getCard(name);
    return (card && card.imageSmall) || PLACEHOLDER;
}

/** Résout l'image d'une carte à partir de son seul nom. */
export async function imageUrl(name, apiName) {
    const card = getCard(name) || await loadCard(name, apiName);
    return (card && card.imageSmall) || PLACEHOLDER;
}
