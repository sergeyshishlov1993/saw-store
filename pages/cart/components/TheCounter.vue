<template>
  <div class="counter">
    <button @click="decrementCounterValue" :disabled="counterValue <= 1">
      <h2 class="selector">-</h2>
    </button>

    <div class="value">
      <h2>{{ counterValue }}</h2>
    </div>

    <button @click="incrementCounterValue">
      <h2 class="selector">+</h2>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["updateTotalPrice"]);

const props = defineProps({
  count: {
    type: Number,
  },
});
const counterValue = ref(props.count);

const decrementCounterValue = () => {
  if (counterValue.value > 1) {
    counterValue.value--;

    emit("updateTotalPrice", counterValue.value);
  }
};

const incrementCounterValue = () => {
  counterValue.value++;

  emit("updateTotalPrice", counterValue.value);
};
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 12px;
}

.value {
  width: 50px;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.selector {
  padding: 10px;
  font-weight: 500;
  font-size: 25px;
  cursor: pointer;
}
</style>
