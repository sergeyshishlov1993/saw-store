import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

export const useCartData = defineStore("cartData", () => {
  const productsInСart = reactive([]);
  const showModalWindow = reactive([false]);
  const totalPriceCart = reactive([0]);

  function calcTotal() {
    totalPriceCart[0] = 0;

    productsInСart.forEach((el) => {
      totalPriceCart[0] += +el.price;
    });
  }

  const removePropduct = (id) => {
    let index = productsInСart.findIndex((el) => el.product_id === id);
    if (index !== -1) {
      productsInСart.splice(index, 1);
    }

    if (!productsInСart.length) {
      showModalWindow[0] = false;
    }

    calcTotal();
    removeBlockScroll();
  };

  function updateValuePriceProducts(count, total, id) {
    productsInСart.filter((el) => {
      if (el.product_id == id) {
        el.count = count;
        el.price = total;
      }
    });
  }

  const blockScroll = () => {
    if (showModalWindow[0]) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const removeBlockScroll = () => {
    document.body.style.overflow = "";
  };

  return {
    productsInСart,
    showModalWindow,
    totalPriceCart,
    calcTotal,
    removePropduct,
    updateValuePriceProducts,

    blockScroll,
  };
});
