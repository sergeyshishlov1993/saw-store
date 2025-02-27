<template>
  <div class="container">
    <div class="wrapper">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <ui-loader v-if="showLoader" />
      <div class="product__wrapper">
        <the-product-card
          v-for="card in products"
          :key="card.product_id"
          :path="card.pictures[card.pictures.length - 1].pictures_name"
          :title="card.product_name"
          :price="card.price"
          :promotionalPrice="card.sale_price"
          :discount="card.discount"
          @click="goToProduct(card.product_id, card.product_name)"
          @buy-product="addProductToCart(card, card.product_id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsBySubCategory } from "~/stores/productsBySubCategory";
import { useCartData } from "~/stores/cartData";
import TheProductCard from "~/components/Block/TheProductCard.vue";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";
import UiLoader from "~/components/Ui/UiLoader.vue";
import { useCategorySubCategory } from "~/stores/category_subCategory";

const route = useRoute();
const router = useRouter();
const category = route.params.category;
const sub_category = route.params.sub_category;
const showLoader = ref(false);
const { getProductsBySubCategory } = useProductsBySubCategory();
const { productsInСart, showModalWindow, addProductToCart } = useCartData();

const {
  breadcrumb,
  addCategoryToBreadcrumb,
  addSubCategoryToBreadcrumb,
  initializeRouteWatcher,
} = useCategorySubCategory();

const products = ref();

onMounted(async () => {
  initializeRouteWatcher(route);
  showLoader.value = true;
  try {
    products.value = await getProductsBySubCategory(sub_category);

    addCategoryToBreadcrumb(category);
    addSubCategoryToBreadcrumb(sub_category);
    showLoader.value = false;

    useHead({
      title: `${breadcrumb[2].name} - Купити у SAW STORE - Спеціальні пропозиції на професійний електроінструмент - Купить болгарку - Купить шуруповерт - Купить дрель - Купить секатор - Купить инвертор - Купить электролобзик - Купить генератор - Купить мотоблок - Купить перфоратор - Купить сварочный аппарат - Купить бензопилу - Купить рубанок - Купить триммер - Купить отбойный молоток - Купить фрезер - Купить циркулярную пилу - Купить плиткорез - Купить компрессор - Купить пылесос - Купить гайковерт - Купить мультитул - Купить степлер - Купить лобзик - Купить виброшлифовальную машину - Купить торцовочную пилу - Купить точильный станок - Купить ленточную пилу - Купить газонокосилку - Купить электрический культиватор - Купить бензиновую косу - Купить клеймопистолет - Купить клеевой пистолет - Купить электрокосу - Купить цепную пилу - Купить ударную дрель - Купить угловую шлифовальную машину - Купить промышленный фен - Купить строительный миксер - Купить паяльник - Купить тепловую пушку - Купить мойку высокого давления - Купить распылитель краски - Купить токарный станок - Купить полировальную машину - Купить дисковую пилу - Купить аккумуляторную отвертку - Купить лазерный уровень - Купить нивелир - Купить шлифмашину - Купить электрорубанок - Купить точильный камень - Купить керхер - Купить воздуходувку - Купить ножницы по металлу - Купить плиткорез - Купить электротример - Купить станок для заточки - Купить сабельную пилу - Купить миксер строительный - Купить ударный гайковерт - Купить рейсмусовый станок - Купить шлифовальную машину - Купить компрессор для покраски - Купить инструмент для заточки ножей - Купить бензиновую воздуходувку`,
      meta: [
        {
          name: "robots",
          content: "index, follow",
        },
        {
          name: "description",
          content: `Купити ${breadcrumb[2].name} у SAW STORE. Спеціальні пропозиції та знижки на професійний електроінструмент. Обирайте якість за найкращою ціною.`,
        },
        {
          name: "keywords",
          content: `${breadcrumb[2].name}, SAW STORE, знижки, професійний електроінструмент, спеціальні пропозиції, вигідні умови`,
        },
      ],
    });
  } catch (error) {
    console.error("Ошибка:", error);
    showLoader.value = false;
  }
});

async function goToProduct(productId, name) {
  router.push(
    `/products/${category}/${sub_category}/${productId}?pixel=${route.query.pixel}`
  );
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 150px 0 150px 0;
  position: relative;
}
.product__wrapper {
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

@media screen and (max-width: 1199px) {
  .product__wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 991px) {
  .wrapper {
    padding: 100px 0;
  }
  .product__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .product__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
