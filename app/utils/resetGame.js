import {
    useAccuracy,
    useGlobalCharIndex,
    useIndex,
    useIsStarted,
    useText,
    useWords,
    useWpm,
    useIsLoading
} from "~/composables/useGameData.js";
import generateText from "~/utils/generateText.js";

export default async function (redirection = '') {
    const isStarted = useIsStarted();
    const wpm = useWpm();
    const accuracy = useAccuracy();
    const text = useText();
    const words = useWords();
    const index = useIndex();
    const globalCharIndex = useGlobalCharIndex();
    const isLoading = useIsLoading();

    if (redirection.length > 0) navigateTo(redirection);

    isLoading.value = true;
    isStarted.value = false;
    wpm.value = 0;
    accuracy.value = 100;
    text.value = "";
    words.value.length = 0; // Use length to clear the array without replacing it
    index.value = 0;
    globalCharIndex.value = 0; // Reset globalCharIndex as well

    for (let i = 1; i <= 2; i++) {
        await generateText(text, words, globalCharIndex);
    }

    isLoading.value = false;
}
