<template>
  <div class="container">
    <div class="info__wrapper">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <ui-text-h1 class="title">Доставка і оплата</ui-text-h1>

      <div class="info__wrapper_text">
        <ui-text-h2
          >Доставку ми здійснюємо через перевізника «Нова Пошта»</ui-text-h2
        >

        <buyer-card
          v-for="card in cardData"
          :key="card.title"
          :title="card.title"
          :text="card.text"
        />
      </div>

      <div class="info__wrapper_text">
        <ui-text-h2>Умови доставки</ui-text-h2>

        <buyer-card
          v-for="card in cardDataDelivery"
          :key="card.title"
          :title="card.title"
          :text="card.text"
        />
      </div>

      <div class="info__wrapper_text">
        <ui-text-h2>Повернення товару</ui-text-h2>

        <ul class="card">
          <span>Загальні умови повернення товару:</span>
          <li>
            Минуло менше 14-ти календарний днів з дня покупки (дати видачі чека)
          </li>

          <li>Ви зберегли товарний або касовий чек</li>

          <li>Товар не використовувався</li>

          <li>
            Інструмент упакований в заводську упаковку - відповідну купленому
            товарі
          </li>

          <li>На товар присутні всі маркування і заводські пломби</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import UiTextH1 from "~/components/Ui/UiTextH1.vue";
import UiTextH2 from "~/components/Ui/UiTextH2.vue";
import BuyerCard from "./components/BuyerCard.vue";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";

const route = useRoute();

const cardData = [
  {
    title: "У відділення",
    text: "Доставка на відділення або поштомат Нової пошти, безкоштовна доставка від 3000 ₴",
  },

  {
    title: "Кур'єром",
    text: "Доставка Кур'єром здійснюється за рахунок покупця.",
  },
];

const cardDataDelivery = [
  {
    title: "Готівковий розрахунок",
    text: `Оплатити товар готівкою можна при доставці кур'єром або в будь-якому відділенні «Нова пошта» післяплатою.`,
  },
];

const breadcrumb = ref([
  { name: "Головна", path: "/" },

  {
    name: route.query.buyer,
    path: `${route.path}?buyer=${route.query.buyer}`,
  },
]);
</script>

<style lang="scss" scoped>
.info__wrapper {
  padding-top: 200px;

  &_text {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    gap: 40px;

    ul {
      padding: 30px;
      border-radius: 20px;
      span {
        font-weight: 700;
      }
      li {
        list-style: disc;
        margin-top: 15px;
      }
    }
  }
}

.title {
  text-align: center;
  font-weight: 700;
}

@media screen and (max-width: 991px) {
  .info__wrapper {
    padding-top: 100px;

    &_text {
      margin-top: 50px;
      gap: 20px;
      h2 {
        font-size: 16px;
      }

      ul {
        span {
          font-size: 14px;
        }

        li {
          font-size: 13px;
        }
      }
    }
  }

  .title {
    margin-top: 30px;
    font-size: 20px;
  }
}

@media screen and (max-width: 767px) {
  .info__wrapper {
    padding-top: 50px;
  }
}
</style>
