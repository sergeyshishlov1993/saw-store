<template>
  <div class="catalog" @click="changeState">
    <h2>
      <slot />
    </h2>

    <icon-chevron-up v-if="isOpen" />
    <icon-chewron-down v-else />
  </div>

  <div class="subCategory" v-if="showSubCategory">
    <ui-text-h4
      v-for="sub in props.subCategory"
      :key="sub.sub_category_id"
      @click="
        goToCatalog(sub.parent_id, sub.sub_category_id, sub.sub_category_name)
      "
    >
      {{ sub.sub_category_name }}
    </ui-text-h4>
  </div>
</template>

<script setup>
import { ref, useSlots } from "vue";
import { useRouter } from "vue-router";
import { useOtherData } from "~/stores/otherData";
import IconChevronUp from "~/assets/icons/IconChevronUp.vue";
import IconChewronDown from "~/assets/icons/IconChewronDown.vue";
import UiTextH4 from "../Ui/UiTextH4.vue";

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
  router.push(`/products/${parentId}/${id}`);
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
    font-weight: 600;
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
  gap: 10px;

  h2 {
    padding-top: 5px;
    padding-bottom: 10px;
    cursor: pointer;
  }
}
</style>
