<template>
  <div class="wrapper">
    <mobile-category-item name="catalog" @state="changeState">
      Каталог товарів
    </mobile-category-item>

    <div v-if="showCategory">
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
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import MobileCategoryItem from "./MobileCategoryItem.vue";

const showCategory = ref(false);
const showSubCategory = ref(false);

const category = ref();
const subCategory = ref();
const filterSubCategory = ref();
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;

function changeState(state, name, id) {
  switch (name) {
    case "catalog":
      showCategory.value = state;

      break;

    case "category":
      showSubCategory.value = state;

      filterCategory(id);

      break;
  }
}

onBeforeMount(async () => {
  try {
    const response = await axios.get(`${apiUrl}/products/category`);

    category.value = await response.data.category;
    subCategory.value = await response.data.subCategory;
  } catch (error) {
    console.error("Ошибка:", error);
  }
});

const filterCategory = (id) => {
  filterSubCategory.value = subCategory.value.filter(
    (el) => el.parent_id == id
  );
};
</script>

<style lang="scss" scoped></style>
