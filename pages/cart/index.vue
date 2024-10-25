<template>
  <div class="container">
    <div class="cart">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <ui-text-h1>Оформлення замовлення</ui-text-h1>

      <the-modal-sucses
        class="message"
        notificationText="cart"
        v-if="showSuccessModal"
      />

      <div class="cart__wrapper" v-else>
        <the-cart-form @show="showMessage" />
        <the-cart-item />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useScrollToTop from "~/utils/useScrollToTop";
import UiTextH1 from "~/components/Ui/UiTextH1.vue";
import TheCartForm from "./components/TheCartForm.vue";
import TheCartItem from "./components/TheCartItem.vue";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";
import TheModalSucses from "~/components/Block/TheModalSucses.vue";

const { scrollToTop } = useScrollToTop();
const route = useRoute();
const router = useRouter();

const breadcrumb = ref([
  { name: "Головна", path: "/" },

  {
    name: route.query.cart,
    path: `${route.path}?cart=${route.query.cart}`,
  },
]);

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
    router.push("/");
  }, 2000);
}
</script>

<style lang="scss" scoped>
.cart {
  padding-top: 150px;
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 50px;
  }

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

@media screen and (max-width: 1023px) {
  .cart {
    h2 {
      font-size: 22px;
    }
    &__wrapper {
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 991px) {
  .cart {
    padding-top: 80px;
  }
}

@media screen and (max-width: 767px) {
  .cart {
    h2 {
      margin-top: 20px;
    }
  }
}
</style>
