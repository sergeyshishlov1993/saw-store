<template>
  <div class="viewed_item__wrapper">
    <ui-text-h2>{{ props.title }}</ui-text-h2>

    <div class="chevron__wrapper">
      <button @click="clickBackward" :disabled="currentIndex === 0">
        <icon-chevron-left />
      </button>

      <button @click="clickForward">
        <icon-chevron-next />
      </button>
    </div>

    <div
      class="viewed_item"
      ref="sliderWrapper"
      :style="calcWidthWrapper"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <the-product-card
        v-for="card in props.item"
        :key="card.product_id"
        :path="
          props.name == 'category'
            ? card.pictures[card.pictures.length - 1].pictures_name
            : card.pictures[0].pictures_name
        "
        :title="card.product_name"
        :price="card.price"
        :promotionalPrice="card.sale_price"
        :discount="card.discount"
        @click="goToProduct(card.product_id, card.product_name)"
        @buy-product="addProductToCart(card, card.product_id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useviewedItems } from "~/stores/viewedItem";
import { useCategorySubCategory } from "~/stores/category_subCategory";
import UiTextH2 from "~/components/Ui/UiTextH2.vue";
import IconChevronNext from "~/assets/icons/IconChevronNext.vue";
import IconChevronLeft from "~/assets/icons/IconChevronLeft.vue";
import TheProductCard from "~/components/Block/TheProductCard.vue";

const route = useRoute();
const router = useRouter();
const { resetBreadcrumb } = useCategorySubCategory();

const props = defineProps({
  item: Array,
  title: String,
  name: String,
});

const { viewedItems, addviewedItems } = useviewedItems();

const category = route.params.category;
const subCategory = route.params.sub_category;
const currentIndex = ref(0);
const screenWidth = ref(null);
const countVisibleCard = ref(0);
const sliderWrapper = ref(null);

onMounted(() => {
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

// slider

const calcWidthWrapper = computed(() => {
  return {
    width: 300 * props.item.length + "px",
  };
});

function clickForward() {
  if (currentIndex.value < props.item.length - countVisibleCard.value) {
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
    props.item.length - countVisibleCard.value
  ) {
    currentIndex.value = props.item.length - 1;
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

// slider

async function goToProduct(productId, name) {
  resetBreadcrumb();
  router.push(
    `/products/${category}/${subCategory}/${productId}?pixel=${route.query.pixel}`
  );
}
</script>

<style lang="scss" scoped>
.chevron__wrapper {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 25px;
}

.viewed_item__wrapper {
  margin-top: 50px;

  h2 {
    font-weight: 700;
  }
}

.viewed_item {
  padding: 20px 0;
  margin-top: 30px;
  display: flex;
  align-items: center;
  transition: 0.5s all;
  transform: translateX(0);
  gap: 10px;
}
</style>
