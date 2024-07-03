<template>
  <div class="slider__wrapper">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 4000,
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
      <SwiperSlide>
        <img
          src="assets/img/close-up-photo-cutting-wood-with-fretsaw.jpg"
          alt="..."
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="assets/img/carpenter-cutting-mdf-board-inside-workshop.jpg"
          alt="..."
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="assets/img/carpenter-using-circular-saw-cutting-wooden-boards-construction-details-male-worker-handy-man-with-power-tools (1).jpg"
          alt="..."
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="assets/img/close-up-photo-cutting-wood-with-fretsaw.jpg"
          alt="..."
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="assets/img/carpenter-using-circular-saw-cutting-wooden-boards-construction-details-male-worker-handy-man-with-power-tools.jpg"
          alt="..."
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.slider__wrapper {
  //   padding-top: 200px;
}
</style>
