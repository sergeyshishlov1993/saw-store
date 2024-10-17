<template>
  <div class="mobile">
    <div class="mobile__category">
      <mobile-category-subcategory-list />
    </div>

    <div class="mobile__navigation">
      <ui-text-h4 style="color: red" @click="goToSales">Акція</ui-text-h4>
      <ui-text-h4 @click="goToBestseller">Хіт продажу</ui-text-h4>
      <ui-text-h4 @click="goToAbout">Про нас</ui-text-h4>
      <ui-text-h4 @click="goToBuyersPage">Покупцям</ui-text-h4>
    </div>

    <div class="mobile__footer">
      <icon-phone />
      <ui-text-h4>
        <a href="tel:+380682363071">+380-68-236-30-71</a>
      </ui-text-h4>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useOtherData } from "~/stores/otherData";
import MobileCategorySubcategoryList from "./MobileCategorySubcategoryList.vue";
import UiTextH4 from "../Ui/UiTextH4.vue";
import IconPhone from "~/assets/icons/IconPhone.vue";

const { visibilityStore } = useOtherData();

const router = useRouter();

function goToBestseller() {
  router.push("/bestseller?category=Хіт продажу");
  visibilityStore.showMobileMenu = false;
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
}

function goToSales() {
  router.push("/sale?category=Акція");
  visibilityStore.showMobileMenu = false;
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
}

function goToAbout() {
  router.push("/about?about=Про нас");
  visibilityStore.showMobileMenu = false;
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
}

function goToBuyersPage() {
  router.push("/buyer?buyer=Покупцям");
  visibilityStore.showMobileMenu = false;
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
}
</script>

<style lang="scss" scoped>
.mobile {
  padding: 20px;
  background-color: #fff;
  width: 350px;
  border-radius: 0 0 20px 20px;
  min-height: 300px;
  max-height: 100vh;

  overflow-y: auto;

  &__category {
    display: flex;
    flex-direction: column;
    gap: 15px;

    border-bottom: 1px solid rgb(214, 203, 203);
  }

  &__navigation {
    padding: 15px 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    border-bottom: 1px solid rgb(214, 203, 203);

    h2 {
      cursor: pointer;

      @media (hover: hover) {
        &:hover {
          color: darkred;
          font-weight: 500;
        }
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    padding-top: 50px;
    gap: 5px;

    svg {
      width: 30px;
    }

    a {
      color: black;

      @media (hover: hover) {
        &:hover {
          color: darkred;
        }
      }
    }
  }
}

@media screen and (max-width: 374px) {
  .mobile {
    width: 100%;
  }
}
</style>
