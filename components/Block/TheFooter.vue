<template>
  <div class="footer">
    <div class="logo">
      <icon-logo />
    </div>

    <ul>
      <li>
        <img
          src="https://procraft.ua/image/catalog/news/xlogo.png.pagespeed.ic.ZqXzq0Qu2D.png"
          alt="PROCRAFT"
        />
      </li>

      <li>
        <img src="https://vegapro.com.ua/image/catalog/logo.svg" alt=" VEGA" />
      </li>

      <li>
        <img
          src="https://makita-ua.com.ua/sites/default/files/makita-ukraine-logo.svg"
          alt="MAKITA"
        />
      </li>

      <li>
        <icon-logo-black />
      </li>

      <li class="intertool">
        <iconIntertool />
      </li>
    </ul>
  </div>
</template>

<script setup>
import UiTextH3 from "../Ui/UiTextH3.vue";
import UiTextH5 from "../Ui/UiTextH5.vue";
import IconLogo from "~/assets/icons/IconLogo.vue";
import IconLogoBlack from "~/assets/icons/IconLogoBlack.vue";
import iconIntertool from "~/assets/icons/iconIntertool.vue";
</script>

<style lang="scss" scoped>
.footer {
  padding: 50px;
  width: 100%;

  display: flex;
  align-items: center;
  flex-shrink: 0;
  background: #000;
  z-index: 1;
  gap: 75px;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    img {
      width: 200px;
    }

    svg {
      width: 200px;
    }
  }
}

.logo {
  width: 250px;
}

.intertool {
  padding: 2px;
  background: #ffffff;
}
</style>
