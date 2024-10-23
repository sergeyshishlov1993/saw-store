import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useProductsBySubCategory = defineStore(
  "productsBySubCategory",
  () => {
    const products = ref([]);
    const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

    async function getProductsBySubCategory(sub_category_id) {
      const response = await axios.get(`${apiUrl}/products/${sub_category_id}`);

      return (products.value = response.data.products);
    }

    return {
      products,
      getProductsBySubCategory,
    };
  }
);
