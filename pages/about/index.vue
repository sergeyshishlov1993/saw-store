<template>
  <div class="container">
    <div class="about__wrapper">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <ui-text-h1 class="title">Про нас</ui-text-h1>
      <div class="about__wrapper_text">
        <icon-logo class="logo" />

        <div class="about__wrapper_text_description">
          <ui-text-h3> Вітаю ! </ui-text-h3>

          <ui-text-h3>
            Ми інтернет магазин електроінструменту SAW STORE працюємо на ринку з
            2016 року, маємо багато задоволеніх кліентів, займаємось продажем
            бензо- і електроінструментів, будівельного устаткування і верстатів
            різного функціоналу.

            <br />
            надаємо гарантію від виробника та персональні та сезоні знижки
          </ui-text-h3>

          <ui-text-h3> Працюємо з такими брендами як : </ui-text-h3>

          <ul>
            <li>
              <img
                src="https://procraft.ua/image/catalog/news/xlogo.png.pagespeed.ic.ZqXzq0Qu2D.png"
                alt="PROCRAFT"
              />
            </li>

            <li>
              <img
                src="https://vegapro.com.ua/image/catalog/logo.svg"
                alt=" VEGA"
              />
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

            <li>
              <iconIntertool />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import IconLogo from "~/assets/icons/IconLogo.vue";
import UiTextH1 from "~/components/Ui/UiTextH1.vue";
import UiTextH3 from "~/components/Ui/UiTextH3.vue";
import iconIntertool from "../../assets/icons/iconIntertool.vue";
import IconLogoBlack from "~/assets/icons/IconLogoBlack.vue";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";

const route = useRoute();

const breadcrumb = ref([
  { name: "Головна", path: "/" },

  {
    name: route.query.about,
    path: `${route.path}?about=${route.query.about}`,
  },
]);

useHead({
  title:
    "SAW STORE - Інтернет магазин професійного електроінструменту - Професійний та доступний електроінструмент - SAW STORE - Вибір професіоналів - Надійний електроінструмент для будь-яких задач - SAW STORE - Інструмент, на який можна покластися - Висока якість за доступною ціною - SAW STORE - Електроінструменти, які працюють за вас - Професійні рішення для кожного - SAW STORE - Технології, що надихають - Професійний електроінструмент для вашого бізнесу - SAW STORE - Якість, перевірена часом - Надійний інструмент для професіоналів та аматорів",
  meta: [
    {
      name: "robots",
      content: "index, follow",
    },
  ],
});
</script>

<style lang="scss" scoped>
.about__wrapper {
  padding-top: 200px;

  &_text {
    &_description {
      display: flex;
      flex-direction: column;

      h2 {
        line-height: 35px;
      }

      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      img {
        width: 220px;
      }

      svg {
        width: 220px;
      }
    }
  }
}

.title {
  font-weight: 700;
  text-align: center;
}
.logo {
  width: 75%;
  fill: black;
}

.breadcrumb-item {
  a {
    color: black;
  }
}

.active {
  color: rgb(144, 5, 5);
}

@media screen and (max-width: 991px) {
  .about__wrapper {
    padding-top: 100px;

    &_text {
      .logo {
        width: 50%;
      }

      &_description {
        h2 {
          font-size: 16px;
        }

        ul {
          flex-wrap: wrap;
          li {
            img,
            svg {
              width: 150px;
            }
          }
        }
      }
    }
  }

  .title {
    font-size: 20px;
    line-height: 30px;
  }
}

@media screen and (max-width: 767px) {
  .about__wrapper_text_description {
    h2 {
      font-size: 14px;
      line-height: 20px;
    }

    ul {
      li {
        img,
        svg {
          width: 120px;
        }
      }
    }
  }
}
</style>
