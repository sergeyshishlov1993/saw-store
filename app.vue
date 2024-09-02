<template>
  <div class="layout">
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
  ],
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
</style>
