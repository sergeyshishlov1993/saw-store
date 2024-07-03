<template>
  <div class="counter">
    <icon-star
      v-for="(n, index) in starsCount"
      :key="index"
      :class="{ grade: index + 1 <= props.rate }"
      @click="handleClick(index + 1)"
    />
  </div>
</template>

<script setup>
import IconStar from "~/assets/icons/IconStar.vue";

const emit = defineEmits(["change"]);
const props = defineProps({
  starsCount: {
    type: Number,
    default: 5,
  },
  rate: {
    type: Number,
    default: 0,
  },
});

const handleClick = (rate) => {
  emit("changeStar", rate);
};
</script>

<style lang="scss" scoped>
.grade {
  fill: black;
}
.counter {
  display: flex;
  gap: 5px;
}
</style>
