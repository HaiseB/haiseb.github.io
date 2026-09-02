import { el, clear, button, appendAll } from '../components/ui.js';
import { cardView } from '../components/cardView.js';
import { stepCards, stepActions, stepPhase, stepChainLabel, memoryLine } from '../engine/combo.js';
import { computeScore } from '../services/scoreService.js';

export const meta = {
    id: 'basic',
    name: 'Basic Form',
    emoji: '📜',
    description: 'Apprendre le squelette de la combo, étape par étape.'
};

export function start(container, ctx) {
    const steps = ctx.route.steps;
    const startedAt = Date.now();
    let index = 0;
    let technical = true;
    let explanation = true;

    const view = el('div', { class: 'ygo-game' });
    container.append(view);
    render();

    function render() {
        clear(view);
        const step = steps[index];
        const phase = stepPhase(step);
        const chain = stepChainLabel(step);

        view.append(
            el('div', { class: 'ygo-progressbar' }, [
                el('div', { class: 'ygo-progressbar__fill' })
            ]),
            el('div', { class: 'ygo-step-meta' }, [
                el('span', { class: 'ygo-badge', text: `${phase.emoji} ${phase.label}` }),
                chain ? el('span', { class: 'ygo-badge ygo-badge--chain', text: chain }) : null,
                el('span', { class: 'ygo-step-count', text: `${index + 1} / ${steps.length}` })
            ]),
            el('div', { class: 'ygo-card-row' }, stepCards(step).map(name => cardView(name, {
                size: 'medium',
                emoji: ctx.emojiOf(name)
            }))),
            el('div', { class: 'ygo-step-text' }, [
                technical
                    ? el('p', { class: 'ygo-step-text__technical', text: step.text })
                    : el('p', { class: 'ygo-step-text__memory', text: memoryLine(step, ctx.emojiOf) })
            ])
        );

        appendAll(view, [
            explanation
                ? el('div', { class: 'ygo-actions-list' }, stepActions(step).map(action =>
                    el('span', { class: 'ygo-chip', text: `${action.emoji} ${action.display} — ${action.label}` })))
                : null,
            explanation && step.tags && step.tags.length
                ? el('div', { class: 'ygo-tags' }, step.tags.map(tag => el('span', { class: 'ygo-tag', text: `#${tag}` })))
                : null,
            el('div', { class: 'ygo-toolbar' }, [
                button(technical ? 'Memory View' : 'Technical View', { variant: 'ghost', onClick: () => { technical = !technical; render(); } }),
                button(explanation ? 'Masquer détails' : 'Afficher détails', { variant: 'ghost', onClick: () => { explanation = !explanation; render(); } })
            ]),
            index === steps.length - 1 && ctx.route.endNote
                ? el('p', { class: 'ygo-note', text: ctx.route.endNote })
                : null,
            el('div', { class: 'ygo-nav' }, [
                button('◀ Précédent', { variant: 'ghost', disabled: index === 0, onClick: () => { index--; render(); } }),
                index < steps.length - 1
                    ? button('Suivant ▶', { variant: 'primary', onClick: () => { index++; render(); } })
                    : button('Terminer ✓', { variant: 'primary', onClick: finish })
            ])
        ]);

        const fill = view.querySelector('.ygo-progressbar__fill');
        fill.style.width = `${((index + 1) / steps.length) * 100}%`;
    }

    function finish() {
        const timeMs = Date.now() - startedAt;
        const { score } = computeScore({
            correct: steps.length,
            total: steps.length,
            timeMs,
            completed: true,
            multiplier: 1
        });
        ctx.finish({ success: true, score, timeMs, accuracy: 1, details: [`${steps.length} étapes parcourues`] });
    }
}
