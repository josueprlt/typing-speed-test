import {Mistral} from "@mistralai/mistralai";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const difficulty = getRouterParam(event, 'difficulty');

    const mistral = new Mistral({
        apiKey: config.mistralApiKey,
    });

    let prompt: string = config.promptDifficultyEasy;

    if (difficulty === 'Medium') {
        prompt = config.promptDifficultyMedium;
    } else if (difficulty === 'Hard') {
        prompt = config.promptDifficultyHard;
    }

    try {
        const result = await mistral.chat.complete({
            model: "mistral-small-latest",
            messages: [
                {
                    role: "system",
                    content: prompt
                },
                {
                    role: "user",
                    content: prompt
                },
            ],

            temperature: 1,
        });

        return {
            // @ts-ignore
            text: result.choices[0].message.content
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la génération du texte",
        });
    }
});
