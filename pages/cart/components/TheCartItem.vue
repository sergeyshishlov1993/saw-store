<template>
  <div class="cart__item">
    <div class="cart__item_title">
      <ui-text-h5>У кошику</ui-text-h5>

      <button @click="emptyTrash">
        <ui-text-h5>Очистити кошик</ui-text-h5>
      </button>
    </div>

    <div class="cart__item_messange" v-if="!state.productsInСart.length">
      <ui-text-h4> Ваш кошик порожній.</ui-text-h4>
    </div>

    <div v-else>
      <the-cart-card
        v-for="product in state.productsInСart"
        :key="product.product_id"
        :id="product.product_id"
        :title="product.product_name"
        :count="product.count"
        :path="product.pictures[product.pictures.length - 1].pictures_name"
        :price="product.price"
        :itemTotalPrice="product.itemTotalPrice"
        :salePrice="product.sale_price"
      />
    </div>

    <div class="cart__item_total">
      <ui-text-h5>Разом:</ui-text-h5>
      <ui-text-h2 class="total_price"
        >{{ state.totalPriceCart }} грн</ui-text-h2
      >
    </div>
  </div>
</template>

<script setup>
import UiTextH2 from "~/components/Ui/UiTextH2.vue";
import UiTextH4 from "~/components/Ui/UiTextH4.vue";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import TheCartCard from "./TheCartCard.vue";

import { useCartData } from "~/stores/cartData";
import useScrollToTop from "~/utils/useScrollToTop";

const { scrollToTop } = useScrollToTop();
const { state } = useCartData();

function emptyTrash() {
  state.productsInСart = [];
  state.totalPriceCart = 0;
}
</script>

<style lang="scss" scoped>
.cart__item {
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  order: 1;

  button {
    h2 {
      transition: color 0.3s ease, font-weight 0.3s ease;
    }

    @media (hover: hover) {
      &:hover > h2 {
        font-weight: 700;
        color: rgb(144, 5, 5);
      }
    }
  }

  &_title {
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: #ede2e2 solid 1px;
  }

  &_total {
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f6f6f6;
  }

  &_messange {
    padding: 15px 20px;
  }
}

.total_price {
  font-weight: 700;
}

@media screen and (max-width: 1023px) {
  .cart__item {
    width: 100%;
    margin-top: 40px;
  }
}

@media screen and (max-width: 767px) {
  .cart__item {
    margin-top: 20px;

    &_messange {
      h2 {
        font-size: 14px;
      }
    }

    &_total {
      .total_price {
        font-size: 16px;
      }
    }
  }
}

@media screen and (max-width: 426px) {
  .cart__item {
    &_title {
      h2 {
        font-size: 12px;
      }
    }

    &_messange {
      h2 {
        font-size: 13px;
      }
    }

    &_total {
      h2 {
        font-size: 13px;
      }
    }
  }
}
</style>
