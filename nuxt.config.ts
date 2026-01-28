// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      'autoprefixer': {},
    },
  },
  modules: [
    'nuxt-svgo',
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