import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useRecommendedProduct = defineStore("recommendedProduct", () => {
  const recommendedProduct = ref([]);

  async function getProductBySubCategory(subCategory) {}

  return { recommendedProduct, getProductBySubCategory };
});
