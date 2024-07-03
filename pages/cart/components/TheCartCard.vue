<template>
  <div class="cart__item_wrapper">
    <img :src="props.path" :alt="props.title" />

    <div class="text">
      <div class="cart__item_wrapper_title">
        <ui-text-h6>{{ props.title }}</ui-text-h6>
        <ui-text-h6 class="price"> {{ total }} грн</ui-text-h6>

        <icon-close @click="removePropduct(props.id)" />
      </div>

      <div class="cart__item_wrapper_counter">
        <ui-text-h6>{{ counterProducts }} шт.</ui-text-h6>
        <the-counter
          :price="props.price"
          :count="props.count"
          @updateTotalPrice="calcTotalPrice"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UiTextH6 from "~/components/Ui/UiTextH6.vue";
import IconClose from "~/assets/icons/IconClose.vue";
import TheCounter from "./TheCounter.vue";
import { useCartData } from "~/stores/cartData";

const props = defineProps({
  id: {
    type: String,
  },

  path: {
    type: String,
  },

  title: {
    type: String,
  },

  price: {
    type: Number,
  },

  count: {
    type: String,
  },
});

const price = ref(Number(props.price));
const counterProducts = ref(props.count);
const total = ref(price.value);

const { calcTotal, removePropduct, updateValuePriceProducts } = useCartData();

const calcTotalPrice = async (value, count) => {
  total.value = value;
  counterProducts.value = count;

  updateValuePriceProducts(count, value, props.id);

  calcTotal();
};
</script>

<style lang="scss" scoped>
.cart__item_wrapper {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 100px;
  }

  &_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    .price {
      font-size: 12px;
      font-weight: 700;
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

.text {
  width: 100%;
}
</style>
