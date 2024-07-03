<template>
  <div class="container">
    <div class="sub_category_wrapper">
      <sub-menu-card
        v-for="sub in subCategory"
        :key="sub.sub_category_id"
        :src="sub.pictures"
        :name="sub.sub_category_name"
        :id="sub.sub_category_id"
        :parentId="sub.parent_id"
        isMainMenu="main"
        @goToCatalog="goToProducts(sub.parent_id, sub.sub_category_id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import SubMenuCard from "~/components/Block/SubMenuCard.vue";

const subCategory = ref();

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const response = await axios.get(
    `http://localhost:8000/products/category/${route.params.category}`
  );

  subCategory.value = response.data.subCategory;
});

const goToProducts = (parentId, id) => {
  router.push(`/products/${parentId}/${id}`);
};
</script>

<style lang="scss" scoped>
.sub_category_wrapper {
  padding-top: 200px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 20px;
}
</style>
