// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  postcss: {
    plugins: { tailwindcss: {} },
  },
  imports: {
    dirs: ['composables/first'],
  },
  css: ['~/assets/css/tailwind.css'],
})
