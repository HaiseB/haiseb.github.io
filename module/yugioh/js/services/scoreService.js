/**
 * Score simple et lisible :
 *   +20 par bonne réponse
 *   +100 combo complétée
 *   +50 sans faute
 *   +25 rapide
 *   +10 par palier de série
 */
export function computeScore({ correct = 0, total = 0, timeMs = 0, maxStreak = 0, completed = false, multiplier = 1 }) {
    const perfect = completed && correct === total && total > 0;
    const fast = completed && total > 0 && timeMs > 0 && timeMs < total * 7000;

    const breakdown = [];
    if (correct) breakdown.push({ label: 'Bonnes réponses', value: correct * 20 });
    if (completed) breakdown.push({ label: 'Combo Complete', value: 100 });
    if (perfect) breakdown.push({ label: 'Perfect', value: 50 });
    if (fast) breakdown.push({ label: 'Fast', value: 25 });
    if (maxStreak > 1) breakdown.push({ label: `Streak x${maxStreak}`, value: maxStreak * 10 });

    const raw = breakdown.reduce((sum, item) => sum + item.value, 0);
    const score = Math.round(raw * multiplier);
    return { score, perfect, fast, breakdown, multiplier };
}

export function formatTime(ms) {
    if (!ms) return '—';
    const seconds = Math.round(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return minutes ? `${minutes}m ${String(seconds % 60).padStart(2, '0')}s` : `${seconds}s`;
}
