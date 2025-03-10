<template>
  <div class="container">
    <div class="bestseller">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <div class="bestseller__wrapper">
        <the-product-card
          v-for="product in bestsellerProduct"
          :key="product.product_id"
          :path="product.pictures[product.pictures.length - 1].pictures_name"
          :title="product.product_name"
          :price="product.price"
          promotionalPrice="0.00"
          :bestseller="product.bestseller"
          @buy-product="addProductToCart(product, product.product_id)"
          @click="
            goToProducts(
              product.sub_category_id,
              product.product_id,
              product.product_name
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import TheProductCard from "../../components/Block/TheProductCard.vue";
import axios from "axios";
import { useCartData } from "~/stores/cartData";
import useScrollToTop from "~/utils/useScrollToTop";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";

const { state, addProductToCart } = useCartData();
const { scrollToTop } = useScrollToTop();
const router = useRouter();
const route = useRoute();
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;
const bestsellerProduct = ref([]);
const showLoader = ref(false);
const breadcrumb = ref([
  { name: "Головна", path: "/" },
  {
    name: route.query.category || "Категорія відсутня",
    path: `${route.path}?pixel=${route.query.pixel || ""}&category=${
      route.query.category || ""
    }`,
  },
]);

onMounted(async () => {
  await getPromotionalItem();
});

async function getPromotionalItem() {
  showLoader.value = true;
  try {
    const response = await axios.get(`${apiUrl}/bestseller`);

    bestsellerProduct.value = response.data.bestseller;
    showLoader.value = false;
  } catch (error) {
    console.error("сталась помилка:", error);
    showLoader.value = false;
  }
}

const goToProducts = (category, id, name) => {
  router.push(
    `/products/bestseller/${category}/${id}?pixel=${route.query.pixel}`
  );
};

useHead({
  title:
    " Хіт продажу - SAW STORE - Популярний професійний електроінструмент за найкращою ціною - Надійність та якість в кожному інструменті - Обирайте найкраще для роботи з SAW STORE - Купити еклектроінструмент - Купити акумуляторній інструмент - Купить болгарку - Купить шуруповерт - Купить дрель - Купить секатор - Купить инвертор - Купить электролобзик - Купить генератор - Купить мотоблок - Купить перфоратор - Купить сварочный аппарат - Купить бензопилу - Купить рубанок - Купить триммер - Купить отбойный молоток - Купить фрезер - Купить циркулярную пилу - Купить плиткорез - Купить компрессор - Купить пылесос - Купить гайковерт - Купить мультитул - Купить степлер - Купить лобзик - Купить виброшлифовальную машину - Купить торцовочную пилу - Купить точильный станок - Купить ленточную пилу - Купить газонокосилку - Купить электрический культиватор - Купить бензиновую косу - Купить клеймопистолет - Купить клеевой пистолет - Купить электрокосу - Купить цепную пилу - Купить ударную дрель - Купить угловую шлифовальную машину - Купить промышленный фен - Купить строительный миксер - Купить паяльник - Купить тепловую пушку - Купить мойку высокого давления - Купить распылитель краски - Купить токарный станок - Купить полировальную машину - Купить дисковую пилу - Купить аккумуляторную отвертку - Купить лазерный уровень - Купить нивелир - Купить шлифмашину - Купить электрорубанок - Купить точильный камень - Купить керхер - Купить воздуходувку - Купить ножницы по металлу - Купить плиткорез - Купить электротример - Купить станок для заточки - Купить сабельную пилу - Купить миксер строительный - Купить ударный гайковерт - Купить рейсмусовый станок - Купить шлифовальную машину - Купить компрессор для покраски - Купить инструмент для заточки ножей - Купить бензиновую воздуходувку",
  meta: [
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "description",
      content:
        "Купуйте популярний професійний електроінструмент в SAW STORE - надійний та перевірений інструмент, який відповідає найвищим стандартам. Оберіть хіти продажу, які заслужили довіру професіоналів.",
    },
    {
      name: "keywords",
      content:
        "SAW STORE, хіт продажу, професійний електроінструмент, надійний інструмент, популярний інструмент, найкраща ціна, якість, купити електроінструмент",
    },
  ],

  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        name: bestsellerProduct.value[0]?.product_name || "Назва відсутня",
        image:
          bestsellerProduct.value[0]?.pictures[
            bestsellerProduct.value[0]?.pictures.length - 1
          ]?.pictures_name || "https://example.com/placeholder.jpg",
        description:
          bestsellerProduct.value[0]?.description || "Опис відсутній",
        sku: bestsellerProduct.value[0]?.product_id || "Немає артикулу",
        brand: {
          "@type": "Brand",
          name: "SAW Store",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "UAH",
          price: bestsellerProduct.value[0]?.price || "0",
          priceValidUntil: "2027-12-31",
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
          url: !import.meta.env.SSR ? window.location.href : "",
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory: "https://schema.org/Refund",
            returnPolicyCountry: "UA",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "UA",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 2,
                unitCode: "d",
              },
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: bestsellerProduct.value[0]?.rating || 4.5,
          reviewCount: bestsellerProduct.value[0]?.review_count || 1,
        },
        review:
          bestsellerProduct.value[0]?.reviews?.slice(0, 2).map((review) => ({
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: review?.rating || 4.5,
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: review?.author || "Анонім",
            },
            reviewBody: review?.text || "Без коментарів",
          })) || [],
      }),
    },
  ],
});
</script>

<style lang="scss" scoped>
.bestseller {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 86px;

  h2 {
    color: darkred;
    font-weight: 700;
  }
  &__wrapper {
    margin-top: 30px;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
  }

  button {
    margin: 0 auto;
    width: 450px;
    height: 100px;

    font-size: 20px;
    font-weight: 700;
    border-radius: 20px;
    box-shadow: 0px 2px 6px rgb(0 0 0 / 8%);

    @media (hover: hover) {
      &:hover {
        box-shadow: -1px 2px 20px -6px rgba(0, 0, 0, 0.75);
        background: darkred;
        color: white;
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  .bestseller {
    padding-top: 50px;

    &__wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (max-width: 992px) {
  .bestseller__wrapper {
    margin-top: 0;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .bestseller__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 767px) {
  .bestseller {
    margin-top: 40px;
  }
}
</style>
