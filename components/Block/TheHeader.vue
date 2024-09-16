<template>
  <div class="wrapper__headers">
    <div class="header">
      <div class="logo" @click="goHome">
        <icon-logo />
      </div>

      <div class="burger__wrapper">
        <icon-burger @click="openMobileMenu" />
      </div>

      <div class="header__wrapper">
        <ui-text-h5 @click="goToSales" style="color: red">АКЦІЯ</ui-text-h5>
        <ui-text-h5 @click="goToBestseller">ХІТ ПРОДАЖ</ui-text-h5>
        <ui-text-h5 @click="goToAbout">ПРО НАС</ui-text-h5>
        <ui-text-h5 @click="goToBuyersPage">ПОКУПЦЯМ</ui-text-h5>
      </div>

      <div class="header__phone">
        <the-drop-down-feedback />
      </div>
    </div>

    <div class="search" v-if="!isAdmin">
      <button @click="showMenu" class="search__btn_catalog">
        <icon-catalog />
        Каталог товарів
      </button>

      <div class="input">
        <input
          type="search"
          placeholder="Пошук"
          @input="handleInputValue"
          :value="search.query"
        />

        <button @click="goToSearchPage" :disabled="!search.query">
          <icon-search />
        </button>
      </div>

      <div
        class="search_card_wrapper"
        v-if="search.showSearchCart"
        @click="search.closeSearchCart"
      >
        <ui-text-h3>
          Результат пошуку
          <span style="font-size: 18px; font-weight: 600">{{
            search.totalItems
          }}</span>
          товарів</ui-text-h3
        >

        <the-search-card
          v-for="product in search.products.slice(0, 5)"
          :key="product.product_id"
          :name="product.product_name"
          :price="product.price"
          :path="product.pictures"
          @click="
            goToProduct(
              product.sub_category_id,
              product.product_id,
              product.product_name
            )
          "
        />
      </div>

      <div class="cart__wrapper" @click="goToCart">
        <icon-cart />

        <div class="cart__counter">
          <h6>{{ state.productsInСart.length }}</h6>
        </div>
      </div>
    </div>

    <div
      :class="{ substrate: visibilityStore.showMobileMenu }"
      @click="closeVisibilityMenu"
    ></div>

    <div class="mobile__wrapper" v-if="visibilityStore.showMobileMenu">
      <mobile-header />
    </div>

    <div @click="visibilityStore.showCatalogNav = false">
      <category-subcategory-list v-if="visibilityStore.showCatalogNav" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useOtherData } from "~/stores/otherData";
import { useCartData } from "~/stores/cartData";
import { useRouter, useRoute } from "vue-router";
import UiTextH3 from "../Ui/UiTextH3.vue";
import UiTextH5 from "../Ui/UiTextH5.vue";
import IconLogo from "~/assets/icons/IconLogo.vue";
import IconCart from "~/assets/icons/IconCart.vue";
import IconSearch from "~/assets/icons/IconSearch.vue";
import IconCatalog from "~/assets/icons/IconCatalog.vue";
import IconBurger from "~/assets/icons/IconBurger.vue";
import CategorySubcategoryList from "./CategorySubcategoryList.vue";
import TheSearchCard from "./TheSearchCard.vue";
import TheDropDownFeedback from "./TheDropDownFeedback.vue";
import MobileHeader from "./MobileHeader.vue";

import { useSearchData } from "~/stores/searchData";
const search = useSearchData();
const { state } = useCartData();
const { visibilityStore } = useOtherData();
const router = useRouter();
const route = useRoute();
const isAdmin = ref(route.path.startsWith("/admin"));

watch(
  () => visibilityStore.showCatalogNav,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

async function handleInputValue(event) {
  search.query = event.target.value;

  await search.searchProducts();
}

function showMenu() {
  visibilityStore.showCatalogNav = !visibilityStore.showCatalogNav;
}

function openMobileMenu() {
  visibilityStore.showMobileMenu = !visibilityStore.showMobileMenu;
  document.body.style.overflow = visibilityStore.showMobileMenu
    ? "hidden"
    : "auto";
  document.body.style.height = visibilityStore.showMobileMenu ? "100%" : "auto";
}

function closeVisibilityMenu() {
  visibilityStore.showMobileMenu = false;
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
}

function goToProduct(sub, id, name) {
  router.push(`/products/tools/${sub}/${id}?product=${name}`);
  search.closeSearchCart();
}

function goHome() {
  router.push("/");
  visibilityStore.showCatalogNav = false;
  search.closeSearchCart();
}

function goToBestseller() {
  router.push("/bestseller?category=Хіт продажу");
  visibilityStore.showCatalogNav = false;
}

function goToSales() {
  router.push("/sale?category=Акція");
  visibilityStore.showCatalogNav = false;
}

function goToAbout() {
  router.push("/about?about=Про нас");
  visibilityStore.showCatalogNav = false;
}

function goToBuyersPage() {
  router.push("/buyer?buyer=Покупцям");
  visibilityStore.showCatalogNav = false;
}

function goToSearchPage() {
  router.push("/search?category=Пошук");
}

function goToCart() {
  router.push("/cart?cart=Кошик");
  visibilityStore.showCatalogNav = false;
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
  padding: 0 15px;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-evenly;
  background: rgba(255, 255, 255, 1);
  height: 76px;
  z-index: 100;

  svg {
    height: 30px;
  }

  &__btn_catalog {
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

  &_card_wrapper {
    position: absolute;
    top: 220px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    overflow-y: auto;
    width: 100%;
    height: 100vh;
    align-items: center;

    h2 {
      padding: 5px;
      background: white;
      width: 100%;
      text-align: center;
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

.burger__wrapper {
  display: none;

  svg {
    width: 25px;
  }
}

.mobile__wrapper {
  position: absolute;
  top: 88px;
  left: 0;
  background-color: #fff;
  z-index: 10;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.substrate {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

@media screen and (max-width: 1439px) {
  .logo {
    width: 200px;
  }

  .header__wrapper {
    padding-top: 0;
    gap: 20px;
  }
}

@media screen and (max-width: 1199px) {
  .header__wrapper {
    h2 {
      font-size: 12px;
      width: 100px;
    }
  }

  .search_card_wrapper {
    top: 189px;
    gap: 2px;
    line-height: 20px;
  }
}

@media screen and (max-width: 1023px) {
  .search_card_wrapper {
    top: 186px;
  }
}

@media screen and (max-width: 991px) {
  .header__wrapper {
    display: none;
  }

  .input {
    width: 500px !important;
  }

  .header__phone {
    display: none;
  }

  .burger__wrapper {
    display: block;
  }

  .search {
    &__btn_catalog {
      display: none;
    }

    &_card_wrapper {
      top: 190px;
      gap: 0;
    }
  }
}

@media screen and (max-width: 767px) {
  .header {
    padding: 10px;
  }

  .logo {
    width: 150px;
  }

  .input {
    height: 40px;
  }

  .search {
    padding: 0 10px;

    &_card_wrapper {
      top: 146px;
    }

    .cart__wrapper {
      .cart__counter {
        top: -8px;
        width: 15px;
        height: 15px;

        h6 {
          font-size: 12px;
        }
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .header {
    padding: 10px;
  }

  .logo {
    width: 150px;
  }
}

.mobile__wrapper {
  width: 100%;
}

@media (hover: none) {
  .header__wrapper h2:hover {
    background-color: initial;
    color: initial;
  }
}
</style>
