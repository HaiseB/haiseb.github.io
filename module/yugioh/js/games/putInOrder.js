import { el, clear, button } from '../components/ui.js';
import { shuffle, stepPhase } from '../engine/combo.js';
import { computeScore } from '../services/scoreService.js';

export const meta = {
    id: 'put-in-order',
    name: 'Put in Order',
    emoji: '🔀',
    description: 'Remettre les étapes dans le bon ordre (tactile, sans drag & drop).'
};

const WINDOW_SIZE = 5;

export function start(container, ctx) {
    const view = el('div', { class: 'ygo-game' });
    container.append(view);

    const windows = [];
    for (let i = 0; i < ctx.route.steps.length; i += WINDOW_SIZE) {
        windows.push(ctx.route.steps.slice(i, i + WINDOW_SIZE));
    }

    const startedAt = Date.now();
    let windowIndex = 0;
    let correct = 0;
    let total = 0;
    let streak = 0;
    let maxStreak = 0;

    renderWindow();

    function renderWindow() {
        clear(view);
        const steps = windows[windowIndex];
        const pool = shuffle(steps);
        const answer = [];
        let checked = false;

        const answerBox = el('ol', { class: 'ygo-order-answer' });
        const poolBox = el('div', { class: 'ygo-order-pool' });
        const feedback = el('p', { class: 'ygo-feedback' });
        const footer = el('div', { class: 'ygo-nav' });

        view.append(
            el('div', { class: 'ygo-progressbar' }, [el('div', { class: 'ygo-progressbar__fill' })]),
            el('div', { class: 'ygo-step-meta' }, [
                el('span', { class: 'ygo-badge', text: `${stepPhase(steps[0]).emoji} ${stepPhase(steps[0]).label}` }),
                el('span', { class: 'ygo-step-count', text: `Bloc ${windowIndex + 1} / ${windows.length}` })
            ]),
            el('p', { class: 'ygo-hint', text: 'Touche les étapes dans le bon ordre. Touche une étape placée pour la retirer.' }),
            answerBox,
            poolBox,
            feedback,
            footer
        );
        view.querySelector('.ygo-progressbar__fill').style.width = `${((windowIndex + 1) / windows.length) * 100}%`;

        draw();

        function draw() {
            clear(answerBox);
            answer.forEach((step, position) => {
                const state = checked ? (steps[position] === step ? 'correct' : 'wrong') : 'idle';
                answerBox.append(el('li', {
                    class: `ygo-order-item is-${state}`,
                    attrs: { role: 'button', tabindex: '0' },
                    on: checked ? {} : { click: () => { answer.splice(position, 1); draw(); } }
                }, [
                    el('span', { class: 'ygo-order-item__index', text: String(position + 1) }),
                    el('span', { class: 'ygo-order-item__text', text: step.text })
                ]));
            });
            for (let i = answer.length; i < steps.length; i++) {
                answerBox.append(el('li', { class: 'ygo-order-item is-empty', text: 'Emplacement libre' }));
            }

            clear(poolBox);
            for (const step of pool) {
                if (answer.includes(step)) continue;
                poolBox.append(el('button', {
                    class: 'ygo-order-chip',
                    attrs: { type: 'button' },
                    text: step.text,
                    on: { click: () => { answer.push(step); draw(); } }
                }));
            }

            clear(footer);
            if (!checked) {
                footer.append(button('Vérifier ✓', {
                    variant: 'primary',
                    disabled: answer.length !== steps.length,
                    onClick: check
                }));
            } else {
                footer.append(button(windowIndex < windows.length - 1 ? 'Bloc suivant ▶' : 'Terminer ✓', {
                    variant: 'primary',
                    onClick: () => {
                        if (windowIndex < windows.length - 1) {
                            windowIndex += 1;
                            renderWindow();
                        } else {
                            finish();
                        }
                    }
                }));
            }
        }

        function check() {
            checked = true;
            const good = answer.filter((step, position) => steps[position] === step).length;
            correct += good;
            total += steps.length;
            if (good === steps.length) {
                streak += 1;
                maxStreak = Math.max(maxStreak, streak);
                feedback.textContent = '✅ Bloc parfait';
                feedback.className = 'ygo-feedback is-correct';
            } else {
                streak = 0;
                feedback.textContent = `❌ ${good} / ${steps.length} bien placées`;
                feedback.className = 'ygo-feedback is-wrong';
            }
            draw();
        }
    }

    function finish() {
        const timeMs = Date.now() - startedAt;
        const accuracy = total ? correct / total : 0;
        const { score, breakdown } = computeScore({
            correct, total, timeMs, maxStreak, completed: true, multiplier: 1.3
        });
        ctx.finish({
            success: accuracy >= 0.7,
            score,
            timeMs,
            accuracy,
            details: [`${correct} / ${total} étapes bien placées`, ...breakdown.map(item => `${item.label} +${item.value}`)]
        });
    }
}
