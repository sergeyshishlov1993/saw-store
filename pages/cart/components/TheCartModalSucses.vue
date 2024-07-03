<template>
  <div class="modal__sucses">
    <ui-text-h3
      >Дякуємо за замовлення ! <br />
      Cкоро наш менеджер з Вами звʼяжеться для підтвердження</ui-text-h3
    >
  </div>
</template>

<script setup>
import UiTextH3 from "~/components/Ui/UiTextH3.vue";
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
</style>
