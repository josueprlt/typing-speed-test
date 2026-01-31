export default function (paragraph, globalCharIndex) {
    const wordStrings = paragraph.split(' ').filter(str => str.length > 0);

    return wordStrings.map((wordStr) => {
        const chars = wordStr.split('').map(char => ({
            char: char,
            id: globalCharIndex.value++,
            status: null,
            incorrectChar: null
        }));

        chars.push({
            char: ' ',
            id: globalCharIndex.value++,
            status: null,
            incorrectChar: null
        });

        return chars;
    });
}