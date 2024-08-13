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
import SectionMainCategorie from "./section/SectionMainCategorie.vue";
import SectionBestseller from "./section/SectionBestseller.vue";
import SectionDiscount from "./section/SectionDiscount.vue";
import TheSwiper from "../components/Block/TheSwiper.vue";
</script>

<style lang="scss" scoped>
.main-page {
  padding: 20px 50px;
}
</style>
