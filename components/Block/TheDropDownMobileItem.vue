<template>
  <div class="catalog">
    <h2 @click="changeState">
      <slot />
    </h2>

    <icon-chevron-up v-if="isOpen" @click="changeState" />
    <icon-chewron-down v-else @click="changeState" />
  </div>

  <div class="subCategory" v-if="showSubCategory">
    <ui-text-h6
      v-for="sub in props.subCategory"
      :key="sub.sub_category_id"
      @click="
        goToCatalog(sub.parent_id, sub.sub_category_id, sub.sub_category_name)
      "
    >
      {{ sub.sub_category_name }}
    </ui-text-h6>
  </div>
</template>

<script setup>
import { ref, useSlots } from "vue";
import { useRouter } from "vue-router";
import { useOtherData } from "~/stores/otherData";
import IconChevronUp from "~/assets/icons/IconChevronUp.vue";
import IconChewronDown from "~/assets/icons/IconChewronDown.vue";
import UiTextH6 from "../Ui/UiTextH6.vue";

const { visibilityStore } = useOtherData();
const slots = useSlots();
const emit = defineEmits(["state"]);
const props = defineProps({
  name: String,
  id: String,
  subCategory: Array,
});
const router = useRouter();

const isOpen = ref(false);
const showSubCategory = ref(false);

function changeState() {
  isOpen.value = !isOpen.value;
  showSubCategory.value = !showSubCategory.value;

  emit("state", isOpen.value, props.name, props.id);
}

const goToCatalog = (parentId, id, name) => {
  router.push(
    `/products/${parentId}/${id}?category=${
      slots.default()[0].children
    }&category_path=/products/${parentId}&sub_category=${name}&sub_category_path=/products/${parentId}/${id}`
  );
  visibilityStore.showMobileMenu = false;
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
};
</script>

<style lang="scss" scoped>
.catalog {
  padding: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 13px;
    font-weight: 500;
  }

  svg {
    width: 25px;
    filter: brightness(0.5);
  }
}

.subCategory {
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  h2 {
    cursor: pointer;
  }
}
</style>
