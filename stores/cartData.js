import { defineStore } from "pinia";
import { reactive } from "vue";
import useScrollToTop from "~/utils/useScrollToTop";

export const useCartData = defineStore("cartData", () => {
  //обьект состояний
  const state = reactive({
    productsInСart: [],
    showModalWindow: false,
    totalPriceCart: 0,
  });

  const { scrollToTop } = useScrollToTop();

  //добавление товара в корзину
  const addProductToCart = (product, id) => {
    scrollToTop();
    let item = state.productsInСart.find((item) => item.product_id == id);

    if (item) {
      item.count += 1;
      item.itemTotalPrice += +item.sale_price ? +item.sale_price : +item.price;
    } else {
      state.productsInСart.push({
        ...product,
        count: 1,
        itemTotalPrice: +product.sale_price
          ? +product.sale_price
          : +product.price,
      });
    }

    state.showModalWindow = true;
  };

  // подсчет общей сумы к оплате

  function calcTotal() {
    state.totalPriceCart = 0;

    state.productsInСart.forEach((el) => {
      for (let i = 1; i <= el.count; i++) {
        state.totalPriceCart += +el.sale_price ? +el.sale_price : +el.price;
      }
    });
  }

  //удаление товара с корзины
  const removeProduct = (id) => {
    const index = state.productsInСart.findIndex((el) => el.product_id === id);
    if (index === -1) return; // Якщо товар не знайдено, просто вийти з функції

    state.productsInСart.splice(index, 1);
    if (state.productsInСart.length === 0) {
      state.showModalWindow = false;
    }
    calcTotal();
    removeBlockScroll();
  };

  // обновление цены в зависимости от количества
  function updateValuePriceProducts(count, id) {
    state.productsInСart.filter((el) => {
      if (el.product_id == id) {
        el.count = count;

        el.itemTotalPrice =
          (+el.sale_price !== 0 ? +el.sale_price : +el.price) * count;
      }
    });
  }

  //блок скрола
  const blockScroll = () => {
    document.body.style.overflow = state.showModalWindow ? "hidden" : "";
  };

  //удалить блок скрола
  const removeBlockScroll = () => {
    document.body.style.overflow = "";
  };

  //закрыть модальное окно
  const closeModal = () => {
    state.showModalWindow = false;
  };

  return {
    calcTotal,
    removeProduct,
    updateValuePriceProducts,
    blockScroll,
    addProductToCart,
    closeModal,
    state,
  };
});
