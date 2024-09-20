<template>
  <div class="layout">
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-KNBJTMTM"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe>
    </noscript>

    <the-header />

    <the-cart-modal v-if="state.showModalWindow" @change-state="closeModal" />

    <NuxtPage />

    <icon-chevron class="chevron" v-if="showScrollToTop" @click="scrollToTop" />

    <the-form-feedback titleForm="ПОТРІБНА КОНСУЛЬТАЦІЯ?" />
    <the-footer />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import TheHeader from "./components/Block/TheHeader.vue";
import { useCartData } from "~/stores/cartData";
import TheFooter from "./components/Block/TheFooter.vue";
import IconChevron from "./assets/icons/IconChevron.vue";
import TheFormFeedback from "./components/Block/TheFormFeedback.vue";
import TheCartModal from "./components/Block/TheCartModal.vue";
import useScrollToTop from "./utils/useScrollToTop";

import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";

const router = useRouter();
const { showScrollToTop, scrollToTop } = useScrollToTop();
const { closeModal, state } = useCartData();

useHead({
  title:
    "SAW STORE - Інтернет магазин професійного електроінструменту - Професійний та доступний електроінструмент - SAW STORE - Вибір професіоналів - Надійний електроінструмент для будь-яких задач - SAW STORE - Інструмент, на який можна покластися - Висока якість за доступною ціною - SAW STORE - Електроінструменти, які працюють за вас - Професійні рішення для кожного - SAW STORE - Технології, що надихають - Професійний електроінструмент для вашого бізнесу - SAW STORE - Якість, перевірена часом - Надійний інструмент для професіоналів",

  meta: [
    {
      name: "robots",
      content: "index, follow",
    },

    {
      name: "google-site-verification",
      content: "BRdJswll0IhW3sfNzGK-VpvdxKlYKmU0bfiHjXajdCU",
    },
  ],

  script: [
    {
      hid: "gtm-script",
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KNBJTMTM');`,
      type: "text/javascript",
      charset: "utf-8",
    },
  ],
  __dangerouslyDisableSanitizers: ["script"],
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.container {
  flex-grow: 1;
}

.chevron {
  position: fixed;
  top: 600px;
  right: 25px;
  z-index: 15;
}

@media screen and (max-width: 767px) {
  .chevron {
    width: 45px;
  }
}
</style>
