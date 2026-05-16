// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        preset: 'netlify'
    },
    routeRules: {
        '/': { prerender: true },
        '/result': { prerender: true },
        '/about': { prerender: true },
        '/achievements': { prerender: true },
    },
    runtimeConfig: {
        mistraApiKey: process.env.MISTRAL_API_KEY,
        promptDifficultyEasy: process.env.PROMPT_DIFFICULTY_EASY,
        promptDifficultyMedium: process.env.PROMPT_DIFFICULTY_MEDIUM,
        promptDifficultyHard: process.env.PROMPT_DIFFICULTY_HARD,
    },
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},
    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
            'autoprefixer': {},
        },
    },
    modules: [
        '@nuxtjs/google-fonts',
        '@nuxt/ui'
    ],
    css: ['~/assets/css/main.css'],
    googleFonts: {
        families: {
            Sora: [100, 300, 400, 500, 600, 700, 800, 900]
        }
    }
})