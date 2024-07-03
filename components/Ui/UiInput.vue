import type { mergeProps } from 'vue'; import type { mergeProps } from 'vue';
<template>
  <input
    :placeholder="props.placeholder"
    :name="props.name"
    :value="props.value"
    autocomplete="off"
  />
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
input {
  padding: 13px 22px 13px 10px;
  background: rgba(248, 248, 248, 1);
  border: 1px solid rgba(248, 248, 248, 1);
  border-radius: 20px;

  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
}
</style>
