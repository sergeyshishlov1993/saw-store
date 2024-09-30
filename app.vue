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

    <noscript>
      <img
        height="1"
        width="1"
        style="display: none"
        src="https://www.facebook.com/tr?id=1952136378533536&ev=PageView&noscript=1"
      />
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
    "SAW STORE - Інтернет магазин професійного електроінструменту - Професійний та доступний електроінструмент - SAW STORE - Вибір професіоналів - Надійний електроінструмент для будь-яких задач - SAW STORE - Інструмент, на який можна покластися - Висока якість за доступною ціною - SAW STORE - Електроінструменти, які працюють за вас - Професійні рішення для кожного - SAW STORE - Технології, що надихають - Професійний електроінструмент для вашого бізнесу - SAW STORE - Якість, перевірена часом - Надійний інструмент для професіоналів - Купити еклектроінструмент - Купити акумуляторній інструмент",

  meta: [
    {
      name: "robots",
      content: "index, follow",
    },

    {
      name: "google-site-verification",
      content: "BRdJswll0IhW3sfNzGK-VpvdxKlYKmU0bfiHjXajdCU",
    },

    {
      name: "facebook-domain-verification",
      content: "ctgeid5xnf8et9zw0ord9fbku332ar",
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

    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-5SQKZ924ND",
      async: true,
    },

    {
      hid: "google-analytics",
      innerHTML: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5SQKZ924ND');`,
      type: "text/javascript",
      charset: "utf-8",
    },

    {
      hid: "google-ads",
      innerHTML: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16713078315');`,
      type: "text/javascript",
      charset: "utf-8",
    },

    {
      hid: "fb-pixel",
      innerHTML: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1952136378533536');
      fbq('track', 'PageView');`,
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
