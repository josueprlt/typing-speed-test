export default function (event, startTime, index, words) {
    const key = event.key;
    const notIncludesKey = ['Shift', 'CapsLock', 'Tab', 'Alt', 'Control', 'Meta', 'Dead', 'Escape', 'AltGraph']

    if (!startTime.value) {
        startTime.value = Date.now();
    }

    if (notIncludesKey.includes(key)) {
        return;
    }

    const flatChars = words.value.flat();
    const currentChar = flatChars[index.value];

    if (!currentChar) return;

    if (key === currentChar.char) {
        currentChar.status = 'correct';
    } else {
        currentChar.status = 'incorrect';
        currentChar.incorrectChar = (key === ' ') ? '␣' : key;
    }

    index.value++;
}