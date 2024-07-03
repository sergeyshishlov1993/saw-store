<template>
  <div class="wrapper" @click="changeState">
    <div class="wrapper__modal" @click.stop>
      <div class="wrapper__modal_title">
        <ui-text-h3>В кошику</ui-text-h3>
        <icon-close @click="changeState" />
      </div>

      <div class="wrapper__modal_card">
        <the-cart-card
          v-for="product in filterProducts"
          :key="product.product_id"
          :id="product.product_id"
          :title="product.product_name"
          :count="product.count"
          :path="product.pictures[0].pictures_name"
          :price="product.price"
        />
      </div>

      <div class="wrapper__modal_total">
        <ui-text-h4 class="btnToCatalog" @click="backToShopping">
          продовжите покупки
        </ui-text-h4>
        <ui-text-h4>всьго:</ui-text-h4>
        <ui-text-h4 class="price">{{ totalPriceCart[0] }} грн</ui-text-h4>
      </div>

      <div class="wrapper__modal_btn">
        <ui-btn @click="goToCart">Оформити замовлення</ui-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import UiTextH3 from "~/components/Ui/UiTextH3.vue";
import UiTextH4 from "~/components/Ui/UiTextH4.vue";
import IconClose from "~/assets/icons/IconClose.vue";
import { useCartData } from "~/stores/cartData";
import TheCartCard from "~/pages/cart/components/TheCartCard.vue";
import UiBtn from "../Ui/UiBtn.vue";

const {
  productsInСart,
  showModalWindow,
  totalPriceCart,
  calcTotal,
  blockScroll,
  removeBlockScroll,
} = useCartData();
const router = useRouter();

const emit = defineEmits(["changeState"]);
const filterProducts = ref(productsInСart);

const changeState = () => {
  emit("changeState");
  blockScroll();
};

onMounted(async () => {
  await calcTotal();
  blockScroll();
});

const goToCart = () => {
  router.push("/cart");
  showModalWindow[0] = false;
  blockScroll();
};

const backToShopping = () => {
  showModalWindow[0] = false;
  document.body.style.overflow = "";
};
</script>

<style lang="scss" scoped>
.openModal {
  overflow: hidden;
}

.wrapper {
  padding: 100px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;

  &__modal {
    margin: 150px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    border-radius: 20px;
    padding-bottom: 20px;
    background: white;

    &_title {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        width: 40px;
      }
    }

    &_card {
      height: 300px;
      padding: 20px;
      border-bottom: 1px solid gray;
      overflow-y: auto;
      overflow-x: hidden;
    }

    &_total {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .price {
        font-weight: 700;
        font-size: 20px;
      }

      .btnToCatalog {
        font-weight: 500;
        text-decoration: underline;
        cursor: pointer;
        transition: font-size 0.3s ease, font-weight 0.3s ease;
        color: blue;

        &:hover {
          font-size: 17px;
          font-weight: 700;
        }
      }
    }

    &_btn {
      align-self: center;
    }
  }
}
</style>
