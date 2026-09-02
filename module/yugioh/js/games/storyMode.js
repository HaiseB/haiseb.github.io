import { el, clear, button } from '../components/ui.js';
import { cardView } from '../components/cardView.js';
import { storyLine, stepPhase } from '../engine/combo.js';
import { computeScore } from '../services/scoreService.js';

export const meta = {
    id: 'story',
    name: 'Story / Emoji',
    emoji: '🎭',
    description: 'La combo racontée en images mentales, révélée beat par beat.'
};

export function start(container, ctx) {
    const beats = ctx.route.steps.map(step => ({
        step,
        line: storyLine(step, ctx.emojiOf),
        card: step.actor
    }));

    const startedAt = Date.now();
    let index = 0;
    const revealed = new Set();

    const view = el('div', { class: 'ygo-game' });
    container.append(view);
    render();

    function render() {
        clear(view);
        const beat = beats[index];
        const phase = stepPhase(beat.step);
        const isRevealed = revealed.has(index);

        view.append(
            el('div', { class: 'ygo-progressbar' }, [el('div', { class: 'ygo-progressbar__fill' })]),
            el('div', { class: 'ygo-step-meta' }, [
                el('span', { class: 'ygo-badge', text: `${phase.emoji} ${phase.label}` }),
                el('span', { class: 'ygo-step-count', text: `${index + 1} / ${beats.length}` })
            ]),
            el('p', { class: 'ygo-story-line', text: beat.line }),
            beat.card
                ? (isRevealed
                    ? el('div', { class: 'ygo-story-reveal' }, [
                        cardView(beat.card, { size: 'medium', emoji: ctx.emojiOf(beat.card) }),
                        el('p', { class: 'ygo-story-technical', text: beat.step.text })
                    ])
                    : button('Qui est-ce ? 👁️', { variant: 'ghost', onClick: () => { revealed.add(index); render(); } }))
                : el('p', { class: 'ygo-story-technical', text: beat.step.text }),
            el('div', { class: 'ygo-story-past' }, beats.slice(Math.max(0, index - 3), index).map(previous =>
                el('p', { class: 'ygo-story-past__line', text: previous.line }))),
            el('div', { class: 'ygo-nav' }, [
                button('◀ Précédent', { variant: 'ghost', disabled: index === 0, onClick: () => { index--; render(); } }),
                index < beats.length - 1
                    ? button('Suivant ▶', { variant: 'primary', onClick: () => { index++; render(); } })
                    : button('Terminer ✓', { variant: 'primary', onClick: finish })
            ])
        );
        view.querySelector('.ygo-progressbar__fill').style.width = `${((index + 1) / beats.length) * 100}%`;
    }

    function finish() {
        const timeMs = Date.now() - startedAt;
        const withCard = beats.filter(beat => beat.card).length;
        const guessed = withCard - revealed.size;
        const accuracy = withCard ? Math.max(0, guessed / withCard) : 1;
        const { score, breakdown } = computeScore({
            correct: Math.max(0, guessed), total: withCard, timeMs, completed: true, multiplier: 1
        });
        ctx.finish({
            success: true,
            score,
            timeMs,
            accuracy,
            details: [`${revealed.size} révélation(s) utilisée(s)`, ...breakdown.map(item => `${item.label} +${item.value}`)]
        });
    }
}
