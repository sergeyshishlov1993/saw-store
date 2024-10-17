<template>
  <div class="wrapper">
    <mobile-category-item name="catalog" @state="changeState">
      Каталог товарів
    </mobile-category-item>

    <div class="wrapper__items" v-if="showCategory">
      <mobile-category-item
        name="category"
        :id="category.id"
        :subCategory="filterSubCategory"
        @state="changeState"
        v-for="category in category"
        :key="category.id"
      >
        {{ category.category_name }}
      </mobile-category-item>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import MobileCategoryItem from "./MobileCategoryItem.vue";
import { useCategorySubCategory } from "~/stores/category_subCategory";
const showCategory = ref(false);
const showSubCategory = ref(false);
const filterSubCategory = ref();
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;
const {
  fetchCategoriesAndSubCategories,
  resetBreadcrumb,
  category,
  subCategory,
} = useCategorySubCategory();

function changeState(state, name, id) {
  switch (name) {
    case "catalog":
      resetBreadcrumb();
      showCategory.value = state;

      break;

    case "category":
      showSubCategory.value = state;

      filterCategory(id);

      break;
  }
}

const filterCategory = (id) => {
  filterSubCategory.value = subCategory.filter((el) => el.parent_id == id);
};
</script>

<style lang="scss" scoped>
.wrapper__items {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
