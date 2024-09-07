<template>
  <div class="container">
    <div class="wrapper">
      <!-- обвертка основная  -->
      <div
        class="product__wrapper"
        v-for="product in productById"
        :key="product.product_id"
      >
        <!-- основной заголовок -->
        <ui-text-h1 class="title"> {{ product.product_name }}</ui-text-h1>

        <!-- подзаголовок с рейтингом и счетчиком отзывов -->
        <div class="sub_title">
          <the-star-counter :rate="rating" />

          <ui-text-h5 class="title_review"
            >Відгуків
            <span>({{ product.review.length }})</span>
          </ui-text-h5>
        </div>

        <!-- табы -->
        <div class="tabs">
          <the-tabs
            v-for="tab in tabs"
            :key="tab.name"
            @click="changeTab(tab.name)"
            :selectedTab="currentTab"
            :name="tab.name"
            >{{ tab.name }}</the-tabs
          >
        </div>

        <!-- контент табов -->
        <div class="wrapper__tabs">
          <div v-if="currentTab == 'Все про товар'">
            <!-- слайдер продукта -->
            <img-tabs
              :pictures="product.pictures"
              :price="product.price"
              @buy-product="addProductToCart"
            />
          </div>

          <the-reviews v-if="currentTab == 'Відгуки'" :id="id" />

          <admin-product-card-form
            :id="product.product_id"
            :productName="product.product_name"
            :productDescription="product.product_description"
            :price="product.price"
            :discount="product.discount"
            :available="product.available"
            :bestseller="product.bestseller"
            :sale="product.sale"
            :subCategory="product.sub_category_id"
            :pictures="product.pictures"
            v-if="currentTab == 'Змінити товар'"
          />

          <the-smal-card
            v-if="currentTab != 'Все про товар'"
            :title="product.product_name"
            :price="product.price"
            :path="product.pictures[0].pictures_name"
            :rate="rating"
            :countReview="product.review.length"
            @buy-product="addProductToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import axios from "axios";

import UiTextH1 from "~/components/Ui/UiTextH1.vue";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import TheTabs from "~/components/Block/TheTabs.vue";
import ImgTabs from "~/pages/products/[category]/[sub_category]/[id]/section/ImgTabs.vue";
import TheReviews from "~/pages/products/[category]/[sub_category]/[id]/section/TheReviews.vue";
import TheStarCounter from "~/components/Block/TheStarCounter.vue";
import TheSmalCard from "~/pages/products/[category]/[sub_category]/[id]/components/TheSmalCard.vue";
import AdminProductCardForm from "~/pages/admin/components/AdminProductCardForm.vue";
import useScrollToTop from "~/utils/useScrollToTop";
import { useCartData } from "~/stores/cartData";

const route = useRoute();
const { productsInСart, showModalWindow } = useCartData();
const { scrollToTop } = useScrollToTop();

const id = route.params.id;
const category = route.params.category;
const currentTab = ref("Все про товар");
const rating = ref(0);
const tabs = [
  { name: "Все про товар" },
  { name: "Змінити товар" },
  { name: "Відгуки" },
];
const productById = ref();
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;

function changeTab(name) {
  currentTab.value = name;
  scrollToTop();
}

onMounted(async () => {
  try {
    const response = await axios.get(`${apiUrl}/products/${category}/${id}`);
    productById.value = response.data.product;

    await calculateAverageRating();
  } catch (error) {
    console.error("Ошибка:", error);
  }
});

const calculateAverageRating = () => {
  productById.value.forEach((el) => {
    el.review.forEach((rate) => (rating.value += +rate.rating));

    return (rating.value = Math.floor(rating.value / el.review.length));
  });
};

const addProductToCart = () => {
  scrollToTop();
  let item = productsInСart.find((item) => item.product_id == id);

  if (item) {
    item.count += 1;
  } else {
    productsInСart.push({ ...productById.value[0], count: 1 });
  }

  showModalWindow[0] = true;
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 150px 0 150px 0;
  position: relative;

  &__tabs {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 50px;
  }
}

.tabs {
  position: relative;
  padding: 64px 0 34px 0;
  display: flex;
  align-items: center;
  gap: 120px;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
}

.product__wrapper {
  padding-top: 150px;

  .sub_title {
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    gap: 30px;

    h2 {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 400;
      font-size: 14px;

      span {
        font-weight: 500;
        font-size: 18px;
      }
    }
  }

  .title {
    font-weight: 700;
    font-size: 30px;
  }
}
</style>
