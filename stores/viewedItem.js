import { defineStore } from "pinia";
import { ref } from "vue";

export const useviewedItems = defineStore("viewedItems", () => {
  const viewedItems = ref([]);

  function addviewedItems(item) {
    const exists = viewedItems.value.some(
      (viewedItem) => viewedItem.product_id === item.product_id
    );

    if (!exists) {
      viewedItems.value.push({ ...item });
    }
  }

  return { viewedItems, addviewedItems };
});
