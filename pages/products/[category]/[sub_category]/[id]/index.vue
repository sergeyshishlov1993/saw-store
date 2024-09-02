<template>
  <div class="container">
    <div class="wrapper">
      <breadcrumbs :breadcrumbs="validBreadcrumbs" />

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
              :isSale="product.sale"
              :sale="product.sale_price"
              @buy-product="addProductToCart(product, product.product_id)"
            />

            <!-- таблица параметров -->
            <div>
              <the-params-product
                :parametr="product.param.slice(0, 5)"
                @moreParam="changeTab"
              />

              <the-review-product
                :reviews="product.review.slice(0, 2)"
                :id="id"
                @moreReviews="changeTab"
              />
            </div>
          </div>

          <the-params-product
            :parametr="product.param"
            v-if="currentTab == 'Властивості'"
            :tab="currentTab"
          />

          <the-review-product
            v-if="currentTab == 'Відгуки'"
            :id="id"
            :currentTab="currentTab"
          />

          <the-smal-card
            v-if="currentTab != 'Все про товар'"
            :title="product.product_name"
            :price="product.price"
            :path="product.pictures[0].pictures_name"
            :rate="rating"
            :countReview="product.review.length"
            @buy-product="addProductToCart(product, product.product_id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartData } from "~/stores/cartData";
import axios from "axios";

import UiTextH1 from "~/components/Ui/UiTextH1.vue";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import TheTabs from "~/components/Block/TheTabs.vue";
import ImgTabs from "./section/ImgTabs.vue";
import TheParamsProduct from "./section/TheParamsProduct.vue";
import TheReviewProduct from "./section/TheReviewProduct.vue";
import TheStarCounter from "./components/TheStarCounter.vue";
import TheSmalCard from "./components/TheSmalCard.vue";
import useScrollToTop from "~/utils/useScrollToTop";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";

const route = useRoute();
const { addProductToCart } = useCartData();
const { scrollToTop } = useScrollToTop();
const apiUrl = process.env.VITE_API_URL || process.env.VITE_API_URL; 
const id = route.params.id;
const category = route.params.category;
const currentTab = ref("Все про товар");
const rating = ref(0);
const tabs = [
  { name: "Все про товар" },
  { name: "Властивості" },
  { name: "Відгуки" },
];
const productById = ref();

const breadcrumb = ref([
  { name: "Головна", path: "/" },

  {
    name: route.query.category,
    path: `${route.query.category_path}?category=${route.query.category}`,
  },

  {
    name: route.query.sub_category,
    path: `${route.query.sub_category_path}?category=${route.query.category}&category_path=${route.query.category_path}&sub_category=${route.query.sub_category}`,
  },

  {
    name: route.query.product,
    path: `${route.query.sub_category_path}?sub_category=${route.query.sub_category}`,
  },
]);

const validBreadcrumbs = breadcrumb.value.filter((el) => el.name);

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

definePageMeta({
  breadcrumb: [{ name: "Головна", path: "/" }],
});

const calculateAverageRating = () => {
  productById.value.forEach((el) => {
    el.review.forEach((rate) => (rating.value += +rate.rating));

    return (rating.value = Math.floor(rating.value / el.review.length));
  });
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
  padding-top: 100px;

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

@media screen and (max-width: 1024px) {
  .tabs {
    gap: 80px;
    flex-wrap: wrap;
  }

  .product__wrapper {
    padding-top: 50px;

    .title {
      font-size: 20px;
    }
  }
}

@media screen and (max-width: 991px) {
  .wrapper {
    padding: 100px 0;

    &__tabs {
      align-items: center;
      justify-content: center;
    }

    .tabs {
      gap: 50px;
    }
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    padding: 50px 0;
  }

  .product__wrapper {
    .title {
      font-size: 15px;
    }

    .sub_title {
      h2 {
        font-size: 13px;

        span {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
