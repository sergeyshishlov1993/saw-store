import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useProductsByDubCategory = defineStore(
  "productsBySubCategory",
  () => {
    const products = ref([]);

    async function getProductsBySubCategory(sub_category_id) {
      const response = await axios.get(
        `http://localhost:8000/products/${sub_category_id}`
      );

      return (products.value = response.data.products);
    }

    return {
      products,
      getProductsBySubCategory,
    };
  }
);
