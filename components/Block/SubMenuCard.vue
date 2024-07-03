<template>
  <div class="sub_menu_card" @click="goToCatalog">
    <img
      :src="props.src"
      :alt="props.name"
      :class="{ main: props.isMainMenu == 'main' }"
    />

    <ui-text-h5 v-if="props.isMainMenu == 'main'">{{ props.name }}</ui-text-h5>
    <ui-text-h6 v-else>{{ props.name }}</ui-text-h6>
  </div>
</template>

<script setup>
import { useOtherData } from "~/stores/otherData";
import UiTextH5 from "../Ui/UiTextH5.vue";
import UiTextH6 from "../Ui/UiTextH6.vue";

const store = useOtherData();

const emit = defineEmits(["goToCatalog"]);
const props = defineProps({
  src: {
    type: String,
  },
  name: {
    type: String,
  },

  id: {
    type: Number,
  },

  parentId: {
    type: Number,
  },

  isMainMenu: {
    type: String,
  },
});

function goToCatalog() {
  if (props.isMainMenu !== "main") {
    store.showCatalogNav = false;
  }

  emit("goToCatalog");
}
</script>

<style lang="scss" scoped>
.sub_menu_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  cursor: pointer;

  img {
    width: 100px;
  }

  h2 {
    text-align: center;
    line-height: 20px;
    font-weight: 700;
    transition: color 0.4s ease;
    cursor: inherit;
  }

  &:hover h2 {
    color: rgba(144, 5, 5, 1);
  }
}

.main {
  width: 180px !important;
}
</style>
