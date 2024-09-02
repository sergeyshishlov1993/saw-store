<template>
  <div class="wrapper_smal_card">
    <div class="smal__product">
      <img :src="props.path" :alt="props.title" />
      <div class="smal__product_text">
        <ui-text-h5> {{ props.title }}</ui-text-h5>

        <the-star-counter :rate="props.rate" />

        <ui-text-h5 class="review_count">
          <span>({{ props.countReview }})</span>
          Відгуків</ui-text-h5
        >

        <ui-text-h5 class="price">{{ props.price }} грн</ui-text-h5>
      </div>

      <ui-btn @click="handlerClick">Купити</ui-btn>
    </div>
  </div>
</template>

<script setup>
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import TheStarCounter from "../components/TheStarCounter.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";

const emit = defineEmits("buyProduct");
const props = defineProps({
  path: {
    type: String,
  },

  title: {
    type: String,
  },

  price: {
    type: String,
  },

  rate: {
    type: String,
  },

  countReview: {
    type: String,
  },
});

const handlerClick = () => {
  emit("buyProduct");
};
</script>

<style lang="scss" scoped>
.wrapper_smal_card {
  padding-top: 150px;
  width: 25%;
}
.smal__product {
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgb(120 144 156 / 8%), 0px 2px 5px rgb(48 48 48 / 5%);
  border-radius: 2px;

  &_text {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .review_count {
    font-weight: 500;

    span {
      font-weight: 700;
      font-size: 16px;
    }
  }

  img {
    max-width: 75%;
  }
}

.price {
  font-size: 18px;
  font-weight: 500;
}

@media screen and (max-width: 991px) {
  .wrapper_smal_card {
    display: none;
  }
}
</style>
