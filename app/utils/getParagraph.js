export default async function(nbrs = 1) {
    try {
        const data = await $fetch(`/api/paragraph/${nbrs}`);

        if (!data) {
            throw new Error("Erreur lors de la récupération");
        }
        return data;

    } catch (err) {
        console.error("API Error, fallback used:", err.message);
        return "The quick brown fox jumps over the lazy dog. ";
    }
}