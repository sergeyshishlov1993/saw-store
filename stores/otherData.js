import { defineStore } from "pinia";
import { ref } from "vue";

export const useOtherData = defineStore("otherData", () => {
  const showCatalogNav = ref(false);

  return {
    showCatalogNav,
  };
});
