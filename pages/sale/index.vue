<template>
  <div class="container">
    <div class="action">
      <breadcrumbs :breadcrumbs="breadcrumb" />

      <ui-loader v-if="showLoader" />
      <div class="action__wrapper" v-else>
        <the-product-card
          v-for="product in discontProduct"
          :key="product.product_id"
          :path="product.pictures[product.pictures.length - 1].pictures_name"
          :title="product.product_name"
          :price="product.price"
          :promotionalPrice="product.sale_price"
          :discount="product.discount"
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
import { useCartData } from "~/stores/cartData";
import useScrollToTop from "~/utils/useScrollToTop";
import axios from "axios";
import Breadcrumbs from "~/components/Block/Breadcrumbs.vue";
import TheProductCard from "~/components/Block/TheProductCard.vue";
import UiLoader from "~/components/Ui/UiLoader.vue";

const { state } = useCartData();
const { scrollToTop } = useScrollToTop();
const router = useRouter();
const route = useRoute();
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;
const showLoader = ref(false);
const discontProduct = ref([]);
const breadcrumb = ref([
  { name: "Головна", path: "/" },

  {
    name: route.query.category,
    path: `/sale?category=${route.query.category}`,
  },
]);

onMounted(async () => {
  await getPromotionalItem();
});

async function getPromotionalItem() {
  showLoader.value = true;
  try {
    const response = await axios.get(`${apiUrl}/sale`);

    discontProduct.value = response.data.sale;

    showLoader.value = false;
  } catch (error) {
    console.error("сталась помилка:", error);
    showLoader.value = false;
  }
}

const addProductToCart = (product, id) => {
  scrollToTop();
  let item = state.productsInСart.find((item) => item.product_id == id);

  if (item) {
    item.count += 1;
  } else {
    state.productsInСart.push({ ...product, count: 1 });
  }

  state.showModalWindow = true;
};

const goToProducts = (category, id, name) => {
  router.push(`/products/sale/${category}/${id}`);
};

if (discontProduct.value.length > 0) {
  const firstProduct = discontProduct.value[0];
  const discountPercentage = firstProduct.discount;
  const productName = firstProduct.product_name;

  useHead({
    title:
      "Акції - SAW STORE - Спеціальні пропозиції на професійний електроінструмент - Знижки та вигідні умови на найкращий інструмент" -
      `Знижка - ${discountPercentage}% на ${productName} - SAW STORE - Купити еклектроінструмент - Купити акумуляторній інструмент`,
    meta: [
      {
        name: "robots",
        content: "index, follow",
      },
      {
        name: "description",
        content: `Не пропустіть акції від SAW STORE! Спеціальні пропозиції, знижки та вигідні умови на професійний електроінструмент. Обирайте якість за найкращою ціною. - Купуйте ${productName} зі знижкою ${discountPercentage}% у SAW STORE. Спеціальні пропозиції на професійний електроінструмент.`,
      },
      {
        name: "keywords",
        content: `SAW STORE, акції, знижки, професійний електроінструмент, спеціальні пропозиції, вигідні умови, купити інструмент зі знижкою - ${productName}, знижка ${discountPercentage}%, SAW STORE, акції, професійний електроінструмент, спеціальні пропозиції`,
      },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: discontProduct.value[0]?.product_name || "Назва відсутня",
          image:
            discontProduct.value[0]?.pictures[
              discontProduct.value[0]?.pictures.length - 1
            ]?.pictures_name || "https://example.com/placeholder.jpg",
          description: discontProduct.value[0]?.description || "Опис відсутній",
          sku: discontProduct.value[0]?.product_id || "Немає артикулу",
          brand: {
            "@type": "Brand",
            name: "SAW Store",
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "UAH",
            price: discontProduct.value[0]?.price || "0",
            priceValidUntil: "2027-12-31",
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            url: window.location.href,
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
            ratingValue: discontProduct.value[0]?.rating || 4.5,
            reviewCount: discontProduct.value[0]?.review_count || 1,
          },
          review:
            discontProduct.value[0]?.reviews?.slice(0, 2).map((review) => ({
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
}
</script>

<style lang="scss" scoped>
.action {
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
  .action {
    padding-top: 50px;

    &__wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (max-width: 992px) {
  .action__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .action__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .action {
    margin-top: 40px;
  }
}
</style>
