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
const apiUrl = process.env.VITE_API_URL;

onMounted(async () => {
  await getSliderImg();
});

async function getSliderImg() {
  try {
    const response = await axios.get(`${apiUrl}/slider`);

    slider.value = response.data.slider;
  } catch (error) {
    console.error("сталась помилка:", error);
  }
}
</script>

<style lang="scss" scoped>
.slider__wrapper {
  padding: 80px 0 30px 0;
  max-width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }

  img {
    width: 100%;
    max-height: 100%;
  }
}

@media screen and (max-width: 991) {
  .swiper-slide {
    height: 100%;
  }
}
</style>
