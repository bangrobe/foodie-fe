// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  // buildModules: ['@averjs/nuxt-compression'],
  // compression: {
  //   viteCompression: {
  //     algorithm: 'brotliCompress'
  //   }
  // },
  build: {
  },
  runtimeConfig: {
    public: {
      BASE_API_URL: process.env.BASE_API_URL
    },
  }
});
