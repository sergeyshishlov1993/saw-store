<template>
  <div class="container">
    <div class="wrapper">
      <div class="category_menu">
        <div class="category_menu_name">
          <div
            class="category__wrapper"
            v-for="category in category"
            :key="category.id"
            @click.stop="showSubCategory(category.id, category.category_name)"
          >
            <ui-text-h6>{{ category.category_name }}</ui-text-h6>
          </div>
        </div>
      </div>

      <div class="category_sub_menu">
        <sub-category
          v-for="sub in filterSubCategory"
          :key="sub.sub_category_id"
          :src="sub.pictures"
          :name="sub.sub_category_name"
          :id="sub.sub_category_id"
          :parentId="sub.parent_id"
          @click.stop="
            getProductsBySubCategory(sub.parent_id, sub.sub_category_id)
          "
          @goToCatalog="
            goToCatalog(
              sub.parent_id,
              sub.sub_category_id,
              sub.sub_category_name
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useProductsByDubCategory } from "~/stores/productsBySubCategory";
import { useCategorySubCategory } from "~/stores/category_subCategory";
import { useRouter } from "vue-router";
import axios from "axios";
import UiTextH6 from "../Ui/UiTextH6.vue";
import SubCategory from "./SubCategory.vue";

const router = useRouter();
const {
  category,
  subCategory,
  fetchCategoriesAndSubCategories,
  resetBreadcrumb,
} = useCategorySubCategory();
const categoryName = ref();
const filterSubCategory = ref();
const { getProductsBySubCategory } = useProductsByDubCategory();
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;

onBeforeMount(async () => {
  showSubCategory(73);
});

const showSubCategory = (id, name) => {
  categoryName.value = name || "Електроінструмент";

  filterSubCategory.value = subCategory.filter((el) => el.parent_id == id);
};

const goToCatalog = (parentId, id, name) => {
  resetBreadcrumb();
  router.push(`/products/${parentId}/${id}`);
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  border-right: 1px solid rgba(144, 5, 5, 1);
}

.category_menu {
  padding: 10px 20px 20px 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid rgba(144, 5, 5, 1);
  max-height: 650px;
  overflow-y: auto;

  &_name {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 5px;

    .category__wrapper {
      padding: 5px;
      border-radius: 20px;
      transition: color 0.4s ease, background 0.1s ease;

      cursor: pointer;

      @media (hover: hover) {
        &:hover {
          background: rgba(144, 5, 5, 1);
          color: #fff;
        }
      }
    }

    h2 {
      padding: 6px;
      font-weight: 700;
      margin: 0;
    }
  }
}

.category_sub_menu {
  padding: 20px 20px;
  width: 100%;
  max-height: 650px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 170px);
  background-color: #fff;
  gap: 5px;

  overflow-y: auto;
}

@media screen and (max-width: 991px) {
  .category_sub_menu {
    padding: 30px;
  }
}
</style>
