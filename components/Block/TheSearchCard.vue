<template>
  <div class="search_card">
    <img
      :src="props.path[props.path.length - 1].pictures_name"
      :alt="props.name"
    />

    <div class="search_card-text">
      <ui-text-h5>{{ props.name }}</ui-text-h5>
      <ui-text-h5>{{ props.price }}</ui-text-h5>
      <ui-btn @click="goToProduct(props.id)">Перейти</ui-btn>
    </div>
  </div>
</template>

<script setup>
import UiTextH5 from "../Ui/UiTextH5.vue";
import UiBtn from "../Ui/UiBtn.vue";

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
  .search_card-text {
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 180px;
    }
  }
}

@media screen and (max-width: 767px) {
  .search_card {
    width: 320px;

    &-text {
      button {
        height: 30px;
        width: 100px;
      }
    }
  }
}
</style>
