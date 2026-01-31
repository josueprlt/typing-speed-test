export default defineEventHandler(async (event) => {
    const nb = getRouterParam(event, 'nb') || 1;

    try {
        const data = await $fetch(`http://metaphorpsum.com/paragraphs/${nb}`, {
            parseResponse: (txt) => txt
        });
        return data + ' ';
    } catch (e) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Erreur API Metaphorpsum',
        })
    }
});