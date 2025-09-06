export default defineNuxtConfig({
  devtools: { enabled: true },

  imports: {
    autoImport: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  devServer: {
    port: 5173,
  },

  telemetry: false,

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
      ],
      title: 'ContractScan',
      meta: [
        { name: 'title', content: 'ContractScan' },
        {
          name: 'description',
          content: 'Search deployed contracts across 100+ EVM chains',
        },

        { property: 'og:image', content: 'https://contractscan.xyz/api/og' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://contractscan.xyz' },
        { property: 'og:title', content: 'ContractScan' },
        {
          property: 'og:description',
          content: 'Search deployed contracts across 100+ EVM chains',
        },

        {
          property: 'twitter:image',
          content: 'https://contractscan.xyz/api/og',
        },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://contractscan.xyz' },
        { property: 'twitter:title', content: 'ContractScan' },
        {
          property: 'twitter:description',
          content: 'Search deployed contracts across 100+ EVM chains',
        },
      ],
      script: [
        { async: true, src: 'https://cdn.metrical.xyz/script.js' },
        { innerHTML: 'window.metrical = { "app": "NHI_v97CY"}' },
      ],
    },
  },

  modules: ['@nuxt/eslint'],
  compatibilityDate: '2024-09-14',
});
