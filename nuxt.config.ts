// https://nuxt.com/docs/api/configuration/nuxt-config
import axios from "axios";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/app.scss"],

  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@pinia/nuxt",
    "nuxt-swiper",
    "@nuxtjs/sitemap",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "57x57",
          href: "/apple-icon-57x57.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "60x60",
          href: "/apple-icon-60x60.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "72x72",
          href: "/apple-icon-72x72.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "76x76",
          href: "/apple-icon-76x76.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "114x114",
          href: "/apple-icon-114x114.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "120x120",
          href: "/apple-icon-120x120.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "144x144",
          href: "/apple-icon-144x144.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "152x152",
          href: "/apple-icon-152x152.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-icon-180x180.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-icon-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/manifest.json" },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#ffffff" },
        { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
        { name: "theme-color", content: "#ffffff" },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
          type: "text/javascript",
        },
      ],
    },
  },

  sitemap: {
    hostname: "https://sawstore.com.ua",
    gzip: true,
    urls: async () => {
      try {
        const categoriesResponse = await axios.get(
          `${apiUrl}/products/category`
        );
        const categories = categoriesResponse.data.category;
        const subCategories = categoriesResponse.data.subCategory;

        const productsResponse = await axios.get(`${apiUrl}/products`);
        const products = productsResponse.data.products;

        const productRoutes = products
          .map((product) => {
            const subCategory = subCategories.find(
              (sub) => sub.sub_category_id === product.sub_category_id
            );

            if (subCategory) {
              const category = categories.find(
                (cat) => cat.id === subCategory.parent_id
              );

              if (category) {
                const route = `/products/${category.id}/${subCategory.sub_category_id}/${product.product_id}`;

                return route;
              }
            }

            return null;
          })
          .filter(Boolean);

        const staticRoutes = [
          "/",
          "/about",
          "/bestseller",
          "/buyer",
          "/cart",
          "/sale",
          "/search",
        ];

        return [...staticRoutes, ...productRoutes];
      } catch (error) {
        console.error("Помилка при отриманні даних з API:", error);
        return [];
      }
    },
  },

  compatibilityDate: "2024-09-19",
});
