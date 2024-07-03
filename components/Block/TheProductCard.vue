<template>
  <div class="product-card__wrapper">
    <img :src="props.path" :alt="props.title" />

    <ui-text-h5> {{ props.title }}</ui-text-h5>

    <div class="product-card__wrapper_price">
      <ui-text-h4 v-if="props.actionPrice" class="action"
        >{{ props.actionPrice }} грн</ui-text-h4
      >
      <ui-text-h4 :class="{ text: props.actionPrice }"
        >{{ props.price }} грн</ui-text-h4
      >
    </div>

    <ui-btn @click.stop="buyProduct">КУПИТИ</ui-btn>
  </div>
</template>

<script setup>
import UiTextH4 from "../Ui/UiTextH4.vue";
import UiTextH5 from "../Ui/UiTextH5.vue";
import UiBtn from "../Ui/UiBtn.vue";

const emit = defineEmits(["buyProduct"]);
const props = defineProps({
  actionPrice: {
    type: String,
  },

  path: {
    type: String,
    require: true,
  },

  title: {
    type: String,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },
});

const buyProduct = () => {
  emit("buyProduct");
};
</script>

<style lang="scss" scoped>
.product-card__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0px 2px 6px rgb(0 0 0 / 8%);

  button {
    display: none;
  }
  h2 {
    font-weight: 700;
  }
  &_price {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &:hover button {
    display: block;
  }
}

.action {
  color: darkred;
}

.text {
  text-decoration: line-through;
}
</style>
