<template>
  <div class="product-card__wrapper">
    <div class="product-card__wrapper_img">
      <v-img
        class="mx-auto"
        height="300"
        :lazy-src="props.path"
        max-width="500"
        :src="props.path"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>

      <div
        class="discount"
        v-if="props.discount || props.bestseller"
        :class="{ bestseller: props.bestseller }"
      >
        <ui-text-h4 v-if="props.discount"> -{{ props.discount }}%</ui-text-h4>
        <ui-text-h4 v-else> хіт</ui-text-h4>
        <icon-fire v-if="!props.discount" />
      </div>
    </div>

    <ui-text-h5> {{ props.title.slice(0, 50) + "..." }}</ui-text-h5>

    <div class="product-card__wrapper_price">
      <ui-text-h4 v-if="props.promotionalPrice !== '0.00'" class="action"
        >{{
          Math.round(props.promotionalPrice).toLocaleString("uk-UA")
        }}
        ₴</ui-text-h4
      >

      <ui-text-h4 :class="{ text: props.promotionalPrice !== '0.00' }"
        >{{ Math.round(props.price).toLocaleString("uk-UA") }} ₴</ui-text-h4
      >
    </div>

    <ui-btn @click.stop="buyProduct">КУПИТИ</ui-btn>
  </div>
</template>

<script setup>
import UiTextH4 from "../Ui/UiTextH4.vue";
import UiTextH5 from "../Ui/UiTextH5.vue";
import UiBtn from "../Ui/UiBtn.vue";
import IconFire from "~/assets/icons/IconFire.vue";

const emit = defineEmits(["buyProduct"]);
const props = defineProps({
  promotionalPrice: {
    type: String,
  },

  path: {
    type: String,
    require: true,
  },

  title: {
    type: String,
    require: true,
  },

  price: {
    type: String,
    require: true,
  },

  discount: {
    type: Number,
  },

  bestseller: {
    type: String,
  },
});
const imageLoaded = ref(false);
const onImageLoad = () => {
  imageLoaded.value = true;
};
const buyProduct = () => {
  emit("buyProduct");
};
</script>

<style lang="scss" scoped>
.product-card__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0px 2px 6px rgb(0 0 0 / 8%);

  &_img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }

  .v-img {
    width: 100%;
    height: auto;
    flex-grow: 1;
    min-height: 300px;
  }

  button {
    display: none;
  }

  h2 {
    font-weight: 700;
  }

  &_price {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (hover: hover) {
    &:hover button {
      display: block;
    }
  }
}

.action {
  color: darkred;
  font-size: 25px;
}

.text {
  text-decoration: line-through;
  color: gray;
}

.discount {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: rgba(68, 154, 16, 0.13);
  color: #449a10;
}

.bestseller {
  background: none;
  border: 1px solid rgb(144, 5, 5);
  color: black !important;
  border-radius: 10px;
  width: 100px;

  svg {
    width: 20px;
    margin-left: 5px;
  }
}

.skeleton {
  width: 100%;
  min-height: 75px;
  border-radius: 20px;
  background-color: white;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    background-color: white;
  }
  50% {
    background-color: white;
  }
  100% {
    background-color: white;
  }
}

@media screen and (max-width: 991px) {
  .product-card__wrapper {
    &:hover button {
      display: none;
    }
  }
}

@media screen and (max-width: 767px) {
  .product-card__wrapper {
    width: 320px;
  }
}

@media screen and (max-width: 426px) {
  .product-card__wrapper {
    width: 300px;
  }
}
</style>
