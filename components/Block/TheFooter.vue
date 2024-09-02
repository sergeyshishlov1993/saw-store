<template>
  <div class="footer">
    <div class="logo">
      <icon-logo />

      <div class="mobile__footer">
        <icon-phone />
        <h2>
          <a href="tel:+380999999999">+380999999999</a>
        </h2>
      </div>
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
import IconLogo from "~/assets/icons/IconLogo.vue";
import IconLogoBlack from "~/assets/icons/IconLogoBlack.vue";
import iconIntertool from "~/assets/icons/iconIntertool.vue";

import UiTextH5 from "../Ui/UiTextH5.vue";
import IconPhone from "~/assets/icons/IconPhone.vue";
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
    width: 100%;
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

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile__footer {
  display: none;
}

.intertool {
  padding: 2px;
  background: #ffffff;
}

@media screen and (max-width: 767px) {
  .footer {
    padding: 10px;
    flex-direction: column;
    gap: 15px;
    align-items: baseline;

    svg {
      width: 130px;
    }

    ul {
      flex-wrap: wrap;
      gap: 10px;
      justify-content: space-evenly;

      img {
        width: 100px;
      }

      svg {
        width: 100px;
      }
    }

    .logo {
      width: 100%;
    }
  }

  .mobile__footer {
    display: flex;
    align-items: center;
    gap: 5px;

    svg {
      width: 20px;
      filter: invert(1);
    }

    h2 {
      font-size: 13px;
    }

    a {
      color: white;
      &:hover {
        color: darkred;
      }
    }
  }
}
</style>
