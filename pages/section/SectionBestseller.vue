<template>
  <div class="bestseller">
    <div class="title__wrapper">
      <ui-text-h1>ХІТ продажів</ui-text-h1>

      <div class="chevron__wrapper">
        <button @click="goBackward" :disabled="currentIndex == 0">
          <icon-chevron-left />
        </button>

        <button
          @click="goForward"
          :disabled="bestsellerProduct.length - currentIndex < 5"
        >
          <icon-chevron-next />
        </button>
      </div>
    </div>

    <div class="bestseller__wrapper" :style="calcWidthWrapper">
      <the-product-card
        v-for="product in bestsellerProduct"
        :key="product.product_id"
        :path="product.pictures[0].pictures_name"
        :title="product.product_name"
        :price="product.price"
        :bestseller="product.bestseller"
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
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import UiTextH1 from "../../components/Ui/UiTextH1.vue";
import IconChevronNext from "../../assets/icons/IconChevronNext.vue";
import IconChevronLeft from "../../assets/icons/IconChevronLeft.vue";
import TheProductCard from "../../components/Block/TheProductCard.vue";

import { useCartData } from "~/stores/cartData";
import useScrollToTop from "~/utils/useScrollToTop";

const { addProductToCart } = useCartData();
const { scrollToTop } = useScrollToTop();
const router = useRouter();
const route = useRoute();
const apiUrl = import.meta.env.VITE_API_URL;

const currentIndex = ref(0);
const bestsellerProduct = ref([]);

onMounted(async () => {
  await getPromotionalItem();
});

async function getPromotionalItem() {
  try {
    const response = await axios.get(`${apiUrl}/bestseller`);

    bestsellerProduct.value = response.data.bestseller;
  } catch (error) {
    console.error("сталась помилка:", error);
  }
}

const calcWidthWrapper = computed(() => {
  const screenWidth = ref(window.innerWidth);
  const baseWidth = screenWidth.value < 426 ? 310 : 305;

  return {
    width: baseWidth * bestsellerProduct.value.length + "px",
  };
});

const goForward = computed(() => {
  const slider = document.querySelector(".bestseller__wrapper");
  const screenWidth = ref(window.innerWidth);
  const basePosition = screenWidth.value < 426 ? 310 : 315;

  if (currentIndex.value == bestsellerProduct.value.length - 6) {
    currentIndex.value = 0;
  } else {
    currentIndex.value += 1;
  }

  const currentPosition = ref(basePosition * currentIndex.value);
  slider.style.transform = `translateX(-${currentPosition.value}px)`;
});

const goBackward = computed(() => {
  const slider = document.querySelector(".bestseller__wrapper");
  const screenWidth = ref(window.innerWidth);
  const basePosition = screenWidth.value < 426 ? 310 : 315;

  if (currentIndex.value === 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value -= 1;
  }

  const currentPosition = ref(basePosition * currentIndex.value);
  slider.style.transform = `translateX(-${currentPosition.value}px)`;
});

const goToProducts = (category, id, name) => {
  router.push(
    `/products/bestseller/${category}/${id}?category=Хіт продажу&category_path=/bestseller&product=${name}`
  );
};
</script>

<style lang="scss" scoped>
.bestseller {
  margin-top: 86px;
  padding-top: 50px;
  width: 100%;
  overflow: hidden;

  h2 {
    font-weight: 700;
  }
  &__wrapper {
    padding: 20px 0;
    margin-top: 30px;
    display: flex;
    align-items: center;
    transition: 0.5s all;
    transform: translateX(0);
    gap: 10px;
  }
}

.title__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chevron__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
}

@media screen and (max-width: 767px) {
  .bestseller {
    margin-top: 0;
  }
}
</style>
