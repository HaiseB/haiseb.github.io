/** Petits helpers DOM partagés par les écrans et les mini-jeux. */
export function el(tag, options = {}, children = []) {
    const node = document.createElement(tag);
    if (options.class) node.className = options.class;
    if (options.text !== undefined) node.textContent = options.text;
    if (options.html !== undefined) node.innerHTML = options.html;
    if (options.attrs) {
        for (const [key, value] of Object.entries(options.attrs)) {
            if (value !== null && value !== undefined) node.setAttribute(key, value);
        }
    }
    if (options.on) {
        for (const [event, handler] of Object.entries(options.on)) node.addEventListener(event, handler);
    }
    for (const child of [].concat(children)) {
        if (child === null || child === undefined || child === false) continue;
        node.append(child);
    }
    return node;
}

export function clear(node) {
    node.replaceChildren();
    return node;
}

/** Ajoute des enfants en ignorant les valeurs conditionnelles (null / false). */
export function appendAll(node, children) {
    for (const child of [].concat(children)) {
        if (child === null || child === undefined || child === false) continue;
        node.append(child);
    }
    return node;
}

export function button(label, { variant = 'ghost', onClick, disabled = false, className = '' } = {}) {
    return el('button', {
        class: `ygo-btn ygo-btn--${variant} ${className}`.trim(),
        text: label,
        attrs: { type: 'button', ...(disabled ? { disabled: 'disabled' } : {}) },
        on: onClick ? { click: onClick } : {}
    });
}
