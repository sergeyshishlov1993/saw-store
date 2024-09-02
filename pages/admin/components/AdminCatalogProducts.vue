<template>
  <div class="wrapper__catalog">
    <div class="catalog_menu">
      <div class="catalog_menu_name">
        <div
          class="category__wrapper"
          v-for="category in category"
          :key="category.id"
          @click="showSubCategory(category.id)"
        >
          <ui-text-h6>{{ category.category_name }}</ui-text-h6>
        </div>
      </div>
    </div>

    <div class="catalog_sub_menu">
      <sub-menu-card
        v-for="sub in filterSubCategory"
        :key="sub.sub_category_id"
        :src="sub.pictures"
        :name="sub.sub_category_name"
        :id="sub.sub_category_id"
        :parentId="sub.parent_id"
        @goToCatalog="goToProduct(sub.parent_id, sub.sub_category_id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useProductsByDubCategory } from "~/stores/productsBySubCategory";
import axios from "axios";
import UiTextH6 from "~/components/Ui/UiTextH6.vue";
import SubMenuCard from "~/components/Block/SubMenuCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const category = ref();
const subCategory = ref();
const filterSubCategory = ref();
const apiUrl = process.env.VITE_API_URL;

onBeforeMount(async () => {
  try {
    const response = await axios.get(`${apiUrl}/products/category`);

    category.value = await response.data.category;
    subCategory.value = await response.data.subCategory;

    showSubCategory(2);
  } catch (error) {
    console.error("Ошибка:", error);
  }
});

const showSubCategory = (id) => {
  return (filterSubCategory.value = subCategory.value.filter(
    (el) => el.parent_id == id
  ));
};

const goToProduct = (parentId, id) => {
  router.push(`/admin/${parentId}/${id}`);
};
</script>

<style lang="scss" scoped>
.wrapper__catalog {
  display: flex;
  border-right: 1px solid rgba(144, 5, 5, 1);
}

.catalog_menu {
  padding: 10px 20px 20px 0;
  display: flex;

  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid rgba(144, 5, 5, 1);
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

      &:hover {
        background: rgba(144, 5, 5, 1);
        color: #fff;
      }
    }

    h2 {
      padding: 6px;
      font-weight: 700;
      margin: 0;
    }
  }
}

.catalog_sub_menu {
  padding: 20px 20px;
  width: 100%;
  height: 800px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 180px);

  background-color: #fff;
}
</style>
