<template>
  <div class="modal__empty">
    <ui-text-h2> Замовленнь немає ! </ui-text-h2>
  </div>
</template>

<script setup>
import UiTextH2 from "~/components/Ui/UiTextH2.vue";
</script>

<style lang="scss" scoped>
.modal__empty {
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
