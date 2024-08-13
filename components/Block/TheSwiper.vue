<template>
  <div class="slider__wrapper">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 7000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },

        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide v-for="slide in slider" :key="slide.id">
        <img :src="slide.name" :alt="slide.name" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const slider = ref([]);

onMounted(async () => {
  await getSliderImg();
});

async function getSliderImg() {
  try {
    const response = await axios.get(`http://localhost:8000/slider`);

    slider.value = response.data.slider;
  } catch (error) {
    console.error("сталась помилка:", error);
  }
}
</script>

<style lang="scss" scoped>
.slider__wrapper {
  padding: 150px 0 30px 0;

  max-width: 100%;

  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }
}
</style>
