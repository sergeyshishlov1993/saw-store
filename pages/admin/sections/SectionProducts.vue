<template>
  <div class="container">
    <div class="wrapper">
      <div class="positions">
        <ui-text-h3>Перелік позицій</ui-text-h3>

        <div class="positions__btn">
          <ui-btn
            v-if="!showLoader"
            @click="downloadProductsFromLink"
            :disabled="showLoader"
            >Синхронізувати товари</ui-btn
          >

          <ui-btn @click="writeProductProfitec">Завантажити Profitec</ui-btn>

          <ui-btn @click.stop="removeAllProducts"
            >Видалити всі товари {{ brand }}
          </ui-btn>
        </div>
      </div>

      <ui-loader v-if="showLoader" />
      <success-sync-modal v-else-if="showSuccessModal" />

      <div class="wrapper__product" v-else>
        <div class="wrapper__header">
          <ui-select
            class="select"
            :category="subCategory"
            :selectCategory="selectedCategory"
            @update-select="getSelectValue"
          />

          <select
            style="font-size: 12px; font-weight: 700"
            @change="(event) => getSelectValue('brand', event.target.value)"
          >
            <option value=" ">Бренд</option>
            <option value="Procraft">Procraft</option>
            <option value="Profitec">Profitec</option>
          </select>

          <div class="checkbox">
            <input
              type="checkbox"
              name="sale"
              @change="filterProductsByCheckbox"
              v-model="sale"
            />
            <ui-text-h6>Знижка</ui-text-h6>
          </div>

          <div class="checkbox">
            <input
              type="checkbox"
              name="bestseler"
              @change="filterProductsByCheckbox"
              v-model="bestseller"
            />
            <ui-text-h6>Хіт продажу</ui-text-h6>
          </div>

          <ui-input
            placeholder="пошук по назві товару"
            name="search_admin"
            :value="search"
            @input="(event) => searchAdminProduct(event.target.value)"
          />
        </div>

        <transition name="fade">
          <table v-if="isLoadContent">
            <thead>
              <tr>
                <th>Товар</th>
                <th>Назва</th>
                <th>Ціна</th>
                <th>Акційна ціна</th>
                <th>Наявності</th>
                <th>Хіт продажу</th>
                <th>Бренд</th>
                <th>Дії</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="product in products"
                :key="product.product_id"
                @click="goToProduct(product.product_id)"
              >
                <td>
                  <img
                    :src="
                      product.pictures[0].pictures_name || 'Зображення відсутнє'
                    "
                    alt=""
                  />
                </td>

                <td>
                  <a :href="`/admin/${product.product_id}`" target="_blank">
                    {{ product.product_name }}
                  </a>
                </td>
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
                  {{ product.brand }}
                </td>

                <td>
                  <icon-close
                    @click.stop="
                      removeProduct(
                        product.product_id,
                        product.pictures,
                        product.custom_product
                      )
                    "
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </transition>

        <div class="wrapper__pagination">
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
import axios from "axios";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { app } from "~/firebaseConfig";

import UiTextH3 from "~/components/Ui/UiTextH3.vue";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import UiTextH6 from "~/components/Ui/UiTextH6.vue";
import UiInput from "~/components/Ui/UiInput.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import UiSelect from "~/components/Ui/UiSelect.vue";
import UiLoader from "~/components/Ui/UiLoader.vue";
import IconClose from "~/assets/icons/IconClose.vue";
import ThePagination from "~/components/Block/ThePagination.vue";
import IconChevronLeft from "~/assets/icons/IconChevronLeft.vue";
import IconChevronNext from "~/assets/icons/IconChevronNext.vue";
import SuccessSyncModal from "../components/SuccessSyncModal.vue";

const router = useRouter();
const { scrollToTop } = useScrollToTop();
const storage = getStorage(app);
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;

const subCategory = ref();
const search = ref("");
const selectedCategory = ref("");
const selectedCategoryValue = ref();
const products = ref();
const currentPage = ref(1);
const totalPageCount = ref();
const showLoader = ref(false);
const isLoadContent = ref(true);
const showSuccessModal = ref(false);
const sale = ref(false);
const bestseller = ref(false);
const brand = ref("");

