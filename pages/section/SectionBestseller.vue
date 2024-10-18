<template>
  <div class="bestseller">
    <div class="title__wrapper">
      <ui-text-h1>ХІТ продажів</ui-text-h1>

      <div class="chevron__wrapper">
        <button @click="clickBackward" :disabled="currentIndex === 0">
          <icon-chevron-left />
        </button>

        <button @click="clickForward">
          <icon-chevron-next />
        </button>
      </div>
    </div>

    <div
      class="bestseller__wrapper"
      ref="sliderWrapper"
      :style="calcWidthWrapper"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <the-product-card
        class="bestseller__card"
        v-for="product in bestsellerProduct"
        :key="product.product_id"
        :path="product.pictures[product.pictures.length - 1].pictures_name"
        :title="product.product_name"
        :price="product.price"
        promotionalPrice="0.00"
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
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
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;

const currentIndex = ref(0);
const bestsellerProduct = ref([]);
const screenWidth = ref(null);
const countVisibleCard = ref(0);
const sliderWrapper = ref(null);

onMounted(async () => {
  await getPromotionalItem();
  screenWidth.value = window.innerWidth;

  if (screenWidth.value < 500) {
    countVisibleCard.value = 1;
  } else if (screenWidth.value <= 992) {
    countVisibleCard.value = 2;
  } else if (screenWidth.value < 1200) {
    countVisibleCard.value = 3;
  } else {
    countVisibleCard.value = 4;
  }
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
  return {
    width: 300 * bestsellerProduct.value.length + "px",
  };
});

function clickForward() {
  if (
    currentIndex.value <
    bestsellerProduct.value.length - countVisibleCard.value
  ) {
    currentIndex.value += 1;
  } else {
    currentIndex.value = 0;
  }

  const currentPosition = 300 * currentIndex.value;
  sliderWrapper.value.style.transform = `translateX(-${currentPosition}px)`;
}

function clickBackward() {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }

  const currentPosition = 300 * currentIndex.value;
  sliderWrapper.value.style.transform = `translateX(-${currentPosition}px)`;
}

const touchStartX = ref(0);
const touchEndX = ref(0);

function handleTouchStart(event) {
  touchStartX.value = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
  touchEndX.value = event.changedTouches[0].screenX;
  handleSwipeGesture();
}

function handleSwipeGesture() {
  const swipeDistance = Math.abs(touchEndX.value - touchStartX.value);
  const swipeThreshold = 50;
  const steps = Math.floor(swipeDistance / swipeThreshold);

  if (touchEndX.value < touchStartX.value) {
    goForward(steps);
  } else if (touchEndX.value > touchStartX.value) {
    goBackward(steps);
  }
}

function goForward(steps = 1) {
  if (
    currentIndex.value + steps >=
    bestsellerProduct.value.length - countVisibleCard.value
  ) {
    currentIndex.value = bestsellerProduct.value.length - 1;
  } else {
    currentIndex.value += steps;
  }

  const currentPosition = 300 * currentIndex.value;
  sliderWrapper.value.style.transform = `translateX(-${currentPosition}px)`;
}

function goBackward(steps = 1) {
  if (currentIndex.value - steps <= 0) {
    currentIndex.value = 0;
  } else {
    currentIndex.value -= steps;
  }

  const currentPosition = 300 * currentIndex.value;
  sliderWrapper.value.style.transform = `translateX(-${currentPosition}px)`;
}

const goToProducts = (category, id, name) => {
  router.push(`/products/bestseller/${category}/${id}`);
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

@media screen and (max-width: 1200px) {
  .bestseller__card {
    width: 280px;
  }
}

@media screen and (max-width: 992px) {
  .bestseller__card {
    width: 250px;
  }
}

@media screen and (max-width: 767px) {
  .bestseller__card {
    width: 100%;
  }
}
</style>
