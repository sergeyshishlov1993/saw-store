<template>
  <div class="product-in-cart">
    <img :src="props.path" :alt="props.title" />

    <div class="product-in-cart_wrapper">
      <div class="product-in-cart_wrapper-title">
        <div>
          <ui-text-h6 class="title">{{ props.title }}</ui-text-h6>

          <ui-text-h6
            style="text-decoration: none; margin-top: 4px"
            :class="{
              'product-in-cart_wrapper_price_discount': +props.salePrice !== 0,
            }"
          >
            {{ Math.round(priceOfOneProduct).toLocaleString("uk-UA") }}
            грн</ui-text-h6
          >
        </div>

        <div class="product-in-cart_wrapper_price">
          <ui-text-h6
            class="price"
            :class="{
              'product-in-cart_wrapper_price_old-price': +props.salePrice !== 0,
            }"
          >
            {{ Math.round(productQuantityPrice).toLocaleString("uk-UA") }}
            грн</ui-text-h6
          >

          <ui-text-h6
            class="product-in-cart_wrapper_price_discount"
            v-if="+props.salePrice !== 0"
          >
            {{ Math.round(discountQuantityPrice).toLocaleString("uk-UA") }}
            грн</ui-text-h6
          >
        </div>

        <icon-close @click="removeProduct(props.id)" />
      </div>

      <div class="product-in-cart_wrapper_counter">
        <ui-text-h6>{{ counterProducts }} шт.</ui-text-h6>

        <the-counter :count="props.count" @updateTotalPrice="calcTotalPrice" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import UiTextH6 from "~/components/Ui/UiTextH6.vue";
import IconClose from "~/assets/icons/IconClose.vue";
import TheCounter from "./TheCounter.vue";
import { useCartData } from "~/stores/cartData";

const {
  calcTotal,
  removeProduct,
  updateValuePriceProducts,
  calcTotalDiscount,
} = useCartData();
const props = defineProps({
  id: String,
  path: String,
  title: String,
  price: String,
  itemTotalPrice: Number,
  salePrice: String,
  count: Number,
});

const counterProducts = ref(props.count);

const priceOfOneProduct = computed(() => {
  return !+props.salePrice ? props.price : +props.salePrice || 0;
});

const productQuantityPrice = computed(() => {
  return !+props.salePrice
    ? Math.round(props.itemTotalPrice)
    : Math.round(props.price) || 0;
});

const discountQuantityPrice = computed(() => {
  return +props.salePrice !== 0 ? props.itemTotalPrice : +props.salePrice || 0;
});

const calcTotalPrice = async (count) => {
  counterProducts.value = count;

  updateValuePriceProducts(count, props.id);

  calcTotal();
  calcTotalDiscount();
};
</script>

<style lang="scss" scoped>
.product-in-cart {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 100px;
  }

  &_wrapper {
    width: 100%;

    &-title {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }

    &_price {
      font-size: 12px;
      font-weight: 700;

      &_old-price {
        text-decoration: line-through;
      }

      &_discount {
        color: darkred;
      }
    }

    &_counter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
    }

    svg {
      width: 25px;
    }
  }
}

.title {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 426px) {
  .product-in-cart {
    padding: 5px;
    gap: 5px;
  }

  .title {
    width: 80px;
  }
}
</style>
