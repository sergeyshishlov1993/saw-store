<template>
  <div class="container">
    <div class="search">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <ui-text-h2>
        Результат пошуку
        <span>{{ search.totalItems }}</span>
        товарів</ui-text-h2
      >
      <ui-loader v-if="showLoader" />

      <div class="search__wrapper" v-else>
        <the-product-card
          v-for="product in search.products"
          :key="product.product_id"
          :path="product.pictures[product.pictures.length - 1].pictures_name"
          :title="product.product_name"
          :price="product.price"
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

      <div
        class="wrapper__pagination"
        v-if="search.totalPages > 1 && search.query"
      >
        <button @click="prevPage" :disabled="search.currentPage === 1">
          <icon-chevron-left />
        </button>

        <the-pagination
          :total="search.totalPages"
          :current="search.currentPage"
          @changePage="changePage"
        />

        <button
          @click="nextPage"
          :disabled="search.currentPage === search.totalPages"
        >
          <icon-chevron-next />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCartData } from "~/stores/cartData";
import { useSearchData } from "~/stores/searchData";
import useScrollToTop from "~/utils/useScrollToTop";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";
import TheProductCard from "~/components/Block/TheProductCard.vue";
import UiLoader from "~/components/Ui/UiLoader.vue";

import ThePagination from "~/components/Block/ThePagination.vue";
import IconChevronLeft from "~/assets/icons/IconChevronLeft.vue";
import IconChevronNext from "~/assets/icons/IconChevronNext.vue";
import UiTextH2 from "~/components/Ui/UiTextH2.vue";

const { state } = useCartData();
const { scrollToTop } = useScrollToTop();
const search = useSearchData();
const router = useRouter();
const route = useRoute();
const showLoader = ref(false);
const breadcrumb = ref([
  { name: "Головна", path: "/" },

  {
    name: route.query.category,
    path: `/search?category=${route.query.category}`,
  },
]);

onMounted(async () => {
  search.showSearchCart = false;
});

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

async function changePage(page) {
  search.currentPage = page;
  scrollToTop();

  await search.searchProducts();
}

async function nextPage() {
  search.currentPage++;

  scrollToTop();
}

async function prevPage() {
  search.currentPage--;
  scrollToTop();
}

const goToProducts = (category, id, name) => {
  router.push(
    `/products/search/${category}/${id}?category=Пошук&category_path=/search&product=${name}`
  );
};

useHead({
  title:
    "Пошук - SAW STORE - Спеціальні пропозиції на професійний електроінструмент - Знижки та вигідні умови на найкращий інструмент",
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
.search {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 86px;

  h2 {
    font-weight: 700;
  }

  &__wrapper {
    margin-top: 30px;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
  }
}

.wrapper__pagination {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

@media screen and (max-width: 1199px) {
  .search {
    padding-top: 50px;

    &__wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (max-width: 992px) {
  .search__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .search__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .search {
    margin-top: 40px;
  }
}
</style>
