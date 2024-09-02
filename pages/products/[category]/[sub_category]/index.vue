<template>
  <div class="container">
    <div class="wrapper">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <div class="product__wrapper">
        <the-product-card
          v-for="card in products"
          :key="card.product_id"
          :path="card.pictures[0].pictures_name"
          :title="card.product_name"
          :price="card.price"
          @click="goToProduct(card.product_id, card.product_name)"
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
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";

const route = useRoute();
const router = useRouter();
const category = route.params.category;
const sub_category = route.params.sub_category;
const { getProductsBySubCategory } = useProductsByDubCategory();
const { productsInСart, showModalWindow, addProductToCart } = useCartData();

console.log("route sub category", route);

const breadcrumb = ref([
  { name: "Головна", path: "/" },

  {
    name: route.query.category,
    path: `${route.query.category_path}?category=${route.query.category}`,
  },

  {
    name: route.query.sub_category,
    path: `${route.path}?category=${route.query.category}&category_path=${route.query.category_path}&sub_category=${route.query.sub_category}`,
  },
]);

const products = ref();
onMounted(async () => {
  try {
    products.value = await getProductsBySubCategory(sub_category);
  } catch (error) {
    console.error("Ошибка:", error);
  }
});

async function goToProduct(productId, name) {
  router.push(
    `/products/${category}/${sub_category}/${productId}?category=${route.query.category}&category_path=${route.query.category_path}&sub_category=${route.query.sub_category}&sub_category_path=${route.path}&product=${name}`
  );
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 150px 0 150px 0;
  position: relative;
}
.product__wrapper {
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

@media screen and (max-width: 1199px) {
  .product__wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 991px) {
  .wrapper {
    padding: 100px 0;
  }
  .product__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .product__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
