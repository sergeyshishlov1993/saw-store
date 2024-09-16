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
      <ui-text-h5>{{ props.price }}</ui-text-h5>
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
});

const checkLoadImg = () => {
  isLoad.value = false;
};
</script>

<style lang="scss" scoped>
.search_card {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: white;
  border-radius: 15px;
  transition: background 0.3s ease;
  width: 500px;

  button {
    line-height: 30px;
  }

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
    width: 400px;

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

@media (hover: none) {
  .search_card:hover {
    background-color: initial;
    color: initial;
  }
}
</style>
