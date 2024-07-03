<template>
  <div class="container">
    <div class="admin">
      <div class="positions">
        <ui-text-h3>Перелік позицій</ui-text-h3>

        <div class="positions__btn">
          <ui-btn>Додати товар</ui-btn>
          <ui-btn>Синхронізувати товари </ui-btn>
          <ui-btn>Зміниити категорії </ui-btn>
        </div>
      </div>

      <div class="admin__product">
        <div class="admin__header">
          <ui-select
            class="select"
            :category="subCategory"
            :selectCategory="selectedCategory"
            @update-select="getSelectValue"
          />

          <ui-input
            placeholder="пошук по назві товару"
            name="search_admin"
            :value="search"
            @input="(event) => searchAdminProduct(event.target.value)"
          />
        </div>

        <transition name="fade">
          <table v-if="showLoader">
            <thead>
              <tr>
                <th>Товар</th>
                <th>Назва</th>
                <th>Ціна</th>
                <th>Акційна ціна</th>
                <th>Наявності</th>
                <th>Хіт продажу</th>
                <th>Дії</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="product in products"
                :key="product.product_id"
                @click="goToProduct(product.product_id)"
              >
                <td><img :src="product.pictures[0].pictures_name" alt="" /></td>
                <td>{{ product.product_name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.sale_price }}</td>
                <td>
                  {{
                    product.available == "true"
                      ? "в наявності"
                      : " немає в наявності"
                  }}
                </td>

                <td>
                  {{ product.bestseller == "true" ? "так" : "ні" }}
                </td>

                <td>
                  <icon-close @click.stop="removeProduct(product.product_id)" />
                </td>
              </tr>
            </tbody>
          </table>
        </transition>

        <div class="admin__pagination">
          <button @click="prevPage" :disabled="currentPage === 1">
            <icon-chevron-left />
          </button>

          <the-pagination
            :total="totalPageCount"
            :current="currentPage"
            @changePage="changePage"
          />

          <button @click="nextPage" :disabled="currentPage === totalPageCount">
            <icon-chevron-next />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartData } from "~/stores/cartData";
import UiTextH3 from "~/components/Ui/UiTextH3.vue";
import UiInput from "~/components/Ui/UiInput.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import UiSelect from "~/components/Ui/UiSelect.vue";
import axios from "axios";
import IconClose from "~/assets/icons/IconClose.vue";
import ThePagination from "~/components/Block/ThePagination.vue";
import IconChevronLeft from "~/assets/icons/IconChevronLeft.vue";
import IconChevronNext from "~/assets/icons/IconChevronNext.vue";

const router = useRouter();
const { scrollToTop } = useScrollToTop();
const subCategory = ref();
const search = ref("");
const selectedCategory = ref("");
const selectedCategoryValue = ref();
const products = ref();
const currentPage = ref(1);
const totalPageCount = ref();
const showLoader = ref(true);

onMounted(async () => {
  await getSubCategory();
  await getProduct();
});

async function getSubCategory() {
  try {
    const response = await axios.get(`http://localhost:8000/products/category`);

    subCategory.value = response.data.subCategory;
  } catch (error) {
    console.error(error);
  }
}

async function getProduct() {
  showLoader.value = false;
  try {
    const response = await axios.get(
      `http://localhost:8000/admin/products?page=${currentPage.value}&search=${search.value}&sub_category=${selectedCategoryValue.value}`
    );

    products.value = response.data.products;
    totalPageCount.value = response.data.totalPages;

    showLoader.value = true;
  } catch (error) {
    console.error("сталась помилка", error);
  }
}

async function getSelectValue(name, value) {
  selectedCategory.value = name;
  selectedCategoryValue.value = value;

  setTimeout(async () => {
    await getProduct();
  }, 1000);
}

async function searchAdminProduct(event) {
  search.value = event;

  setTimeout(async () => {
    await getProduct();
  }, 1000);
}

async function changePage(page) {
  currentPage.value = page;
  scrollToTop();

  setTimeout(async () => {
    await getProduct();
  }, 1000);
}

async function nextPage() {
  currentPage.value++;
  scrollToTop();

  setTimeout(async () => {
    await getProduct();
  }, 1000);
}

async function prevPage() {
  currentPage.value--;
  scrollToTop();

  setTimeout(async () => {
    await getProduct();
  }, 1000);
}

async function removeProduct(id) {
  const idx = products.value.findIndex((el) => el.product_id == id);
  products.value.splice(idx, 1);

  try {
    const response = await axios.delete(
      `http://localhost:8000/admin/products/${id}`
    );
  } catch (error) {
    console.error("сталась помилка"), error;
  }
}

function goToProduct(id) {
  router.push(`/admin/${id}`);
}
</script>

<style lang="scss" scoped>
.admin {
  padding-top: 150px;

  &__product {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  &__header {
    margin-top: 25px;
    display: flex;
    align-items: center;
    gap: 5%;

    .select {
      width: 25%;
    }

    input {
      width: 70%;
    }
  }

  &__pagination {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
}

.positions {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__btn {
    display: flex;
    gap: 15px;
  }
}

table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 18px;
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
  }

  img {
    width: 100px;
    height: auto;
    display: block;
  }

  button {
    width: 75%;
    margin-bottom: 5px;
  }

  svg {
    width: 30px;
  }
}

.pagination__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
