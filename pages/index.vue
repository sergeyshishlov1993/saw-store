<template>
  <the-swiper />

  <div class="container">
    <div class="main-page">
      <section-main-categorie />
      <section-bestseller />
      <section-discount />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SectionMainCategorie from "./section/SectionMainCategorie.vue";
import SectionBestseller from "./section/SectionBestseller.vue";
import SectionDiscount from "./section/SectionDiscount.vue";
import TheSwiper from "../components/Block/TheSwiper.vue";
import { useSearchData } from "~/stores/searchData";
const search = useSearchData();

onMounted(() => {
  search.query = "";
});
</script>

<style lang="scss" scoped>
.main-page {
  padding: 20px 50px;
}

@media screen and (max-width: 767px) {
  .main-page {
    padding: 20px;
  }
}

@media screen and (max-width: 426px) {
  .main-page {
    padding: 10px;
  }
}
</style>
