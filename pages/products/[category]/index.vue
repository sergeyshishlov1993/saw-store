<template>
  <div class="container">
    <div class="sub_category">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <div class="sub_category_wrapper">
        <sub-menu-card
          v-for="sub in subCategory"
          :key="sub.sub_category_id"
          :src="sub.pictures"
          :name="sub.sub_category_name"
          :id="sub.sub_category_id"
          :parentId="sub.parent_id"
          isMainMenu="main"
          @goToCatalog="
            goToProducts(
              sub.parent_id,
              sub.sub_category_id,
              sub.sub_category_name
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import SubMenuCard from "~/components/Block/SubMenuCard.vue";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";

const subCategory = ref();
const apiUrl = process.env.VITE_API_URL;
const route = useRoute();
const router = useRouter();

const breadcrumb = ref([
  { name: "Головна", path: "/" },

  {
    name: route.query.category,
    path: `${route.path}?category=${route.query.category}`,
  },
]);

onMounted(async () => {
  const response = await axios.get(
    `${apiUrl}/products/category/${route.params.category}`
  );

  subCategory.value = response.data.subCategory;
});

const goToProducts = (parentId, id, name) => {
  router.push(
    `/products/${parentId}/${id}?category=${route.query.category}&category_path=${route.path}&sub_category=${name}`
  );
};
</script>

<style lang="scss" scoped>
.sub_category {
  padding-top: 150px;

  &_wrapper {
    padding-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px 20px;
  }
}

@media screen and (max-width: 991px) {
  .sub_category {
    padding-top: 100px;
    &_wrapper {
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
  }
}

@media screen and (max-width: 768px) {
  .sub_category {
    padding-top: 50px;

    &_wrapper {
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
  }
}

@media screen and (max-width: 767px) {
  .sub_category_wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 426px) {
  .sub_category_wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
