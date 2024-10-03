<template>
  <div class="slider__wrapper">
    <div :class="{ skeleton: !isLoad }">
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
          <img :src="slide.name" :alt="slide.name" @load="isLoad = true" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const slider = ref([]);
const isLoad = ref(false);
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;

onMounted(async () => {
  await getSliderImg();
});

async function getSliderImg() {
  try {
    const response = await axios.get(`${apiUrl}/slider`);

    slider.value = response.data.slider.map((slide) => ({
      ...slide,
      loaded: false,
    }));
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

  .skeleton {
    width: 100%;
    min-height: 500px;
    background-color: #e0e0e0;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
}

@media screen and (max-width: 1199px) {
  .slider__wrapper {
    .swiper-slide {
      padding-top: 30px;
      height: 100%;
    }
  }
}

@media screen and (max-width: 991px) {
  .slider__wrapper {
    .skeleton {
      min-height: 200px;
    }
  }
}

@media screen and (max-width: 767px) {
  .slider__wrapper {
    .swiper-slide {
      padding-top: 5px;
    }
  }
}
</style>
