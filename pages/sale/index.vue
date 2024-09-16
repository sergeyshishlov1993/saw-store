<template>
  <div class="container">
    <div class="action">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <ui-loader v-if="showLoader" />
      <div class="action__wrapper" v-else>
        <the-product-card
          v-for="product in discontProduct"
          :key="product.product_id"
          :path="product.pictures[product.pictures.length - 1].pictures_name"
          :title="product.product_name"
          :price="product.price"
          :promotionalPrice="product.sale_price"
          :discount="product.discount"
          @buy-product="addProductToCart(product, product.product_id)"
          @click="
            goToProducts(
              product.sub_category_id,
              product.product_id,
              product.product_name
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCartData } from "~/stores/cartData";
import useScrollToTop from "~/utils/useScrollToTop";
import axios from "axios";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";
import TheProductCard from "~/components/Block/TheProductCard.vue";
import UiLoader from "~/components/Ui/UiLoader.vue";

const { state } = useCartData();
const { scrollToTop } = useScrollToTop();
const router = useRouter();
const route = useRoute();
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;
const showLoader = ref(false);
const discontProduct = ref([]);
const breadcrumb = ref([
  { name: "Головна", path: "/" },

  {
    name: route.query.category,
    path: `/sale?category=${route.query.category}`,
  },
]);

onMounted(async () => {
  await getPromotionalItem();
});

async function getPromotionalItem() {
  showLoader.value = true;
  try {
    const response = await axios.get(`${apiUrl}/sale`);

    discontProduct.value = response.data.sale;

    showLoader.value = false;
  } catch (error) {
    console.error("сталась помилка:", error);
    showLoader.value = false;
  }
}

const addProductToCart = (product, id) => {
  scrollToTop();
  let item = state.productsInСart.find((item) => item.product_id == id);

  if (item) {
    item.count += 1;
  } else {
    state.productsInСart.push({ ...product, count: 1 });
  }

  state.showModalWindow = true;
};

const goToProducts = (category, id, name) => {
  router.push(
    `/products/sale/${category}/${id}?category=Акція&category_path=/sale&product=${name}`
  );
};

useHead({
  title:
    "Акції - SAW STORE - Спеціальні пропозиції на професійний електроінструмент - Знижки та вигідні умови на найкращий інструмент",
  meta: [
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "description",
      content:
        "Не пропустіть акції від SAW STORE! Спеціальні пропозиції, знижки та вигідні умови на професійний електроінструмент. Обирайте якість за найкращою ціною.",
    },
    {
      name: "keywords",
      content:
        "SAW STORE, акції, знижки, професійний електроінструмент, спеціальні пропозиції, вигідні умови, купити інструмент зі знижкою",
    },
  ],
});
</script>

<style lang="scss" scoped>
.action {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 86px;

  h2 {
    color: darkred;
    font-weight: 700;
  }
  &__wrapper {
    margin-top: 30px;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
  }

  button {
    margin: 0 auto;
    width: 450px;
    height: 100px;

    font-size: 20px;
    font-weight: 700;
    border-radius: 20px;
    box-shadow: 0px 2px 6px rgb(0 0 0 / 8%);

    @media (hover: hover) {
      &:hover {
        box-shadow: -1px 2px 20px -6px rgba(0, 0, 0, 0.75);
        background: darkred;
        color: white;
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  .action {
    padding-top: 50px;

    &__wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (max-width: 992px) {
  .action__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .action__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .action {
    margin-top: 40px;
  }
}
</style>
