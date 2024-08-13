<template>
  <div class="imgTabs">
    <div class="litleImg">
      <button @click="goBackward" :disabled="props.pictures.length <= 1">
        <icon-chevron-up />
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
        <icon-chevron-down />
      </button>
    </div>
    <img class="bigImg" :src="path" :alt="path" />

    <div>
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

          <ui-text-h6
            >Безкоштовна доставка до відділення "Нової пошти" при замовленні від
            710 грн'</ui-text-h6
          >
        </div>

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
import { ref, watchEffect } from "vue";
import IconChevronUp from "~/assets/icons/IconChevronUp.vue";
import IconChevronDown from "~/assets/icons/IconChewronDown.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import UiTextH1 from "~/components/Ui/UiTextH1.vue";
import UiTextH2 from "~/components/Ui/UiTextH2.vue";
import UiTextH6 from "~/components/Ui/UiTextH6.vue";
import iconNewPost from "~/assets/icons/iconNewPost.vue";

const emit = defineEmits(["buyProduct"]);
const props = defineProps({
  pictures: Array,
  price: String,
  isSale: String,
  sale: String,
  alt: String,
});

const newPost = ref([
  'Безкоштовна доставка до відділення "Нової пошти" при замовленні від 710 грн',
  'Адресна доставка "Новою поштою"',
]);

const currentIndex = ref(props.pictures.length - 4);

const sliderStyle = ref({
  transform: "translateY(0px)",
  transition: "transform 0.3s",
});

watchEffect(() => {
  const newPosition = -75 * currentIndex.value;
  sliderStyle.value.transform = `translateY(${newPosition}px)`;
});

function goForward() {
  if (currentIndex.value >= props.pictures.length - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
    path.value = props.pictures[currentIndex.value].pictures_name;
  }
}

function goBackward() {
  if (currentIndex.value <= 0) {
    currentIndex.value = props.pictures.length - 1;
  } else {
    currentIndex.value--;
    path.value = props.pictures[currentIndex.value].pictures_name;
  }
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

  button {
    svg {
      filter: invert(1);
    }
  }
}

.slider__wrapper {
  display: flex;
  overflow: hidden;
  height: 300px;
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
</style>
