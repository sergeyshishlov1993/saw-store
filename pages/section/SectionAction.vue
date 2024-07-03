<template>
  <div class="action">
    <ui-text-h1>АКЦІЯ</ui-text-h1>

    <div class="action__wrapper">
      <the-product-card
        actionPrice="900"
        v-for="product in actionProduct"
        :key="product.title"
        :path="product.path"
        :title="product.title"
        :price="product.price"
      />
    </div>

    <button @click="getCatalog">БІЛЬШЕ АКЦІЙНИХ ПРОПОЗИЦІЙ</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import UiTextH1 from "../../components/Ui/UiTextH1.vue";
import TheProductCard from "../../components/Block/TheProductCard.vue";
import axios from "axios";

let responseData = null;
async function getCatalog() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/getData/catalog"
    );
    responseData = response.data;
    console.log(responseData);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

const actionProduct = reactive([
  {
    price: 900,
    title: "Тепловентилятор керамічний Procraft FP20",
    path: "https://procraft.ua/image/cache/catalog/Electroinstryment/teploventiljatory/FP20/xFP20_1-228x228.jpg.pagespeed.ic.2WCzMq1t4l.webp",
    id: 1,
  },

  {
    price: 960,
    title: "Інверторний зарядний пристрій Proсraft PZ10M",
    path: "https://procraft.ua/image/cache/catalog/Svarochnoe_oborudovanie_i_maski/Pusko-zaryadnie_ystroystva/PZ10M/PZ10M_3-500x500.jpg",
    id: 2,
  },

  {
    price: 1100,
    title: "Точило Procraft PAE150/600",
    path: "https://procraft.ua/image/cache/catalog/Zatochki/Tochilo/600/1-500x500.jpg",
    id: 3,
  },

  {
    price: 1100,
    title:
      "Кутошліфувальна машина Procraft PW1100 125 мм + Швидкозатискна гайка Procraft M14",
    path: "https://procraft.ua/image/cache/catalog/naboru/aktsionnye-nabory/05.02.2024/PW1100_M14-500x500.jpg",
    id: 4,
  },

  {
    price: 1185,
    title: "Ексцентрик Procraft EX1010E",
    path: "https://procraft.ua/image/cache/catalog/Shlifovalniy_instrument/ektsentrik/EX1010E/EX1010E_1-500x500.jpg",
    id: 5,
  },

  {
    price: 1275,
    title:
      "Кутошліфувальна машина Procraft PW1100ES 125 мм + Швидкозатискна гайка Procraft M14",
    path: "https://procraft.ua/image/cache/catalog/naboru/aktsionnye-nabory/05.02.2024/xPW1100es_m14-500x500.jpg.pagespeed.ic.O41_RQNkUl.webp",
    id: 6,
  },

  {
    price: 1335,
    title: "Шуруповерт Procraft PA18C COMPACT",
    path: "https://procraft.ua/image/cache/catalog/Electroinstryment/Shyrypoverti/PA18C/x1-500x500.jpg.pagespeed.ic.08PxfX_kZt.webp",
    id: 7,
  },

  {
    price: 1365,
    title: "Тепловентилятор керамічний Procraft FP30",
    path: "https://procraft.ua/image/cache/catalog/Electroinstryment/teploventiljatory/FP30/FP30_02-500x500.jpg",
    id: 8,
  },
]);
</script>

<style lang="scss" scoped>
.action {
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
    &:hover {
      box-shadow: -1px 2px 20px -6px rgba(0, 0, 0, 0.75);
      background: darkred;
      color: white;
    }
  }
}
</style>
