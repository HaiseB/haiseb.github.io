import { getCard, loadCard } from './cardRepository.js';

const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 146">
        <rect width="100" height="146" rx="6" fill="#f8f9fa" stroke="#adb5bd" stroke-width="2"/>
        <circle cx="50" cy="62" r="20" fill="none" stroke="#adb5bd" stroke-width="2"/>
        <path d="M50 92 L50 118" stroke="#adb5bd" stroke-width="2"/>
    </svg>`
);

const ART_PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#f8f9fa"/>
        <circle cx="50" cy="40" r="16" fill="none" stroke="#adb5bd" stroke-width="3"/>
        <path d="M22 86a28 28 0 0 1 56 0" fill="none" stroke="#adb5bd" stroke-width="3"/>
    </svg>`
);

export function placeholderImage() {
    return PLACEHOLDER;
}

/** Placeholder carré, pour les avatars ronds. */
export function placeholderArt() {
    return ART_PLACEHOLDER;
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

/** Artwork carré (illustration seule), adapté aux avatars ronds. */
export function artUrlSync(name) {
    const card = getCard(name);
    return (card && (card.imageArt || card.imageSmall)) || ART_PLACEHOLDER;
}

export async function artUrl(name, apiName) {
    const card = getCard(name) || await loadCard(name, apiName);
    return (card && (card.imageArt || card.imageSmall)) || ART_PLACEHOLDER;
}
