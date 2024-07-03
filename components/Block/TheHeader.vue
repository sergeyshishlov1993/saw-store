<template>
  <div class="wrapper__headers">
    <div class="header">
      <div class="logo" @click="goHome">
        <icon-logo />
      </div>

      <div class="header__wrapper">
        <ui-text-h5 @click="goToSales" style="color: red">АКЦІЇ</ui-text-h5>
        <ui-text-h5 @click="goToBestseller">ХІТ ПРОДАЖ</ui-text-h5>
        <ui-text-h5 @click="goToAbout">ПРО НАС</ui-text-h5>
        <ui-text-h5 @click="goToBuyersPage">ПОКУПЦЯМ</ui-text-h5>
      </div>

      <div class="header__phone">
        <the-drop-down-feedback />
      </div>
    </div>

    <div class="search" v-if="!isAdmin">
      <button @click="showMenu">
        <icon-catalog />
        Каталог товарів
      </button>

      <div class="input">
        <input
          type="search"
          placeholder="Пошук"
          :value="query"
          @input="(event) => searchProducts(event)"
        />
        <icon-search />
      </div>

      <div class="search_card_wrapper">
        <the-search-card
          v-for="product in products"
          :key="product.product_id"
          :name="product.product_name"
          :price="product.price"
          :path="product.pictures"
          @click="goToProduct(product.sub_category_id, product.product_id)"
        />
      </div>

      <div class="cart__wrapper" @click="goToCart">
        <icon-cart />

        <div class="cart__counter">
          <h6>{{ productsInСart.length }}</h6>
        </div>
      </div>
    </div>

    <the-catalog-menu v-if="store.showCatalogNav" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useOtherData } from "~/stores/otherData";
import { useCartData } from "~/stores/cartData";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import UiTextH5 from "../Ui/UiTextH5.vue";
import IconLogo from "~/assets/icons/IconLogo.vue";
import IconCart from "~/assets/icons/IconCart.vue";
import IconSearch from "~/assets/icons/IconSearch.vue";
import IconCatalog from "~/assets/icons/IconCatalog.vue";
import TheCatalogMenu from "./TheCatalogMenu.vue";
import TheSearchCard from "./TheSearchCard.vue";
import TheDropDownFeedback from "./TheDropDownFeedback.vue";

const store = useOtherData();
const router = useRouter();
const route = useRoute();
const isAdmin = ref(route.path.startsWith("/admin"));
const { productsInСart } = useCartData();

function showMenu() {
  store.showCatalogNav = !store.showCatalogNav;
}

const query = ref("");
const products = ref([]);

const searchProducts = async (event) => {
  query.value = event.target.value;

  try {
    const response = await axios.get("http://localhost:8000/products/search", {
      params: { search: query.value },
    });

    products.value = await response.data.products;

    if (!query.value.length) {
      products.value = [];
    }
  } catch (error) {
    console.error("сталась помилка");
  }
};

function goToProduct(sub, id) {
  router.push(`/products/tools/${sub}/${id}`);
  query.value = "";
  products.value = [];
}

function goHome() {
  router.push("/");
  store.showCatalogNav = false;
}

function goToBestseller() {
  router.push("/bestseller");
  store.showCatalogNav = false;
}

function goToSales() {
  router.push("/sale");
  store.showCatalogNav = false;
}

function goToAbout() {
  router.push("/about");
  store.showCatalogNav = false;
}

function goToBuyersPage() {
  router.push("/buyer");
  store.showCatalogNav = false;
}

function goToCart() {
  router.push("/cart");
  store.showCatalogNav = false;
}
</script>

<style lang="scss" scoped>
.wrapper__headers {
  position: fixed;
  top: 0;
  width: 100%;

  z-index: 100;
}

.header {
  position: relative;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: #000;
  z-index: 1;

  &__wrapper {
    padding-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 68px;
    h2 {
      width: 150px;
      text-align: center;
      color: white;
      cursor: pointer;
      transition: color 0.3s ease, font-weight 0.3s ease, font-size 0.3s ease;

      &:hover {
        color: rgb(203, 24, 24);
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
  &__phone {
    width: 250px;
  }
}

.search {
  position: relative;
  padding: 0 15px;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-evenly;
  background: rgba(255, 255, 255, 1);
  height: 76px;
  svg {
    height: 30px;
  }
  button {
    padding: 16px 45px 16px 25px;
    background: rgba(144, 5, 5, 1);
    width: 220px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 14px;
    font-weight: 600;
    color: white;
  }
  .input {
    padding: 16px;
    display: flex;
    align-items: center;
    width: 600px;
    background: rgba(238, 238, 238, 1);
    border-radius: 10px;

    input {
      width: 100%;
    }

    svg {
      height: 30px;
    }
  }

  .cart__wrapper {
    position: relative;

    .cart__counter {
      position: absolute;
      top: -10px;
      right: 0px;
      width: 20px;
      height: 20px;
      background: rgba(144, 5, 5, 1);
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      h6 {
        padding: 0;
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        color: white;
      }
    }
  }
}

.logo {
  width: 250px;
}

.search_card_wrapper {
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: absolute;
  top: 76px;
}
</style>
