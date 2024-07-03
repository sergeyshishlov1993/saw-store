<template>
  <div>
    <ui-text-h-3 :class="addClass">
      <slot />
    </ui-text-h-3>

    <div :class="{ tab: props.name === props.selectedTab }" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import UiTextH3 from "~/components/Ui/UiTextH3.vue";

const props = defineProps({
  selectedTab: {
    type: String,
    requered: true,
  },
  name: {
    type: String,
    requered: true,
  },
});
const addClass = computed(() => {
  return props.name === props.selectedTab
    ? "black fw-400"
    : "grey pr-96 fw-400";
});
</script>

<style lang="scss" scoped>
div {
  position: relative;
  display: flex;
  flex-direction: column;
  h2 {
    white-space: nowrap;
  }
}
.pr-96 {
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.tab {
  width: 100%;
  position: absolute;
  bottom: -35px;
  border: 1px solid rgba(0, 0, 0, 1);
}
</style>
