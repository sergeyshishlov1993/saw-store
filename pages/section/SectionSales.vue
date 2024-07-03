<template>
  <div class="sales">
    <div class="title__wrapper">
      <ui-text-h1>ХІТ продажів</ui-text-h1>

      <div class="chevron__wrapper">
        <button @click="goBackward" :disabled="currentIndex == 0">
          <icon-chevron-left />
        </button>

        <button
          @click="goForward"
          :disabled="actionProduct.length - currentIndex < 5"
        >
          <icon-chevron-next />
        </button>
      </div>
    </div>

    <div class="sales__wrapper" :style="calcWidthWrapper">
      <the-product-card
        v-for="product in actionProduct"
        :key="product.title"
        :path="product.path"
        :title="product.title"
        :price="product.price"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import UiTextH1 from "../../components/Ui/UiTextH1.vue";
import IconChevronNext from "../../assets/icons/IconChevronNext.vue";
import IconChevronLeft from "../../assets/icons/IconChevronLeft.vue";
import TheProductCard from "../../components/Block/TheProductCard.vue";

const currentIndex = ref(0);

const actionProduct = reactive([
  {
    price: 900,
    title: "Тепловентилятор керамічний Procraft FP20",
    path: "https://procraft.ua/image/cache/catalog/Electroinstryment/teploventiljatory/FP20/xFP20_1-228x228.jpg.pagespeed.ic.2WCzMq1t4l.webp",
  },

  {
    price: 960,
    title: "Інверторний зарядний пристрій Proсraft PZ10M",
    path: "https://procraft.ua/image/cache/catalog/Svarochnoe_oborudovanie_i_maski/Pusko-zaryadnie_ystroystva/PZ10M/PZ10M_3-500x500.jpg",
  },

  {
    price: 1100,
    title: "Точило Procraft PAE150/600",
    path: "https://procraft.ua/image/cache/catalog/Zatochki/Tochilo/600/1-500x500.jpg",
  },

  {
    price: 1100,
    title:
      "Кутошліфувальна машина Procraft PW1100 125 мм + Швидкозатискна гайка Procraft M14",
    path: "https://procraft.ua/image/cache/catalog/naboru/aktsionnye-nabory/05.02.2024/PW1100_M14-500x500.jpg",
  },

  {
    price: 1185,
    title: "Ексцентрик Procraft EX1010E",
    path: "https://procraft.ua/image/cache/catalog/Shlifovalniy_instrument/ektsentrik/EX1010E/EX1010E_1-500x500.jpg",
  },

  {
    price: 1275,
    title:
      "Кутошліфувальна машина Procraft PW1100ES 125 мм + Швидкозатискна гайка Procraft M14",
    path: "https://procraft.ua/image/cache/catalog/naboru/aktsionnye-nabory/05.02.2024/xPW1100es_m14-500x500.jpg.pagespeed.ic.O41_RQNkUl.webp",
  },

  {
    price: 1335,
    title: "Шуруповерт Procraft PA18C COMPACT",
    path: "https://procraft.ua/image/cache/catalog/Electroinstryment/Shyrypoverti/PA18C/x1-500x500.jpg.pagespeed.ic.08PxfX_kZt.webp",
  },

  {
    price: 1365,
    title: "Тепловентилятор керамічний Procraft FP30",
    path: "https://procraft.ua/image/cache/catalog/Electroinstryment/teploventiljatory/FP30/FP30_02-500x500.jpg",
  },

  {
    price: 1680,
    title: "Пуско-зарядний пристрій Procraft JS10",
    path: "https://procraft.ua/image/cache/catalog/Svarochnoe_oborudovanie_i_maski/Pusko-zaryadnie_ystroystva/JS10_new/JS10_5-500x500.jpg",
  },

  {
    price: 1725,
    title:
      "Ланцюгова пила Procraft K1800 бічна + Олива Procraft для ланцюга 1 л",
    path: "https://procraft.ua/image/cache/catalog/akcii/new/K1800_oliva-500x500.jpg",
  },

  {
    price: 1905,
    title: "Інверторний зварювальний апарат Procraft SP260",
    path: "https://procraft.ua/image/cache/catalog/Svarochnoe_oborudovanie_i_maski/Svarochnie_apparati/SP260/SP260_1-500x500.jpg",
  },

  {
    price: 2070,
    title: "Машина шліфувальна Procraft PM2100",
    path: "https://procraft.ua/image/cache/catalog/Shlifovalniy_instrument/mashina_polirovalnaya/PM2100/PM2100_21-500x500.jpg ",
  },
]);

const calcWidthWrapper = computed(() => ({
  width: 315 * actionProduct.length + "px",
}));

const goForward = computed(() => {
  const slider = document.querySelector(".sales__wrapper");

  if (currentIndex.value == actionProduct.length - 6) {
    currentIndex.value = 0;
  } else {
    currentIndex.value += 1;
  }

  const currentPosition = ref(315 * currentIndex.value);
  slider.style.transform = `translateX(-${currentPosition.value}px)`;
});

const goBackward = computed(() => {
  const slider = document.querySelector(".sales__wrapper");

  if (currentIndex.value === 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value -= 1;
  }

  const currentPosition = ref(315 * currentIndex.value);
  slider.style.transform = `translateX(-${currentPosition.value}px)`;
});
</script>

<style lang="scss" scoped>
.sales {
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
</style>
