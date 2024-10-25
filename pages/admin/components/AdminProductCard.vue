<template>
  <div class="product">
    <div class="product-card__wrapper">
      <img :src="props.path" :alt="props.title" />

      <ui-text-h5> {{ props.title }}</ui-text-h5>

      <div class="product-card__wrapper_price">
        <ui-text-h4 v-if="props.actionPrice" class="action"
          >{{ props.actionPrice }} ₴</ui-text-h4
        >
        <ui-text-h4 :class="{ text: props.actionPrice }"
          >{{ props.price }} ₴</ui-text-h4
        >
      </div>

      <div class="product-card__wrapper_btn">
        <ui-btn @click.stop="removeProduct">Видалити</ui-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import UiTextH4 from "~/components/Ui/UiTextH4.vue";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";

const emit = defineEmits(["removeProduct"]);
const props = defineProps({
  id: {
    type: String,
  },

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

function removeProduct() {
  emit("removeProduct", props.id);
}
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

  h2 {
    font-weight: 700;
  }
  &_price {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &_btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

.action {
  color: darkred;
}

.text {
  text-decoration: line-through;
}
</style>