onMounted(async () => {
  await getSubCategory();
  await getProduct();
});

async function getSubCategory() {
  try {
    const response = await axios.get(`${apiUrl}/products/category`);

    subCategory.value = response.data.subCategory;
  } catch (error) {
    console.error(error);
  }
}

async function removeAllProducts() {
  try {
    const response = await axios.delete(
      `${apiUrl}/admin/products/destroy-product-by-brand?brand=${brand.value}`
    );

    console.log("resonse remove", response);

    await getProduct();
  } catch (error) {
    console.error(error);
  }
}

async function getProduct() {
  isLoadContent.value = false;
  try {
    const response = await axios.get(
      `${apiUrl}/admin/products?page=${currentPage.value}&search=${search.value}&sub_category=${selectedCategoryValue.value}&sale=${sale.value}&bestseller=${bestseller.value}&brand=${brand.value}`
    );

    products.value = response.data.products;
    totalPageCount.value = response.data.totalPages;

    isLoadContent.value = true;
  } catch (error) {
    console.error("сталась помилка", error);
  }
}

async function writeProductProfitec() {
  try {
    showLoader.value = true;

    const response = await axios.put(`${apiUrl}/admin/products/write-profitec`);

    if (response.status === 200) {
      showLoader.value = false;
      showSuccessModal.value = true;
    }

    setTimeout(() => {
      showSuccessModal.value = false;
    }, 1000);
  } catch (error) {
    console.error("сталась помилка:", error);
  }
}

async function downloadProductsFromLink() {
  try {
    showLoader.value = true;

    const response = await axios.put(
      `${apiUrl}/admin/products/update-or-create`
    );

    if (response.status === 200) {
      showLoader.value = false;
      showSuccessModal.value = true;
    }

    setTimeout(() => {
      showSuccessModal.value = false;
    }, 1000);
  } catch (error) {
    console.error("сталась помилка:", error);
  }
}

async function getSelectValue(name, value) {
  if (name === "brand") {
    brand.value = value;
  } else {
    selectedCategory.value = name;
    selectedCategoryValue.value = value;
  }

  setTimeout(async () => {
    await getProduct();
  }, 1000);
}

async function filterProductsByCheckbox() {
  await getProduct();
}

async function searchAdminProduct(event) {
  search.value = event;

  setTimeout(async () => {
    await getProduct();
  }, 1000);
}

async function changePage(page) {
  isLoadContent.value = false;
  currentPage.value = page;
  scrollToTop();

  setTimeout(async () => {
    await getProduct();
  }, 1000);

  isLoadContent.value = true;
}

async function nextPage() {
  isLoadContent.value = false;
  currentPage.value++;
  scrollToTop();

  setTimeout(async () => {
    await getProduct();
  }, 1000);

  isLoadContent.value = true;
}

async function prevPage() {
  isLoadContent.value = false;
  currentPage.value--;
  scrollToTop();

  setTimeout(async () => {
    await getProduct();
  }, 1000);

  isLoadContent.value = true;
}

async function removeProduct(id, url, custom) {
  try {
    const idx = products.value.findIndex((el) => el.product_id == id);
    products.value.splice(idx, 1);

    const response = await axios.delete(`${apiUrl}/admin/products/${id}`);
    console.log("response remove", response);

    if (custom) {
      url.forEach(async (el) => await deleteFileByUrl(el.pictures_name));
    }
  } catch (error) {
    console.error("сталась помилка"), error;
  }
}

async function deleteFileByUrl(fileUrl) {
  try {
    const fileRef = storageRef(storage, fileUrl);
    await deleteObject(fileRef);

    console.log("успішно видаленно");
  } catch (error) {
    console.error("Помилка при видаленні файлу:", error.message);
  }
}

function goToProduct(id) {
  router.push(`/admin/${id}`);
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 100px;

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
      width: 15%;
    }

    input {
      width: 30%;
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
    font-size: 14px;
    cursor: pointer;
  }

  tr {
    border: 1px solid #ddd;
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

.checkbox {
  width: 120px;
  display: flex;
  align-items: center;
  gap: 5px;

  input {
    width: 20px;
  }
}
</style>
