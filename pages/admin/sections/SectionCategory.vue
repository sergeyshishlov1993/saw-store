<template>
  <div class="container">
    <div class="category__wrapper">
      <div class="tabs">
        <the-tabs
          v-for="tab in tabs"
          :key="tab.name"
          @click="changeTab(tab.name)"
          :selectedTab="currentTab"
          :name="tab.name"
          >{{ tab.name }}</the-tabs
        >
      </div>

      <ui-btn @click="syncCateogory">Синхронізувати категорії товарів</ui-btn>

      <table v-if="currentTab == 'Категорії'">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Видалити</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="category in categorys" :key="category.id">
            <td>
              {{ category.category_name }}
            </td>

            <td>
              <icon-close @click="removeCategory(category.id, 'category')" />
            </td>
          </tr>
        </tbody>
      </table>

      <table v-if="currentTab == 'Підкатегорії'">
        <thead>
          <tr>
            <th>Обкладенка</th>
            <th>Підкатегорія</th>
            <th>Зміниити</th>
            <th>Видалити</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="category in subCategory" :key="category.sub_category_id">
            <td>
              <img :src="category.pictures" :alt="category.sub_category_name" />
            </td>

            <td>
              {{ category.sub_category_name }}
            </td>

            <td>
              <form
                @submit.prevent="
                  changePicturesCategory(category.sub_category_id)
                "
              >
                <ui-input
                  placeholder="URL картинки"
                  name="pictures"
                  :value="(pictirePath = category.pictures)"
                  @input="getInputValue"
                />

                <ui-btn>Зміниити</ui-btn>
              </form>
            </td>

            <td>
              <icon-close
                @click="removeCategory(category.sub_category_id, 'subCategory')"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="wrapper__pagination" v-if="currentTab == 'Підкатегорії'">
        <button @click="prevPage" :disabled="currentPage === 1">
          <icon-chevron-left />
        </button>

        <the-pagination
          :total="totalPage"
          :current="currentPage"
          @changePage="changePage"
        />

        <button @click="nextPage" :disabled="currentPage === totalPage">
          <icon-chevron-next />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useScrollToTop from "~/utils/useScrollToTop";
import UiInput from "~/components/Ui/UiInput.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import TheTabs from "~/components/Block/TheTabs.vue";

import IconClose from "~/assets/icons/IconClose.vue";
import ThePagination from "~/components/Block/ThePagination.vue";
const { scrollToTop } = useScrollToTop();
const subCategory = ref();
const categorys = ref();
const pictirePath = ref("");
const currentPage = ref(1);
const totalPage = ref();
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;
const currentTab = ref("Категорії");
const tabs = [{ name: "Категорії" }, { name: "Підкатегорії" }];

onMounted(async () => {
  await getCategory();
});

function changeTab(name) {
  currentTab.value = name;
  scrollToTop();
}

async function syncCateogory() {
  try {
    const response = await axios.put(`${apiUrl}/admin/products/add_category`);

    console.log("response", response);
  } catch (error) {
    console.error(error);
  }
}

async function getCategory() {
  try {
    const response = await axios.get(
      `${apiUrl}/admin/products/sub-category?page=${currentPage.value}`
    );
    categorys.value = response.data.category;
    subCategory.value = response.data.subCategory;
    totalPage.value = response.data.totalPages;

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

function getInputValue(event) {
  pictirePath.value = event.target.value;
}

async function changePicturesCategory(id) {
  try {
    const response = await axios.put(
      `${apiUrl}/products/category/${id}/update`,

      {
        path: pictirePath.value,
      }
    );

    await getCategory();
  } catch (error) {
    console.error(error);
  }
}

async function removeCategory(id, table) {
  try {
    if (table === "category") {
      const idx = categorys.value.findIndex((el) => el.id == id);
      categorys.value.splice(idx, 1);

      const response = await axios.delete(
        `${apiUrl}/products/category/${id}/delete?name=${table}`
      );

      console.log("response", response);
    } else {
      const idx = subCategory.value.findIndex((el) => el.sub_category_id == id);
      subCategory.value.splice(idx, 1);

      const response = await axios.delete(
        `${apiUrl}/products/category/${id}/delete?name=${table}`
      );
      console.log("response", response);
    }
  } catch (error) {
    console.error(error);
  }
}

async function changePage(page) {
  currentPage.value = page;
  scrollToTop();

  setTimeout(async () => {
    await getCategory();
  }, 1000);
}

async function nextPage() {
  currentPage.value++;
  scrollToTop();

  setTimeout(async () => {
    await getCategory();
  }, 1000);
}

async function prevPage() {
  currentPage.value--;
  scrollToTop();

  setTimeout(async () => {
    await getCategory();
  }, 1000);
}
</script>

<style lang="scss" scoped>
.category__wrapper {
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-top: 100px;

  button {
    width: 100%;
  }
}

.tabs {
  position: relative;
  padding: 64px 0 34px 0;
  display: flex;
  align-items: center;
  gap: 60px;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
}

table {
  margin: auto;
  width: 90%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    text-align: left;
    vertical-align: middle;
    font-size: 14px;
    min-width: 100px;
    cursor: pointer;

    form {
      width: 50%;

      button {
        display: none;
      }
    }
  }

  tr {
    border: 1px solid #ddd;
  }

  img {
    width: 75px;
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
</style>
