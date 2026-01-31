import {nextTick} from "vue";

export default async function (index) {
    await nextTick();

    const parentElt = document.querySelector('#sectionId');
    const actualCarac = document.querySelector(`#char-${index.value}`);

    if (!actualCarac || !parentElt) return;

    actualCarac.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
    });
}