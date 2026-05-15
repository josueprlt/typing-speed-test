export default async function updateSuccess(success, playerWpm, playerAccuracy) {

    for (const su of success) {
        if (playerWpm || playerAccuracy) {
            if (su.theme === 'wpm' && !su.isUnlocked) {
                if (playerWpm >= su.achieveScore) {
                    su.isUnlocked = true;
                } else {
                    if (playerWpm > su.currentScore) {
                        su.currentScore = playerWpm;
                    }
                }
            } else if (su.theme === 'accuracy' && !su.isUnlocked) {
                if (playerAccuracy >= su.achieveScore) {
                    su.isUnlocked = true;
                } else {
                    if (playerAccuracy > su.currentScore) {
                        su.currentScore = playerAccuracy;
                    }
                }
            } else if (su.theme === 'wpm-accuracy' && !su.isUnlocked) {
                if (playerWpm >= su.achieveScoreWpm && playerAccuracy >= su.achieveScoreAccuracy) {
                    su.isUnlocked = true;
                } else {
                    if (playerWpm > su.currentScoreWpm) {
                        su.currentScoreWpm = playerWpm;
                    }
                    if (playerAccuracy > su.currentScoreAccuracy) {
                        su.currentScoreAccuracy = playerAccuracy;
                    }
                }
            }
        } else if (su.theme === 'timer' && !su.isUnlocked) {
            if (su.currentScore >= su.achieveScore) {
                su.isUnlocked = true;
            } else {
                su.currentScore += 1000;
            }
        }
    }

    localStorage.setItem('success', JSON.stringify(success));
}