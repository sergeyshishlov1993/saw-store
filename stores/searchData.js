import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export const useSearchData = defineStore("searchData", () => {
  const query = ref("");
  const products = ref([]);
  const showSearchCart = ref(false);
  const totalItems = ref(0);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const limit = ref(8);
  const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;
  const route = useRoute();

  const searchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/search`, {
        params: {
          search: query.value.toLowerCase(),
          page: currentPage.value,
          limit: limit.value,
        },
      });

      products.value = await response.data.products;
      totalItems.value = await response.data.totalItems;
      totalPages.value = await response.data.totalPages;

      if (route.name !== "search") {
        showSearchCart.value = true;
      }

      if (!query.value.length) {
        products.value = [];

        showSearchCart.value = false;
      }
    } catch (error) {
      console.error("сталась помилка");
    }
  };

  function closeSearchCart() {
    products.value = [];
    showSearchCart.value = false;
    query.value = "";
  }

  return {
    query,
    products,
    totalItems,
    currentPage,
    totalPages,
    showSearchCart,
    searchProducts,
    closeSearchCart,
  };
});
