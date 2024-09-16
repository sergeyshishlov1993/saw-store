<template>
  <div class="modal__sucses">
    <ui-text-h3 v-if="notificationText == 'cart'"
      >Дякуємо за замовлення ! <br />
      Cкоро наш менеджер з Вами звʼяжеться для підтвердження</ui-text-h3
    >

    <ui-text-h3 v-if="notificationText == 'feedback'">
      Cкоро наш менеджер з Вами звʼяжеться</ui-text-h3
    >
  </div>
</template>

<script setup>
import UiTextH3 from "~/components/Ui/UiTextH3.vue";
const props = defineProps({
  notificationText: String,
});
</script>

<style lang="scss" scoped>
.modal__sucses {
  padding: 50px 20px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background: ghostwhite;
  h2 {
    font-weight: 500;
    line-height: 30px;
    text-align: center;
  }
}

@media screen and (max-width: 991px) {
  .modal__sucses {
    h2 {
      font-size: 20px;
      line-height: 20px;
    }
  }
}

@media screen and (max-width: 767px) {
  .modal__sucses {
    h2 {
      font-size: 16px;
      line-height: 20px;
    }
  }
}
</style>
