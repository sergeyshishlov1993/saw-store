<template>
  <div class="search_card">
    <ui-loader v-if="isLoad" />

    <img
      :src="props.path[props.path.length - 1].pictures_name"
      :alt="props.name"
      @load="checkLoadImg"
    />

    <div class="search_card-text">
      <ui-text-h5>{{ props.name }}</ui-text-h5>

      <div class="price__wrapper">
        <ui-text-h5 :class="{ sale_price: sale !== '0.00' }"
          >{{ Math.round(props.price).toLocaleString("uk-UA") }} ₴</ui-text-h5
        >

        <ui-text-h5 v-if="sale !== '0.00'" style="color: darkred"
          >{{ Math.round(props.sale).toLocaleString("uk-UA") }} ₴</ui-text-h5
        >
      </div>
      <ui-btn @click="goToProduct(props.id)">Перейти</ui-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UiTextH5 from "../Ui/UiTextH5.vue";
import UiBtn from "../Ui/UiBtn.vue";
import UiLoader from "../Ui/UiLoader.vue";

const isLoad = ref(true);

const emit = defineEmits(["goToProduct"]);
const props = defineProps({
  path: {
    type: Array,
  },

  name: {
    type: String,
  },

  price: {
    type: String,
  },

  sale: {
    type: String,
  },

  discount: {
    type: String,
  },
});

const checkLoadImg = () => {
  isLoad.value = false;
};
</script>

<style lang="scss" scoped>
.search_card {
  position: relative;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 50px;
  background: white;
  border-radius: 15px;
  transition: background 0.3s ease;
  border-bottom: 1px solid gray;
  width: 500px;

  margin-top: 1px;

  button {
    line-height: 30px;
  }

  .price__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sale_price {
    text-decoration: line-through;
  }

  @media (hover: hover) {
    &:hover {
      background: rgb(238, 238, 238);
      box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.5);
      border: none;
      cursor: pointer;

      button {
        color: white;
        background: rgba(144, 5, 5, 1);

        svg {
          path {
            fill: white !important;
          }
        }
      }
    }
  }

  img {
    width: 100px;
  }

  &-text {
    display: flex;
    flex-direction: column;
    gap: 5px;

    h2 {
      font-weight: 500;
    }
  }
}

@media screen and (max-width: 991px) {
  .search_card {
    border-bottom: 1px solid black;

    img {
      width: 90px;
    }

    &-text {
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 180px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .search_card {
    width: 100%;

    &-text {
      button {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 424px) {
  .search_card {
    width: 320px;
  }
}
</style>
