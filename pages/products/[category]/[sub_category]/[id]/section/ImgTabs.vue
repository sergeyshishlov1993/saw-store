<template>
  <div class="imgTabs">
    <div class="litleImg">
      <button @click="goBackward" :disabled="props.pictures.length <= 1">
        <icon-chevron-up class="next" />
      </button>

      <div class="slider__wrapper">
        <div class="slider__inner" :style="sliderStyle">
          <img
            v-for="img in props.pictures"
            :key="img.id"
            :src="img.pictures_name"
            :alt="props.alt"
            @click="selectImg(img.pictures_name)"
          />
        </div>
      </div>

      <button @click="goForward" :disabled="props.pictures.length <= 1">
        <icon-chevron-down class="prev" />
      </button>
    </div>

    <ui-loader v-if="!imageLoaded" />
    <img class="bigImg" :src="path" :alt="path" @load="onImageLoad" />

    <div style="order: 3">
      <div class="title__wrapper">
        <div>
          <ui-text-h1 :class="{ isSale: props.isSale === 'true' }">
            {{ props.price }}
          </ui-text-h1>

          <ui-text-h1 class="discount" v-if="props.isSale === 'true'">
            {{ props.sale }}
          </ui-text-h1>
        </div>

        <ui-btn @click="addProductToCart">Купити</ui-btn>
      </div>

      <div class="delivery">
        <ui-text-h2>Доставка</ui-text-h2>

        <div class="post__title">
          <icon-new-post />

          <ui-text-h6>Адресна доставка "Новою поштою</ui-text-h6>
        </div>

        <ul>
          <ui-text-h2>Гарантія</ui-text-h2>

          <li>14 днів на обмін</li>
          <li>Офіційна гарантія від виробника</li>
          <li>36 місяців гарантії</li>
        </ul>

        <ul>
          <ui-text-h2>Оплата</ui-text-h2>

          <li>Післяплатою в відділенні</li>
          <li>На розрахунковий рахунок ПриватБанк</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from "vue";
import IconChevronUp from "~/assets/icons/IconChevronUp.vue";
import IconChevronDown from "~/assets/icons/IconChewronDown.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import UiTextH1 from "~/components/Ui/UiTextH1.vue";
import UiTextH2 from "~/components/Ui/UiTextH2.vue";
import UiTextH6 from "~/components/Ui/UiTextH6.vue";
import iconNewPost from "~/assets/icons/iconNewPost.vue";
import UiLoader from "~/components/Ui/UiLoader.vue";

const emit = defineEmits(["buyProduct"]);
const props = defineProps({
  pictures: Array,
  price: String,
  isSale: String,
  sale: String,
  alt: String,
});

const imageLoaded = ref(false);

const onImageLoad = () => {
  imageLoaded.value = true;
};

const currentIndex = ref(props.pictures.length - 4);

const sliderStyle = ref({
  transform: "translateY(0px)",
  transition: "transform 0.3s",
});

watchEffect(() => {
  const newPosition = -75 * currentIndex.value;

  if (typeof window !== "undefined") {
    if (window.innerWidth < 992) {
      const newPosition = -50 * currentIndex.value;
      sliderStyle.value.transform = `translateX(${newPosition}px)`;
    } else {
      sliderStyle.value.transform = `translateY(${newPosition}px)`;
    }
  }
});

function updateSliderDirection() {
  if (typeof window !== "undefined") {
    const newPosition = -75 * currentIndex.value;

    if (window.innerWidth < 992) {
      const newPosition = -50 * currentIndex.value;
      sliderStyle.value.transform = `translateX(${newPosition}px)`;
    } else {
      sliderStyle.value.transform = `translateY(${newPosition}px)`;
    }
  }
}

onMounted(() => {
  window.addEventListener("resize", updateSliderDirection);
});

function goForward() {
  if (currentIndex.value >= props.pictures.length - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
    path.value = props.pictures[currentIndex.value].pictures_name;
  }

  updateSliderDirection();
}

function goBackward() {
  if (currentIndex.value <= 0) {
    currentIndex.value = props.pictures.length - 1;
  } else {
    currentIndex.value--;
    path.value = props.pictures[currentIndex.value].pictures_name;
  }

  updateSliderDirection();
}

const path = ref(props.pictures[0]?.pictures_name);

function selectImg(p) {
  path.value = p;
}

const addProductToCart = () => {
  emit("buyProduct");
};
</script>

<style lang="scss" scoped>
.imgTabs {
  display: flex;
  gap: 10%;
}

.litleImg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  order: 1;

  button {
    svg {
      filter: invert(1);
    }
  }
}

.slider__wrapper {
  display: flex;
  overflow: hidden;
  height: 180px;
}

.slider__inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

img {
  display: block;
  width: 75px;
  height: 75px;
}

.bigImg {
  width: 40%;
  height: auto;
  object-fit: contain;
  order: 2;
}

.title__wrapper {
  padding-top: 181px;
  display: flex;
  align-items: center;
  gap: 30px;

  h2 {
    font-weight: 700;
  }

  button {
    height: 50px;
  }
}

.delivery {
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  h2 {
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.post__title {
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 25px;
  }
}

.isSale {
  text-decoration: line-through;
}

.discount {
  color: darkred;
}

@media screen and (max-width: 1199px) {
  .imgTabs {
    gap: 5%;
  }
}

@media screen and (max-width: 991px) {
  .imgTabs {
    padding-top: 50px;
    flex-direction: column;
  }

  .bigImg {
    width: 100%;
    height: 400px;
    order: 1;
  }

  .litleImg {
    flex-direction: row;

    order: 2;
    align-items: center;
    justify-content: space-between;

    .next {
      transform: rotate(-90deg);
    }

    .prev {
      transform: rotate(-90deg);
    }

    button {
      svg {
        width: 30px;
      }
    }
  }

  .slider__wrapper {
    width: 300px;
    height: 100px;
    align-items: center;
    justify-content: center;
  }

  .slider__inner {
    flex-direction: row;
    align-items: center;
  }
}

.title__wrapper {
  padding-top: 50px;

  h2 {
    font-size: 18px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 200px;
    height: 40px;
  }
}
.delivery {
  h2 {
    font-size: 18px;
  }
  .post__title {
    h2 {
      font-size: 14px;
    }
  }

  ul {
    h2 {
      font-size: 14px;
    }

    li {
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 767px) {
  .title__wrapper {
    h2 {
      font-size: 16px;
    }
  }

  .delivery {
    h2 {
      font-size: 16px;
    }
    .post__title {
      h2 {
        font-size: 13px;
      }
    }

    ul {
      h2 {
        font-size: 13px;
      }

      li {
        font-size: 12px;
      }
    }
  }

  .bigImg {
    height: 300px;
  }

  img {
    width: 50px;
    height: 50px;
  }
}

@media screen and (max-width: 374px) {
  .bigImg {
    width: 80%;
  }

  .litleImg {
    width: 280px;
  }
}
</style>
