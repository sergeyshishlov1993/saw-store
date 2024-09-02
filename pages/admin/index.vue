<template>
  <div class="container">
    <div class="wrapper" v-if="!isAuth">
      <login-admin class="login" @auth="checkAuthAdmin" />
    </div>

    <transition name="fade" v-else>
      <div class="admin">
        <div class="tabs">
          <the-tabs
            v-for="tab in tabs"
            :key="tab.name"
            @click="changeTab(tab.name)"
            :selectedTab="currentTab"
            :name="tab.name"
            >{{ tab.name }}</the-tabs
          >
        </div>

        <section-products v-if="currentTab == 'Товари'" />
        <section-category v-if="currentTab == 'Категоріі товару'" />
        <section-reviews v-if="currentTab == 'Відгуки'" />
        <section-feed-back v-if="currentTab == 'Зворотній звʼязок'" />
        <section-order v-if="currentTab == 'Замовлення'" />
        <section-add-product v-if="currentTab == 'Додати товар'" />
        <section-main-slider v-if="currentTab == 'Головний слайдер'" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import SectionProducts from "./sections/SectionProducts.vue";
import SectionCategory from "./sections/SectionCategory.vue";
import SectionReviews from "./sections/SectionReviews.vue";
import SectionFeedBack from "./sections/SectionFeedBack.vue";
import SectionOrder from "./sections/SectionOrder.vue";
import SectionAddProduct from "./sections/SectionAddProduct.vue";
import SectionMainSlider from "./sections/SectionMainSlider.vue";
import TheTabs from "~/components/Block/TheTabs.vue";
import LoginAdmin from "./components/LoginAdmin.vue";

const isAuth = ref(false);
const currentTab = ref("Зворотній звʼязок");
const tabs = ref([
  { name: "Зворотній звʼязок" },
  { name: "Товари" },
  { name: "Додати товар" },
  { name: "Категоріі товару" },
  { name: "Замовлення" },
  { name: "Відгуки" },
  { name: "Головний слайдер" },
]);

onMounted(() => {
  calcScrinWidth();
});

const calcScrinWidth = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth < 992) {
    return (tabs.value = [
      { name: "Зворотній звʼязок" },
      { name: "Замовлення" },
      { name: "Відгуки" },
    ]);
  }
};

function changeTab(name) {
  currentTab.value = name;
}

function checkAuthAdmin(value) {
  isAuth.value = value;
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
}

.login {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: calc(50% - 200px);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.18);
  border-radius: 20px;
}
.admin {
  padding-top: 50px;
}
.tabs {
  position: relative;
  padding: 64px 0 34px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 70px;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 991px) {
  .login {
    top: calc(50% - 185px);
  }

  .tabs {
    gap: 40px;
  }
}
</style>
