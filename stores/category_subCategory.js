import { defineStore } from "pinia";
import axios from "axios";
import { ref, watchEffect } from "vue";

const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;
const category = ref();
const subCategory = ref();
const breadcrumb = ref([{ path: "/", name: "Головна" }]);

export const useCategorySubCategory = defineStore("categorySubCategory", () => {
  async function fetchCategoriesAndSubCategories() {
    if (category.value && subCategory.value) return;
    try {
      const response = await axios.get(`${apiUrl}/products/category`);
      category.value = response.data.category;
      subCategory.value = response.data.subCategory;
    } catch (error) {
      console.error("Помилка:", error);
    }
  }

  function initializeRouteWatcher(route) {
    watchEffect(() => {
      const newPath = route.path;
      const existingIndex = breadcrumb.value.findIndex(
        (crumb) => crumb.path == newPath
      );
      if (existingIndex !== -1) {
        breadcrumb.value = [...breadcrumb.value.slice(0, existingIndex + 1)];
      }
    });
  }

  async function addCategoryToBreadcrumb(categoryId) {
    try {
      await fetchCategoriesAndSubCategories();
      const filteredCategory = category.value.find((el) => el.id == categoryId);

      if (filteredCategory) {
        const isCategoryInBreadcrumb = breadcrumb.value.some(
          (crumb) => crumb.path === `/products/${filteredCategory.id}`
        );

        if (!isCategoryInBreadcrumb) {
          breadcrumb.value.push({
            path: `/products/${filteredCategory.id}`,
            name: filteredCategory.category_name,
          });
        }
      }
    } catch (error) {
      console.error("Error adding category to breadcrumb:", error);
    }
  }

  async function addSubCategoryToBreadcrumb(subCategoryId) {
    try {
      await fetchCategoriesAndSubCategories();

      const filteredSubCategory = subCategory.value.find(
        (el) => el.sub_category_id == subCategoryId
      );

      if (filteredSubCategory) {
        const isSubCategoryInBreadcrumb = breadcrumb.value.some(
          (crumb) =>
            crumb.path ===
            `/products/${filteredSubCategory.parent_id}/${filteredSubCategory.sub_category_id}`
        );

        if (!isSubCategoryInBreadcrumb) {
          breadcrumb.value.push({
            path: `/products/${filteredSubCategory.parent_id}/${filteredSubCategory.sub_category_id}`,
            name: filteredSubCategory.sub_category_name,
          });
        }
      }
    } catch (error) {
      console.error("Error adding sub-category to breadcrumb:", error);
    }
  }

  function addProductToBreadcrumb(productId, subCategoryId, name) {
    const subCategoryIndex = breadcrumb.value.findIndex(
      (crumb) => crumb.path === `/products/${subCategoryId}`
    );

    if (subCategoryIndex !== -1) {
      breadcrumb.value.splice(subCategoryIndex + 1);
    }

    const isProductInBreadcrumb = breadcrumb.value.some(
      (crumb) => crumb.path === `/products/${subCategoryId}/${productId}`
    );

    if (!isProductInBreadcrumb) {
      breadcrumb.value.push({
        path: `/products/${subCategoryId}/${productId}`,
        name: name,
      });
    }
  }

  async function restoreBreadcrumbFromSubCategory(
    subCategoryId,
    productId,
    productName
  ) {
    try {
      await fetchCategoriesAndSubCategories();

      const subCat = subCategory.value.find(
        (el) => el.sub_category_id == subCategoryId
      );

      if (subCat) {
        await addCategoryToBreadcrumb(subCat.parent_id);
        await addSubCategoryToBreadcrumb(subCategoryId);
        addProductToBreadcrumb(productId, subCategoryId, productName);
      }
    } catch (error) {
      console.error("Error restoring breadcrumb from sub-category:", error);
    }
  }

  function removeBredcrumb(id) {
    if (id < breadcrumb.value.length) {
      breadcrumb.value.splice(id + 1, breadcrumb.value.length - (id + 1));
    }
  }

  function resetBreadcrumb() {
    breadcrumb.value = [{ path: "/", name: "Головна" }];
  }

  return {
    category,
    subCategory,
    breadcrumb,
    fetchCategoriesAndSubCategories,
    addCategoryToBreadcrumb,
    addSubCategoryToBreadcrumb,
    addProductToBreadcrumb,
    restoreBreadcrumbFromSubCategory,
    resetBreadcrumb,
    removeBredcrumb,
    initializeRouteWatcher,
  };
});
