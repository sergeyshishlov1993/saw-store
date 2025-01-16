<template>
  <div class="container">
    <div class="sub_category">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <ui-loader v-if="showLoader" />

      <div class="sub_category_wrapper" v-else>
        <sub-category
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
import { useCategorySubCategory } from "./stores/category_subCategory";
import axios from "axios";
import SubCategory from "~/components/Block/SubCategory.vue";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";
import UiLoader from "~/components/Ui/UiLoader.vue";

const subCategory = ref();
const {
  breadcrumb,
  addCategoryToBreadcrumb,
  fetchCategoriesAndSubCategories,
  initializeRouteWatcher,
} = useCategorySubCategory();
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;
const route = useRoute();
const router = useRouter();
const showLoader = ref(false);

onMounted(async () => {
  initializeRouteWatcher(route);

  if (breadcrumb.length < 2) {
    await fetchCategoriesAndSubCategories();
    await addCategoryToBreadcrumb(route.params.category);
  }

  await getSubCategory();

  useHead({
    title: `${breadcrumb[1].name} - Купити у SAW STORE - Спеціальні пропозиції на професійний електроінструмент - Купить болгарку - Купить шуруповерт - Купить дрель - Купить секатор - Купить инвертор - Купить электролобзик - Купить генератор - Купить мотоблок - Купить перфоратор - Купить сварочный аппарат - Купить бензопилу - Купить рубанок - Купить триммер - Купить отбойный молоток - Купить фрезер - Купить циркулярную пилу - Купить плиткорез - Купить компрессор - Купить пылесос - Купить гайковерт - Купить мультитул - Купить степлер - Купить лобзик - Купить виброшлифовальную машину - Купить торцовочную пилу - Купить точильный станок - Купить ленточную пилу - Купить газонокосилку - Купить электрический культиватор - Купить бензиновую косу - Купить клеймопистолет - Купить клеевой пистолет - Купить электрокосу - Купить цепную пилу - Купить ударную дрель - Купить угловую шлифовальную машину - Купить промышленный фен - Купить строительный миксер - Купить паяльник - Купить тепловую пушку - Купить мойку высокого давления - Купить распылитель краски - Купить токарный станок - Купить полировальную машину - Купить дисковую пилу - Купить аккумуляторную отвертку - Купить лазерный уровень - Купить нивелир - Купить шлифмашину - Купить электрорубанок - Купить точильный камень - Купить керхер - Купить воздуходувку - Купить ножницы по металлу - Купить плиткорез - Купить электротример - Купить станок для заточки - Купить сабельную пилу - Купить миксер строительный - Купить ударный гайковерт - Купить рейсмусовый станок - Купить шлифовальную машину - Купить компрессор для покраски - Купить инструмент для заточки ножей - Купить бензиновую воздуходувку`,
    meta: [
      {
        name: "robots",
        content: "index, follow",
      },
      {
        name: "description",
        content: `Купити ${breadcrumb[1].name} у SAW STORE. Спеціальні пропозиції та знижки на професійний електроінструмент. Обирайте якість за найкращою ціною.`,
      },
      {
        name: "keywords",
        content: `${breadcrumb[1].name}, SAW STORE, знижки, професійний електроінструмент, спеціальні пропозиції, вигідні умови`,
      },
    ],
  });
});

async function getSubCategory() {
  showLoader.value = true;
  try {
    const response = await axios.get(
      `${apiUrl}/products/category/${route.params.category}`
    );

    subCategory.value = response.data.subCategory;

    showLoader.value = false;
  } catch (error) {
    console.error("сталась помилка", error);
    showLoader.value = false;
  }
}

const goToProducts = (parentId, id, name) => {
  router.push(`/products/${parentId}/${id}?pixel=${route.query.pixel}`);
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
