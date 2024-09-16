<template>
  <div class="sub_menu_card" @click="goToCatalog">
    <ui-loader v-if="!imageLoaded" />
    <img
      @load="onImageLoad"
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
import UiLoader from "../Ui/UiLoader.vue";

const { visibilityStore } = useOtherData();

const emit = defineEmits(["goToCatalog"]);
const props = defineProps({
  src: {
    type: String,
  },
  name: {
    type: String,
  },

  id: {
    type: String,
  },

  parentId: {
    type: String,
  },

  isMainMenu: {
    type: String,
  },
});

const imageLoaded = ref(false);

const onImageLoad = () => {
  imageLoaded.value = true;
};

function goToCatalog() {
  if (props.isMainMenu !== "main") {
    visibilityStore.showCatalogNav = false;
  }

  emit("goToCatalog");
}
</script>

<style lang="scss" scoped>
.sub_menu_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  img {
    width: 75px;
  }

  h2 {
    text-align: center;
    line-height: 20px;
    font-weight: 700;
    transition: color 0.4s ease;
    cursor: inherit;
  }

  @media (hover: hover) {
    &:hover h2 {
      color: rgba(144, 5, 5, 1);
    }
  }
}

.main {
  width: 180px !important;
}

@media screen and (max-width: 991px) {
  .main {
    width: 100px !important;
  }
}
</style>
