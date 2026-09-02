import { el, clear, button } from '../components/ui.js';
import { cardView } from '../components/cardView.js';
import { buildBlankQuestion, DIFFICULTIES } from '../engine/blanks.js';
import { routeCards, stepCards, stepPhase } from '../engine/combo.js';
import { computeScore } from '../services/scoreService.js';

export const meta = {
    id: 'fill-blank',
    name: 'Fill the Blank',
    emoji: '🕳️',
    description: 'Retrouver la carte ou l\'action masquée.'
};

export function start(container, ctx) {
    const view = el('div', { class: 'ygo-game' });
    container.append(view);
    renderDifficulty();

    function renderDifficulty() {
        clear(view);
        view.append(
            el('h3', { class: 'ygo-subtitle', text: 'Choisis la difficulté' }),
            el('div', { class: 'ygo-list' }, DIFFICULTIES.map(difficulty =>
                el('button', {
                    class: 'ygo-list-item', attrs: { type: 'button' },
                    on: { click: () => play(difficulty) }
                }, [
                    el('span', { class: 'ygo-list-item__title', text: difficulty.label }),
                    el('span', { class: 'ygo-list-item__sub', text: difficulty.hint }),
                    el('span', { class: 'ygo-list-item__meta', text: `x${difficulty.multiplier}` })
                ])))
        );
    }

    function play(difficulty) {
        const cardNames = routeCards(ctx.route);
        const questions = ctx.route.steps
            .map(step => ({ step, question: buildBlankQuestion(step, cardNames, difficulty.id) }))
            .filter(item => item.question);

        const startedAt = Date.now();
        let index = 0;
        let correct = 0;
        let total = 0;
        let streak = 0;
        let maxStreak = 0;

        renderQuestion();

        function renderQuestion() {
            clear(view);
            const { step, question } = questions[index];
            const phase = stepPhase(step);
            const blanks = question.parts.filter(part => part.kind === 'blank');
            let current = 0;

            const sentence = el('p', { class: 'ygo-blank-sentence' });
            const optionsBox = el('div', { class: 'ygo-options' });
            const feedback = el('p', { class: 'ygo-feedback' });

            view.append(
                el('div', { class: 'ygo-progressbar' }, [el('div', { class: 'ygo-progressbar__fill' })]),
                el('div', { class: 'ygo-step-meta' }, [
                    el('span', { class: 'ygo-badge', text: `${phase.emoji} ${phase.label}` }),
                    el('span', { class: 'ygo-badge', text: difficulty.label }),
                    el('span', { class: 'ygo-step-count', text: `${index + 1} / ${questions.length}` })
                ]),
                sentence,
                optionsBox,
                feedback
            );
            view.querySelector('.ygo-progressbar__fill').style.width = `${((index + 1) / questions.length) * 100}%`;
            drawSentence();
            drawOptions();

            function drawSentence() {
                clear(sentence);
                let blankIndex = -1;
                for (const part of question.parts) {
                    if (part.kind === 'text') {
                        sentence.append(document.createTextNode(part.value));
                        continue;
                    }
                    blankIndex += 1;
                    const state = part.filled ? (part.wasWrong ? 'wrong' : 'correct') : (blankIndex === current ? 'active' : 'idle');
                    sentence.append(el('span', {
                        class: `ygo-blank is-${state}`,
                        text: part.filled ? part.answer : '______'
                    }));
                }
            }

            function drawOptions() {
                clear(optionsBox);
                const blank = blanks[current];
                if (!blank) return;
                optionsBox.append(el('p', {
                    class: 'ygo-options__label',
                    text: blank.blankKind === 'card' ? 'Quelle carte ?' : 'Quelle action ?'
                }));
                for (const option of blank.options) {
                    optionsBox.append(button(option, {
                        variant: 'option',
                        onClick: () => answer(blank, option)
                    }));
                }
            }

            function answer(blank, option) {
                total += 1;
                const isCorrect = option === blank.answer;
                blank.filled = true;
                blank.wasWrong = !isCorrect;
                if (isCorrect) {
                    correct += 1;
                    streak += 1;
                    maxStreak = Math.max(maxStreak, streak);
                    feedback.textContent = '✅ Correct';
                    feedback.className = 'ygo-feedback is-correct';
                } else {
                    streak = 0;
                    feedback.textContent = `❌ Réponse : ${blank.answer}`;
                    feedback.className = 'ygo-feedback is-wrong';
                }
                current += 1;
                drawSentence();
                if (current < blanks.length) {
                    drawOptions();
                    return;
                }
                clear(optionsBox);
                optionsBox.append(
                    el('div', { class: 'ygo-card-row' }, stepCards(step).slice(0, 4).map(name =>
                        cardView(name, { size: 'small', emoji: ctx.emojiOf(name) }))),
                    button(index < questions.length - 1 ? 'Étape suivante ▶' : 'Terminer ✓', {
                        variant: 'primary',
                        onClick: () => {
                            if (index < questions.length - 1) {
                                index += 1;
                                renderQuestion();
                            } else {
                                finish();
                            }
                        }
                    })
                );
            }
        }

        function finish() {
            const timeMs = Date.now() - startedAt;
            const accuracy = total ? correct / total : 0;
            const { score, breakdown } = computeScore({
                correct, total, timeMs, maxStreak, completed: true, multiplier: difficulty.multiplier
            });
            ctx.finish({
                success: accuracy >= 0.6,
                score,
                timeMs,
                accuracy,
                details: [`${correct} / ${total} bonnes réponses`, ...breakdown.map(item => `${item.label} +${item.value}`)]
            });
        }
    }
}
