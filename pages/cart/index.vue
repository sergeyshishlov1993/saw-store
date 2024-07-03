<template>
  <div class="container">
    <div class="cart">
      <ui-text-h1>Оформлення замовлення</ui-text-h1>

      <the-cart-modal-sucses class="message" v-if="showSuccessModal" />

      <div class="cart__wrapper" v-else>
        <the-cart-form @show="showMessage" />
        <the-cart-item />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useScrollToTop from "~/utils/useScrollToTop";
import UiTextH1 from "~/components/Ui/UiTextH1.vue";
import TheCartForm from "./components/TheCartForm.vue";
import TheCartItem from "./components/TheCartItem.vue";
import TheCartModalSucses from "./components/TheCartModalSucses.vue";

const { scrollToTop } = useScrollToTop();

onMounted(() => {
  blockScroll();
});

const showSuccessModal = ref(false);

const blockScroll = () => {
  document.body.style.overflow = "";
};

function showMessage(arg) {
  showSuccessModal.value = arg;
  scrollToTop();
  setTimeout(() => {
    showSuccessModal.value = false;
  }, 2000);
}
</script>

<style lang="scss" scoped>
.cart {
  padding-top: 200px;
  display: flex;
  flex-direction: column;

  &__wrapper {
    display: flex;
    align-items: baseline;
    gap: 20px !important;
  }

  h2 {
    font-weight: 700;
  }
}

.message {
  margin-top: 100px;
}
</style>
