<template>
  <div class="card">
    <component :is="cardIcon" />
    <div class="text">
      <ui-text-h3 class="title">{{ props.title }}</ui-text-h3>
      <ui-text-h4>{{ props.text }}</ui-text-h4>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import iconNewPost from "~/assets/icons/iconNewPost.vue";
import IconCourier from "~/assets/icons/IconCourier.vue";
import IconMoney from "~/assets/icons/iconMoney.vue";
import UiTextH3 from "~/components/Ui/UiTextH3.vue";
import UiTextH4 from "~/components/Ui/UiTextH4.vue";

const props = defineProps({
  title: {
    type: String,
  },

  text: {
    type: String,
  },
});

const cardIcon = computed(() => {
  switch (props.title) {
    case "У відділення":
      return iconNewPost;

    case "Кур'єром":
      return IconCourier;

    case "Готівковий розрахунок":
      return IconMoney;
  }
});
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  border-radius: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  svg {
    width: 40px;
  }
}

.title {
  font-weight: 700;
}
</style>
