<template>
  <div class="slider__wrapper">
    <div
      id="carouselExampleInterval"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item" v-for="slide in slider" :key="slide.id">
          <img :src="slide.name" class="d-block w-100" alt="..." />
        </div>
        <!-- <div class="carousel-item active" data-bs-interval="10000">
          <img
            src="assets/img/carpenter-works-with-tree.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div> -->

        <!-- <div class="carousel-item" data-bs-interval="2000">
          <img
            src="assets/img/close-up-photo-cutting-wood-with-fretsaw.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div> -->

        <!-- <div class="carousel-item">
          <img
            src="assets/img/carpenter-cutting-mdf-board-inside-workshop.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div> -->

        <!-- <div class="carousel-item">
          <img
            src="assets/img/carpenter-using-circular-saw-cutting-wooden-boards-construction-details-male-worker-handy-man-with-power-tools (1).jpg"
            class="d-block w-100"
            alt="..."
          />
        </div> -->

        <!-- <div class="carousel-item">
          <img
            src="assets/img/carpenter-using-circular-saw-cutting-wooden-boards-construction-details-male-worker-handy-man-with-power-tools.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div> -->
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>

      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
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

    console.log("slider", response);

    slider.value = response.data.slider;
  } catch (error) {
    console.error("сталась помилка:", error);
  }
}
</script>

<style lang="scss" scoped>
.slider__wrapper {
  height: 570px;
}

img {
  height: 700px;
  aspect-ratio: 16/9;
  object-fit: cover;
}
</style>
