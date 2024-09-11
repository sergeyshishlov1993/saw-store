<template>
  <div class="select" :class="{ open: isOpenSelect }" @click="toggleOpen">
    <div class="select__wrapper">
      <ui-text-h6 class="select__wrapper_value">{{ selectedValue }}</ui-text-h6>

      <icon-chevron-up v-if="isOpenSelect" @click.stop="isOpenSelect = false" />
      <icon-chevron-down v-else @click.stop="isOpenSelect = true" />
    </div>

    <div class="option" v-if="isOpenSelect">
      <ui-text-h6 v-if="props.selectCategory" @click="selectValue('', '')">{{
        title
      }}</ui-text-h6>
      <ui-text-h6
        v-for="option in sortCategory"
        :key="option.sub_category_id"
        @click.stop="
          selectValue(option.sub_category_name, option.sub_category_id)
        "
      >
        {{ option.sub_category_name }}
      </ui-text-h6>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import UiTextH6 from "../Ui/UiTextH6.vue";
import IconChevronUp from "~/assets/icons/IconChevronUp.vue";
import IconChevronDown from "~/assets/icons/IconChewronDown.vue";

const emit = defineEmits(["update-select"]);
const props = defineProps({
  category: Array,
  selectCategory: String,
});

const sortCategory = computed(() => {
  return props.category.slice().sort((a, b) => {
    return a.sub_category_name.localeCompare(b.sub_category_name);
  });
});

const isOpenSelect = ref(false);
const title = "Під Категорія:";

const toggleOpen = () => {
  isOpenSelect.value = !isOpenSelect.value;
};

const selectValue = (name, id) => {
  isOpenSelect.value = false;
  emit("update-select", name, id);
};

const selectedValue = computed(() => {
  return props.selectCategory || title;
});
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  padding: 10px;
  height: 40px;
  overflow: hidden;
  border-radius: 20px;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      filter: invert(1);
      height: 25px;
      width: 25px;
    }

    &_value {
      font-weight: 700;
    }
  }

  &.open {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    overflow-y: auto;
    height: 300px;

    z-index: 100;

    svg {
      filter: none;
    }
  }
}

.option {
  padding: 7px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  cursor: pointer;
}
</style>
