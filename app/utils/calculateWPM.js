export default function (currentTime, startTime, correctStreak) {
    const timeElapsedInMinutes = (currentTime - startTime.value) / 60000;
    if (timeElapsedInMinutes > 0) {
        const rawWpm = (correctStreak / 5) / timeElapsedInMinutes;
        return Math.round(rawWpm);
    }
}