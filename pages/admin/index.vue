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
            >{{ tab.name }}

            <span v-if="tab.count" class="tab-count">({{ tab.count }})</span>
          </the-tabs>
        </div>

        <section-products v-if="currentTab == 'Товари'" />
        <section-category v-if="currentTab == 'Категоріі товару'" />
        <section-reviews v-if="currentTab == 'Відгуки'" />
        <section-feed-back
          v-if="currentTab == 'Зворотній звʼязок'"
          @count="calcCount"
        />
        <section-order v-if="currentTab == 'Замовлення'" @count="calcCount" />
        <section-add-product v-if="currentTab == 'Додати товар'" />
        <section-main-slider v-if="currentTab == 'Головний слайдер'" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SectionProducts from "./sections/SectionProducts.vue";
import SectionCategory from "./sections/SectionCategory.vue";
import SectionReviews from "./sections/SectionReviews.vue";
import SectionFeedBack from "./sections/SectionFeedBack.vue";
import SectionOrder from "./sections/SectionOrder.vue";
import SectionAddProduct from "./sections/SectionAddProduct.vue";
import SectionMainSlider from "./sections/SectionMainSlider.vue";
import TheTabs from "~/components/Block/TheTabs.vue";
import LoginAdmin from "./components/LoginAdmin.vue";
import axios from "axios";

const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;
const isAuth = ref(false);
const currentTab = ref("Зворотній звʼязок");
const tabs = ref([
  { name: "Зворотній звʼязок", count: 0 },
  { name: "Товари" },
  { name: "Додати товар" },
  { name: "Категоріі товару" },
  { name: "Замовлення", count: 0 },
  { name: "Відгуки", count: 0 },
  { name: "Головний слайдер" },
]);

onMounted(() => {
  calcScrinWidth();
  getCountChangeableValue();
});

const calcScrinWidth = () => {
  if (typeof window !== "undefined") {
    const screenWidth = window.innerWidth;

    if (screenWidth < 992) {
      tabs.value = [
        { name: "Зворотній звʼязок" },
        { name: "Замовлення" },
        { name: "Відгуки" },
      ];
    }
  }
};

function changeTab(name) {
  currentTab.value = name;
}

async function getCountChangeableValue() {
  try {
    const [feedbackResponse, ordersResponse, reviews, reviewResponses] =
      await Promise.all([
        axios.get(`${apiUrl}/feedback/all`),
        axios.get(`${apiUrl}/order/all-orders`),
      ]);

    tabs.value[0].count = feedbackResponse.data.feedback.reduce(
      (acc, el) => (el.status === "Нове" ? acc + 1 : acc),
      0
    );

    tabs.value[4].count = ordersResponse.data.orders.reduce(
      (acc, el) => (el.status === "нове" ? acc + 1 : acc),
      0
    );
  } catch (error) {
    console.error("Помилка отримання даних:", error);
  }
}

function calcCount(name, countValue) {
  const tabIndex = name === "feedback" ? 0 : name === "orders" ? 4 : null;
  if (tabIndex !== null) {
    tabs.value[tabIndex].count = countValue;
  }
  console.log("name", name, "count", countValue);
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
