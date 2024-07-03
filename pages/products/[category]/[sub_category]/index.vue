<template>
  <div class="container">
    <div class="wrapper">
      <div class="product__wrapper">
        <the-product-card
          v-for="card in products"
          :key="card.product_id"
          :path="card.pictures[0].pictures_name"
          :title="card.product_name"
          :price="card.price"
          @click="goToProduct(card.product_id)"
          @buy-product="addProductToCart(card, card.product_id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsByDubCategory } from "~/stores/productsBySubCategory";
import { useCartData } from "~/stores/cartData";
import TheProductCard from "~/components/Block/TheProductCard.vue";

import useScrollToTop from "~/utils/useScrollToTop";

const { scrollToTop } = useScrollToTop();

const route = useRoute();
const router = useRouter();

const category = route.params.category;
const sub_category = route.params.sub_category;
const { getProductsBySubCategory } = useProductsByDubCategory();
const { productsInСart, showModalWindow } = useCartData();

const products = ref();
onMounted(async () => {
  try {
    products.value = await getProductsBySubCategory(sub_category);
  } catch (error) {
    console.error("Ошибка:", error);
  }
});

async function goToProduct(productId) {
  router.push(`/products/${category}/${sub_category}/${productId}`);
}

const addProductToCart = (product, id) => {
  scrollToTop();
  let item = productsInСart.find((item) => item.product_id == id);

  if (item) {
    item.count += 1;
  } else {
    productsInСart.push({ ...product, count: 1 });
  }

  showModalWindow[0] = true;
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 150px 0 150px 0;
  position: relative;
}
.product__wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}
</style>
