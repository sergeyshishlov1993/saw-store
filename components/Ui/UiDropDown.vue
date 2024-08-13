<template>
  <div class="dropdown" v-if="props.show">
    <ui-text-h6
      v-for="city in cityArray"
      :key="city"
      :value="city.cityRef"
      @mousedown="getCityValue(city.cityRef, city.city)"
    >
      {{ city.city }}
    </ui-text-h6>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import UiTextH6 from "../Ui/UiTextH6.vue";

const defaultValue = reactive([
  {
    city: "Київ",
    cityRef: "8d5a980d-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Харків",
    cityRef: "db5c88e0-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Дніпро",
    cityRef: "db5c88f0-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Запоріжжя",
    cityRef: "db5c88c6-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Херсон",
    cityRef: "db5c88cc-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Львів",
    cityRef: "db5c88f5-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Миколаїв",
    cityRef: "db5c888c-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Одеса",
    cityRef: "db5c88d0-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Кривий Ріг",
    cityRef: "db5c890d-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Віниця",
    cityRef: "db5c88de-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Полтава",
    cityRef: "db5c8892-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Чернігів",
    cityRef: "db5c897c-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Черкаси",
    cityRef: "db5c8902-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Суми",
    cityRef: "db5c88e5-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Хмельницький",
    cityRef: "db5c88ac-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Житомир",
    cityRef: "db5c88c4-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Кропивницький",
    cityRef: "db5c891b-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Рівне",
    cityRef: "db5c896a-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Чернівці",
    cityRef: "e221d642-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Тернопіль",
    cityRef: "db5c8900-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Івано-Франківськ",
    cityRef: "db5c8904-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Луцьк",
    cityRef: "db5c893b-391c-11dd-90d9-001a92567626",
  },

  {
    city: "Ужгород",
    cityRef: "e221d627-391c-11dd-90d9-001a92567626",
  },
]);

const emit = defineEmits(["selectCity"]);
const props = defineProps({
  value: {
    type: Array,
  },

  name: {
    type: String,
  },

  show: {
    type: Boolean,
  },
});

function getCityValue(cityRef, city) {
  emit("selectCity", cityRef, city, false, props.name);
}

const cityArray = computed(() => {
  return props.value.length == 0 && props.name != "warehousesList"
    ? defaultValue
    : props.value;
});
</script>

<style lang="scss" scoped>
.dropdown {
  width: 300px;
  height: 150px;
  padding: 20px;

  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 20px;

  overflow-y: auto;
  overflow-x: hidden;

  h2 {
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 14px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
</style>
