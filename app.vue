<template>
  <div class="layout">
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-KNBJTMTM"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe>
    </noscript>

    <noscript>
      <img
        height="1"
        width="1"
        style="display: none"
        src="https://www.facebook.com/tr?id=2155287528259777&ev=PageView&noscript=1"
      />
    </noscript>

    <the-header />

    <the-cart-modal v-if="state.showModalWindow" @change-state="closeModal" />

    <NuxtPage />

    <icon-chevron class="chevron" v-if="showScrollToTop" @click="scrollToTop" />

    <the-form-feedback titleForm="ПОТРІБНА КОНСУЛЬТАЦІЯ?" />
    <the-footer />
  </div>
</template>

<script setup>
import { onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import TheHeader from "./components/Block/TheHeader.vue";
import { useCategorySubCategory } from "./stores/category_subCategory";
import { useCartData } from "~/stores/cartData";
import TheFooter from "./components/Block/TheFooter.vue";
import IconChevron from "./assets/icons/IconChevron.vue";
import TheFormFeedback from "./components/Block/TheFormFeedback.vue";
import TheCartModal from "./components/Block/TheCartModal.vue";
import useScrollToTop from "./utils/useScrollToTop";

import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";
const imageUrl = new URL(`./public/img/IMG_8377.jpg`, import.meta.url).href;

const router = useRouter();
const { showScrollToTop, scrollToTop } = useScrollToTop();
const { closeModal, state } = useCartData();
const {
  fetchCategoriesAndSubCategories,
  subCategory,
  addCategoryToBreadcrumb,
} = useCategorySubCategory();

onMounted(async () => {
  await fetchCategoriesAndSubCategories();

  watchEffect(() => {
    if (state.showModalWindow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
});

useSeoMeta({
  title:
    "SAW STORE - Інтернет магазин професійного електроінструменту - Професійний та доступний електроінструмент - SAW STORE - Вибір професіоналів - Надійний електроінструмент для будь-яких задач - SAW STORE - Інструмент, на який можна покластися - Висока якість за доступною ціною - SAW STORE - Електроінструменти, які працюють за вас - Професійні рішення для кожного - SAW STORE - Технології, що надихають - Професійний електроінструмент для вашого бізнесу - SAW STORE - Якість, перевірена часом - Надійний інструмент для професіоналів - Купити еклектроінструмент - Купити акумуляторній інструмент - Купить болгарку - Купить шуруповерт - Купить дрель - Купить секатор - Купить инвертор - Купить электролобзик - Купить генератор - Купить мотоблок - Купить перфоратор - Купить сварочный аппарат - Купить бензопилу - Купить рубанок - Купить триммер - Купить отбойный молоток - Купить фрезер - Купить циркулярную пилу - Купить плиткорез - Купить компрессор - Купить пылесос - Купить гайковерт - Купить мультитул - Купить степлер - Купить лобзик - Купить виброшлифовальную машину - Купить торцовочную пилу - Купить точильный станок - Купить ленточную пилу - Купить газонокосилку - Купить электрический культиватор - Купить бензиновую косу - Купить клеймопистолет - Купить клеевой пистолет - Купить электрокосу - Купить цепную пилу - Купить ударную дрель - Купить угловую шлифовальную машину - Купить промышленный фен - Купить строительный миксер - Купить паяльник - Купить тепловую пушку - Купить мойку высокого давления - Купить распылитель краски - Купить токарный станок - Купить полировальную машину - Купить дисковую пилу - Купить аккумуляторную отвертку - Купить лазерный уровень - Купить нивелир - Купить шлифмашину - Купить электрорубанок - Купить точильный камень - Купить керхер - Купить воздуходувку - Купить ножницы по металлу - Купить плиткорез - Купить электротример - Купить станок для заточки - Купить сабельную пилу - Купить миксер строительный - Купить ударный гайковерт - Купить рейсмусовый станок - Купить шлифовальную машину - Купить компрессор для покраски - Купить инструмент для заточки ножей - Купить бензиновую воздуходувку",

  description:
    "SAW STORE - інтернет-магазин професійного електроінструменту. Пропонуємо якісний і доступний інструмент для будь-яких задач. Вибір професіоналів за доступними цінами!",

  keywords:
    "SAW STORE - Інтернет магазин професійного електроінструменту - Професійний та доступний електроінструмент - SAW STORE - Вибір професіоналів - Надійний електроінструмент для будь-яких задач - SAW STORE - Інструмент, на який можна покластися - Висока якість за доступною ціною - SAW STORE - Електроінструменти, які працюють за вас - Професійні рішення для кожного - SAW STORE - Технології, що надихають - Професійний електроінструмент для вашого бізнесу - SAW STORE - Якість, перевірена часом - Надійний інструмент для професіоналів - Купити еклектроінструмент - Купити акумуляторній інструмент - Купить болгарку - Купить шуруповерт - Купить дрель - Купить секатор - Купить инвертор - Купить электролобзик - Купить генератор - Купить мотоблок - Купить перфоратор - Купить сварочный аппарат - Купить бензопилу - Купить рубанок - Купить триммер - Купить отбойный молоток - Купить фрезер - Купить циркулярную пилу - Купить плиткорез - Купить компрессор - Купить пылесос - Купить гайковерт - Купить мультитул - Купить степлер - Купить лобзик - Купить виброшлифовальную машину - Купить торцовочную пилу - Купить точильный станок - Купить ленточную пилу - Купить газонокосилку - Купить электрический культиватор - Купить бензиновую косу - Купить клеймопистолет - Купить клеевой пистолет - Купить электрокосу - Купить цепную пилу - Купить ударную дрель - Купить угловую шлифовальную машину - Купить промышленный фен - Купить строительный миксер - Купить паяльник - Купить тепловую пушку - Купить мойку высокого давления - Купить распылитель краски - Купить токарный станок - Купить полировальную машину - Купить дисковую пилу - Купить аккумуляторную отвертку - Купить лазерный уровень - Купить нивелир - Купить шлифмашину - Купить электрорубанок - Купить точильный камень - Купить керхер - Купить воздуходувку - Купить ножницы по металлу - Купить плиткорез - Купить электротример - Купить станок для заточки - Купить сабельную пилу - Купить миксер строительный - Купить ударный гайковерт - Купить рейсмусовый станок - Купить шлифовальную машину - Купить компрессор для покраски - Купить инструмент для заточки ножей - Купить бензиновую воздуходувку",

  robots: "index, follow",

  ogTitle: "SAW STORE - Професійний електроінструмент",

  ogDescription:
    "Вибір професіоналів - Надійний електроінструмент для будь-яких задач",

  ogImage:
    "https://firebasestorage.googleapis.com/v0/b/myproject-b32a0.appspot.com/o/files%2Flogo.jpg?alt=media&token=657f2909-827f-42d2-9ff5-436f9448b6ff",

  ogUrl: "https://sawstore.com.ua/",
});

useHead({
  title:
    "SAW STORE - Інтернет магазин професійного електроінструменту - Професійний та доступний електроінструмент - SAW STORE - Вибір професіоналів - Надійний електроінструмент для будь-яких задач - SAW STORE - Інструмент, на який можна покластися - Висока якість за доступною ціною - SAW STORE - Електроінструменти, які працюють за вас - Професійні рішення для кожного - SAW STORE - Технології, що надихають - Професійний електроінструмент для вашого бізнесу - SAW STORE - Якість, перевірена часом - Надійний інструмент для професіоналів - Купити еклектроінструмент - Купити акумуляторній інструмент - Купить болгарку - Купить шуруповерт - Купить дрель - Купить секатор - Купить инвертор - Купить электролобзик - Купить генератор - Купить мотоблок - Купить перфоратор - Купить сварочный аппарат - Купить бензопилу - Купить рубанок - Купить триммер - Купить отбойный молоток - Купить фрезер - Купить циркулярную пилу - Купить плиткорез - Купить компрессор - Купить пылесос - Купить гайковерт - Купить мультитул - Купить степлер - Купить лобзик - Купить виброшлифовальную машину - Купить торцовочную пилу - Купить точильный станок - Купить ленточную пилу - Купить газонокосилку - Купить электрический культиватор - Купить бензиновую косу - Купить клеймопистолет - Купить клеевой пистолет - Купить электрокосу - Купить цепную пилу - Купить ударную дрель - Купить угловую шлифовальную машину - Купить промышленный фен - Купить строительный миксер - Купить паяльник - Купить тепловую пушку - Купить мойку высокого давления - Купить распылитель краски - Купить токарный станок - Купить полировальную машину - Купить дисковую пилу - Купить аккумуляторную отвертку - Купить лазерный уровень - Купить нивелир - Купить шлифмашину - Купить электрорубанок - Купить точильный камень - Купить керхер - Купить воздуходувку - Купить ножницы по металлу - Купить плиткорез - Купить электротример - Купить станок для заточки - Купить сабельную пилу - Купить миксер строительный - Купить ударный гайковерт - Купить рейсмусовый станок - Купить шлифовальную машину - Купить компрессор для покраски - Купить инструмент для заточки ножей - Купить бензиновую воздуходувку",

  link: [
    {
      rel: "image_src",
      content:
        "https://firebasestorage.googleapis.com/v0/b/myproject-b32a0.appspot.com/o/files%2Flogo.jpg?alt=media&token=657f2909-827f-42d2-9ff5-436f9448b6ff",
    },

    {
      hid: "preload",
      rel: "preload",
      as: "image",
      href: "https://firebasestorage.googleapis.com/v0/b/myproject-b32a0.appspot.com/o/files%2Flogo.jpg?alt=media&token=657f2909-827f-42d2-9ff5-436f9448b6ff",
    },
  ],

  script: [
    {
      hid: "gtm-script",
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KNBJTMTM');`,
      type: "text/javascript",
      charset: "utf-8",
    },

    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-5SQKZ924ND",
      async: true,
    },

    {
      hid: "google-analytics",
      innerHTML: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5SQKZ924ND');`,
      type: "text/javascript",
      charset: "utf-8",
    },

    {
      hid: "google-ads",
      innerHTML: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16713078315');`,
      type: "text/javascript",
      charset: "utf-8",
    },

    {
      innerHTML: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ojj8z0r0pq");`,
      type: "text/javascript",
      charset: "utf-8",
    },

    {
      hid: "fb-pixel",
      innerHTML: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2155287528259777');
      fbq('track', 'PageView');`,
      type: "text/javascript",
      charset: "utf-8",
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "SAW STORE - Інтернет магазин професійного електроінструменту",
        description:
          "SAW STORE - інтернет-магазин професійного електроінструменту. Пропонуємо якісний і доступний інструмент для будь-яких задач.",
        image:
          "https://firebasestorage.googleapis.com/v0/b/myproject-b32a0.appspot.com/o/files%2Flogo.jpg?alt=media&token=657f2909-827f-42d2-9ff5-436f9448b6ff",
        url: "https://www.sawstore.com.ua/",
        publisher: {
          "@type": "Organization",
          name: "SAW STORE",
          logo: {
            "@type": "ImageObject",
            url: "https://firebasestorage.googleapis.com/v0/b/myproject-b32a0.appspot.com/o/files%2Flogo.jpg?alt=media&token=657f2909-827f-42d2-9ff5-436f9448b6ff",
          },
        },
      }),
    },
  ],
  __dangerouslyDisableSanitizersByTagID: {
    clarity: ["innerHTML"],
  },
  __dangerouslyDisableSanitizers: ["script"],
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.container {
  flex-grow: 1;
}

.chevron {
  position: fixed;
  top: 600px;
  right: 25px;
  z-index: 15;
}

@media screen and (max-width: 767px) {
  .chevron {
    width: 45px;
  }
}
</style>
