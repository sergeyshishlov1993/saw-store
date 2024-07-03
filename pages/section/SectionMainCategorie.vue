<template>
  <div>
    <ui-text-h1>КАТЕГОРІЇ</ui-text-h1>

    <div class="categorie__wrapper">
      <the-main-card
        v-for="title in categogiesMain"
        :key="title"
        :title="title"
        @click="goToCategory(title[1])"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import UiTextH1 from "../../components/Ui/UiTextH1.vue";
import TheMainCard from "../../components/Block/TheMainCard.vue";

const router = useRouter();

const categogiesMain = reactive([
  ["Електроінструмент", 2],
  ["Акумуляторний інструмент", 73],
  ["Деревообробний інструмент", 106],
  ["Зварювальне обладнання", 4],
  ["Садово парковий інструмент", 72],
  ["Бензоінструменти", 7],
  ["Компресори та пневмоінструменти", 5],
  ["Будівельна техніка та обладнання", 187],
]);

async function goToCategory(category) {
  router.push(`/products/${category}`);
}
</script>

<style lang="scss" scoped>
div {
  h2 {
    font-weight: 700;
  }
}

.categorie__wrapper {
  margin-top: 33px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
