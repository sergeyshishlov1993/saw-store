<template>
  <div class="wrapper" @click="changeState">
    <div class="wrapper__modal" @click.stop>
      <div class="wrapper__modal_title">
        <ui-text-h3>В кошику </ui-text-h3>

        <ui-text-h3
          ><span>({{ filterProducts.length }})</span> Товари</ui-text-h3
        >
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
          :itemTotalPrice="product.itemTotalPrice"
          :salePrice="product.sale_price"
        />
      </div>

      <div class="wrapper__modal_total">
        <ui-text-h4 class="btnToCatalog" @click="backToShopping">
          продовжити покупки
        </ui-text-h4>
        <ui-text-h4>всьго:</ui-text-h4>
        <ui-text-h4 class="price">{{ state.totalPriceCart }} грн</ui-text-h4>
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

const { calcTotal, blockScroll, state } = useCartData();
const router = useRouter();

const emit = defineEmits(["changeState"]);
const filterProducts = ref(state.productsInСart);

const changeState = () => {
  emit("changeState");
  blockScroll();
};

onMounted(async () => {
  await calcTotal();
  blockScroll();
});

const goToCart = () => {
  router.push("/cart?cart=Оформлення замовлення");
  state.showModalWindow = false;
  blockScroll();
};

const backToShopping = () => {
  state.showModalWindow = false;
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
  height: 100vh;

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

      h2 {
        font-size: 16px;

        span {
          font-weight: 700;
        }
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

@media screen and (max-width: 991px) {
  .wrapper__modal {
    margin: 100px 0;
  }
}

@media screen and (max-width: 426px) {
  .wrapper {
    &__modal {
      &_card {
        padding: 5px;
        height: 150px;
      }

      &_total {
        padding: 5px;

        h2 {
          font-size: 13px;
        }

        .price {
          font-size: 15px;
        }

        .btnToCatalog {
          font-size: 14px;
          &:hover {
            font-size: 14px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 374px) {
  .wrapper__modal {
    margin: 0;
  }
}

@media (hover: none) {
  .btnToCatalog:hover {
    background-color: initial;
    color: initial;
  }
}
</style>
