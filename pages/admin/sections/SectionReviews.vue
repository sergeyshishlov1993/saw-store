<template>
  <div class="container">
    <div class="admin__reviews">
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

      <!-- таблицы отзывов -->

      <transition name="fade">
        <div v-if="currentTab == 'Відгуки'">
          <transition name="fade">
            <table v-if="isLoading">
              <thead>
                <tr>
                  <th>Імʼя</th>
                  <th>Відгук</th>
                  <th>Дата</th>
                  <th>Дії</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="review in reviews" :key="review.review_id">
                  <td>{{ review.user_name }}</td>
                  <td>{{ review.comment }}</td>
                  <td>{{ new Date(review.createdAt).toLocaleString() }}</td>
                  <td>
                    <icon-close
                      @click="
                        remove(review.review_id, 'reviews', review.product_id)
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </transition>

          <div class="wrapper__pagination" v-if="totalPageReviews > 1">
            <button @click="prevPage" :disabled="currentPage === 1">
              <icon-chevron-left />
            </button>

            <the-pagination
              :total="totalPageReviews"
              :current="currentPage"
              @changePage="changePage"
            />

            <button
              @click="nextPage"
              :disabled="currentPage === totalPageReviews"
            >
              <icon-chevron-next />
            </button>
          </div>
        </div>
      </transition>

      <!-- таблица ответов -->

      <div v-if="currentTab == 'Відповіді на відгуки'">
        <transition name="fade">
          <table v-if="isLoading">
            <thead>
              <tr>
                <th>Імʼя</th>
                <th>Відповідь</th>
                <th>Адмін</th>
                <th>Дата</th>
                <th>Дії</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="response in reviewResponses"
                :key="response.response_id"
              >
                <td>{{ response.user_name }}</td>
                <td>{{ response.comment }}</td>
                <td>{{ response.admin_response ? "так" : "ні" }}</td>
                <td>{{ new Date(response.createdAt).toLocaleString() }}</td>
                <td>
                  <icon-close
                    @click="
                      remove(
                        response.response_id,
                        'response',
                        response.review_id
                      )
                    "
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </transition>

        <div class="wrapper__pagination" v-if="totalPageResponse > 1">
          <button @click="prevPage" :disabled="currentPage === 1">
            <icon-chevron-left />
          </button>

          <the-pagination
            :total="totalPageResponse"
            :current="currentPage"
            @changePage="changePage"
          />

          <button
            @click="nextPage"
            :disabled="currentPage === totalPageResponse"
          >
            <icon-chevron-next />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useScrollToTop from "~/utils/useScrollToTop";
import TheTabs from "~/components/Block/TheTabs.vue";
import ThePagination from "~/components/Block/ThePagination.vue";
import IconClose from "~/assets/icons/IconClose.vue";
import IconChevronLeft from "~/assets/icons/IconChevronLeft.vue";
import IconChevronNext from "~/assets/icons/IconChevronNext.vue";

const { scrollToTop } = useScrollToTop();
const reviews = ref();
const reviewResponses = ref();
const currentPage = ref(1);
const totalPageReviews = ref();
const totalPageResponse = ref();
const currentTab = ref("Відгуки");
const tabs = [{ name: "Відгуки" }, { name: "Відповіді на відгуки" }];
const isLoading = ref(true);
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;

onMounted(async () => {
  await getReviews();
  await getReviewsResponse();
});

function changeTab(name) {
  currentTab.value = name;
  scrollToTop();
}

async function getReviews() {
  isLoading.value = false;
  try {
    const response = await axios.get(
      `${apiUrl}/admin/products/all-reviews?page=${currentPage.value}`
    );

    reviews.value = response.data.review;
    totalPageReviews.value = response.data.totalPages;

    setTimeout(() => {
      isLoading.value = true;
    }, 400);
  } catch (error) {
    console.error("сталась помилка", error);
  }
}

async function getReviewsResponse() {
  isLoading.value = false;
  try {
    const response = await axios.get(
      `${apiUrl}/admin/products/all-reviews-response?page=${currentPage.value}`
    );

    reviewResponses.value = response.data.reviewResponse;
    totalPageResponse.value = response.data.totalPages;

    setTimeout(() => {
      isLoading.value = true;
    }, 400);
  } catch (error) {
    console.error("сталась помилка", error);
  }
}

async function changePage(page) {
  currentPage.value = page;
  scrollToTop();

  setTimeout(async () => {
    await getReviews();
    await getReviewsResponse();
  }, 400);
}

async function nextPage() {
  currentPage.value++;

  scrollToTop();

  setTimeout(async () => {
    await getReviews();
    await getReviewsResponse();
  }, 400);
}

async function prevPage() {
  currentPage.value--;
  scrollToTop();

  setTimeout(async () => {
    await getReviews();
    await getReviewsResponse();
  }, 400);
}

async function remove(id, table, parentId) {
  if (table === "reviews") {
    const idx = reviews.value.findIndex((el) => el.review_id === id);
    reviews.value.splice(idx, 1);

    try {
      const response = await axios.delete(
        `${apiUrl}/admin/products/${parentId}/review/${id}`
      );
    } catch (error) {
      console.error(`Ошибка при удаления отзыва: ${id}`, error);
    }
  } else {
    const idx = reviewResponses.value.findIndex((el) => el.response_id === id);
    reviewResponses.value.splice(idx, 1);

    try {
      const response = await axios.delete(
        `${apiUrl}/admin/products/review/${parentId}/${id}`
      );
    } catch (error) {
      console.error(`Ошибка при удаления отзыва: ${id}`, error);
    }
  }
}
</script>

<style lang="scss" scoped>
.admin__reviews {
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-top: 100px;
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
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    text-align: left;
    vertical-align: middle;
    font-size: 14px;
    cursor: pointer;

    form {
      width: 50%;
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

  svg {
    width: 30px;
  }
}

.wrapper__pagination {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 991px) {
  .admin__reviews {
    padding-top: 0;
    gap: 0;
  }
}

@media screen and (max-width: 767px) {
  table {
    display: flex;

    th {
      display: none;
    }

    tbody {
      width: 100%;
    }

    tr {
      position: relative;
      display: flex;
      flex-direction: column;

      td {
        svg {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
}
</style>
