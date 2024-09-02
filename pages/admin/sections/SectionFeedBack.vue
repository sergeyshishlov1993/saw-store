<template>
  <div class="container">
    <div class="feedback">
      <transition name="fade">
        <div>
          <transition name="fade">
            <table v-if="isLoading">
              <thead>
                <tr>
                  <th>Імʼя</th>
                  <th>Номер телефону</th>
                  <th>Дата</th>
                  <th>Статус</th>
                  <th>Зміниити статус</th>
                  <th>Видалити</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="conect in feedback"
                  :key="conect.id"
                  :class="{ new: conect.status === 'Нове' }"
                >
                  <td>{{ conect.name }}</td>
                  <td>{{ conect.phone }}</td>
                  <td>{{ new Date(conect.createdAt).toLocaleString() }}</td>
                  <td>{{ conect.status }}</td>

                  <td>
                    <ui-btn @click="changeStatus(conect.id)">Обробити</ui-btn>
                  </td>

                  <td>
                    <icon-close @click="removeFeedback(conect.id)" />
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
              :total="totalPage"
              :current="currentPage"
              @changePage="changePage"
            />

            <button @click="nextPage" :disabled="currentPage === totalPage">
              <icon-chevron-next />
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useScrollToTop from "~/utils/useScrollToTop";

import ThePagination from "~/components/Block/ThePagination.vue";

import UiBtn from "~/components/Ui/UiBtn.vue";

import IconClose from "~/assets/icons/IconClose.vue";
import IconChevronLeft from "~/assets/icons/IconChevronLeft.vue";
import IconChevronNext from "~/assets/icons/IconChevronNext.vue";

const feedback = ref();
const currentPage = ref(1);
const totalPage = ref();
const isLoading = ref(true);
const { scrollToTop } = useScrollToTop();
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;

onMounted(async () => {
  await getFeedback();
});

async function getFeedback() {
  isLoading.value = false;
  try {
    const response = await axios.get(
      `${apiUrl}/feedback/all?page=${currentPage.value}`
    );

    feedback.value = response.data.feedback;
    totalPage.value = response.data.totalPages;

    isLoading.value = true;
  } catch (error) {}
}

async function changeStatus(id) {
  try {
    const response = await axios.put(`${apiUrl}/feedback/change-status/${id}`);

    const idx = feedback.value.findIndex((el) => el.id === id);

    feedback.value[idx].status = "Виконано";
  } catch (error) {
    console.error(error);
  }
}

async function removeFeedback(id) {
  try {
    const response = await axios.delete(`${apiUrl}/feedback/delete/${id}`);

    const idx = feedback.value.findIndex((el) => el.id === id);

    feedback.value.splice(idx, 1);
  } catch (error) {
    console.error(error);
  }
}

async function changePage(page) {
  currentPage.value = page;
  scrollToTop();

  setTimeout(async () => {
    await getFeedback();
  }, 1000);
}

async function nextPage() {
  currentPage.value++;
  scrollToTop();

  setTimeout(async () => {
    await getFeedback();
  }, 1000);
}

async function prevPage() {
  currentPage.value--;
  scrollToTop();

  setTimeout(async () => {
    await getFeedback();
  }, 1000);
}
</script>

<style lang="scss" scoped>
.feedback {
  padding-top: 100px;
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

    button {
      width: 100%;
    }
  }

  tr {
    border: 1px solid #111010;
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

.new {
  background-color: rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 991px) {
  .feedback {
    padding-top: 50px;
  }
}

@media screen and (max-width: 767px) {
  table {
    thead {
      display: none;
    }

    tbody {
      display: flex;
      flex-direction: column;
      gap: 10px;

      tr {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        td {
          width: 100%;

          svg {
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
