<template>
  <div class="action">
    <ui-text-h1>АКЦІЯ</ui-text-h1>

    <div class="action__wrapper">
      <the-product-card
        v-for="product in discontProduct.slice(0, 8)"
        :key="product.product_id"
        :path="product.pictures[product.pictures.length - 1].pictures_name"
        :title="product.product_name"
        :price="product.price"
        :promotionalPrice="product.sale_price"
        :discount="product.discount"
        @buy-product="addProductToCart(product, product.product_id)"
        @click="
          goToProducts(
            product.sub_category_id,
            product.product_id,
            product.product_name
          )
        "
      />
    </div>

    <button @click="goToDiscountProposable">БІЛЬШЕ АКЦІЙНИХ ПРОПОЗИЦІЙ</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import TheProductCard from "../../components/Block/TheProductCard.vue";
import axios from "axios";
import UiTextH1 from "../../components/Ui/UiTextH1.vue";
import { useCartData } from "~/stores/cartData";
import useScrollToTop from "~/utils/useScrollToTop";
const { addProductToCart } = useCartData();
const { scrollToTop } = useScrollToTop();
const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;
const discontProduct = ref([]);

onMounted(async () => {
  await getPromotionalItem();
});

async function getPromotionalItem() {
  try {
    const response = await axios.get(`${apiUrl}/sale`);

    discontProduct.value = response.data.sale;
  } catch (error) {
    console.error("сталась помилка:", error);
  }
}

const goToProducts = (category, id, name) => {
  router.push(`/products/sale/${category}/${id}`);
};

const goToDiscountProposable = () => {
  router.push("/sale?category=Акція");
};
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 86px;

  h2 {
    color: darkred;
    font-weight: 700;
  }
  &__wrapper {
    margin-top: 30px;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
  }

  button {
    margin: 0 auto;
    width: 300px;
    height: 60px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 20px;
    box-shadow: 0px 2px 6px rgb(0 0 0 / 8%);

    @media (hover: hover) {
      &:hover {
        box-shadow: -1px 2px 20px -6px rgba(0, 0, 0, 0.75);
        background: darkred;
        color: white;
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  .action__wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 991px) {
  .action__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .action {
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    button {
      width: 250px;
      height: 40px;
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 767px) {
  .action {
    margin-top: 40px;
  }
}
</style>
