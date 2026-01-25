// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Sora: [100, 300, 400, 500, 600, 700, 800, 900]
    }
  }
})