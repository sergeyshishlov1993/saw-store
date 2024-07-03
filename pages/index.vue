<template>
  <the-slider />

  <!-- <the-swiper /> -->
  <div class="container">
    <div class="main-page">
      <section-main-categorie />
      <section-sales />
      <section-action />
    </div>
  </div>
</template>

<script setup>
import SectionMainCategorie from "./section/SectionMainCategorie.vue";
import SectionSales from "./section/SectionSales.vue";
import SectionAction from "./section/SectionAction.vue";
import TheSlider from "../components/Block/TheSlider.vue";
import TheSwiper from "../components/Block/TheSwiper.vue";
</script>

<style lang="scss" scoped>
.main-page {
  padding: 160px 20px 100px 20px;
}
</style>
