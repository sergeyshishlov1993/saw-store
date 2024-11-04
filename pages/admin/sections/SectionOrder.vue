<template>
  <div class="container">
    <div class="orders">
      <transition name="fade">
        <div class="orders__wrapper">
          <div class="filters">
            <ui-calendar
              @selectedDate="getCalendarDate"
              @selectedMonth="filterProductsByMonth"
            />

            <select @change="(event) => handlerFilterSelectValue(event)">
              <option value="">Всі статуси</option>
              <option value="нове">нове</option>
              <option value="прийнято">прийнято</option>
              <option value="скасановано">скасановано</option>
              <option value="повернення">повернення</option>
              <option value="завершено">завершено</option>
            </select>

            <ui-btn @click="clearFilters">
              <ui-text-h5>Скинути фільтри</ui-text-h5>
            </ui-btn>
          </div>

          <div class="orders__search">
            <ui-input
              placeholder="Пошук замовлення по номеру +380"
              name="search_admin"
              type="search"
              :value="search"
              @focus="(event) => focusAdminOrder(event)"
              @input="(event) => searchAdminOrder(event)"
              @blur="(event) => blurAdminOrder(event)"
            />
          </div>

          <transition name="fade">
            <table>
              <thead>
                <tr>
                  <th>Замовлення</th>
                  <th>Покупець</th>
                  <th>Сумма</th>
                  <th>Доставка і оплата</th>
                  <th>Дaта</th>
                  <th>Pixel</th>
                  <th>Статус</th>
                  <th>Видалити</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="order in orders" :key="order.order_id">
                  <td class="wrapper">
                    <div
                      class="order"
                      v-for="item in order.orderItem"
                      :key="item.item_id"
                    >
                      <img :src="item.product_img" :alt="item.order_name" />

                      <div class="order__info">
                        <div class="order__title">
                          <ui-text-h6>{{ item.order_name }}</ui-text-h6>

                          <icon-close
                            @click="removeItem(item.item_id, order.order_id)"
                            v-if="order.orderItem.length > 1"
                          />
                        </div>

                        <ui-text-h6>{{ item.count }} шт </ui-text-h6>

                        <ui-text-h6>{{ Math.round(item.price) }} ₴</ui-text-h6>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div class="person">
                      <div class="person__title">
                        <ui-text-h6> {{ order.name }}</ui-text-h6>
                        <ui-text-h6> {{ order.second_name }}</ui-text-h6>
                      </div>

                      <ui-text-h6> {{ order.phone }}</ui-text-h6>
                    </div>
                  </td>

                  <td>
                    <ui-text-h6 class="price">
                      {{ Math.round(updatedTotalPrice || order.total_price) }} ₴
                    </ui-text-h6>
                  </td>

                  <td>
                    <div class="delivery">
                      <ui-text-h6>{{ order.city }}</ui-text-h6>
                      <ui-text-h6>{{ order.postal_office }}</ui-text-h6>

                      <ui-text-h6>{{
                        order.courier_delivery_address
                      }}</ui-text-h6>
                      <ui-text-h6>{{ order.payment_method }}</ui-text-h6>
                    </div>
                  </td>

                  <td>
                    <ui-text-h6>
                      {{
                        new Date(order.createdAt).toLocaleString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      }}
                    </ui-text-h6>
                  </td>

                  <td>
                    <ui-text-h6>
                      {{ order.qwery }}
                    </ui-text-h6>
                  </td>

                  <td>
                    <select
                      @change="(event) => getSelectValue(event, order.order_id)"
                      :value="(status = order.status)"
                      :class="{
                        new: order.status == 'нове',
                        accepted: order.status == 'прийнято',
                        done: order.status == 'завершено',
                        canceled: order.status == 'скасановано',
                        return: order.status == 'повернення',
                      }"
                    >
                      <option value="нове">нове</option>
                      <option value="прийнято">прийнято</option>
                      <option value="скасановано">скасановано</option>
                      <option value="повернення">повернення</option>
                      <option value="завершено">завершено</option>
                    </select>
                  </td>

                  <td>
                    <icon-close @click="removeOrder(order.order_id)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </transition>

          <div class="wrapper__pagination" v-if="totalPage > 1">
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
import { ref, onMounted, onBeforeMount, computed } from "vue";
import axios from "axios";
import ThePagination from "~/components/Block/ThePagination.vue";
import TheEmptyModal from "~/components/Block/TheEmptyModal.vue";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import UiTextH6 from "~/components/Ui/UiTextH6.vue";
import UiInput from "~/components/Ui/UiInput.vue";
import IconClose from "~/assets/icons/IconClose.vue";
import IconChevronLeft from "~/assets/icons/IconChevronLeft.vue";
import IconChevronNext from "~/assets/icons/IconChevronNext.vue";

import UiCalendar from "../components/UiCalendar.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";

const { scrollToTop } = useScrollToTop();
const emit = defineEmits(["count"]);
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;
const orders = ref([]);
const currentPage = ref(1);
const totalPage = ref();
const status = ref();
const updatedTotalPrice = ref(null);
const search = ref("");
const showLoader = ref(true);
const notFound = ref(false);
const isSearching = ref(false);
const count = ref(0);

const filterDate = ref("");
const selectedYear = ref("");
const selectedMonth = ref();
const filterStatus = ref("");
const filterArr = ref([]);

onMounted(async () => {
  await getOrders();
});

function calcCount() {
  count.value = 0;
  orders.value.forEach((el) => {
    el.status === "нове" ? (count.value += 1) : count.value;
  });

  return emit("count", "orders", count.value);
}

async function getOrders() {
  if (isSearching.value) return;

  showLoader.value = false;
  isSearching.value = true;

  try {
    const response = await axios.get(`${apiUrl}/order/all-orders`, {
      params: {
        page: currentPage.value,
        search: search.value,
        year: selectedYear.value || "",
        month: selectedMonth.value || "",
        status: filterStatus.value || "",
      },
    });

    orders.value = response.data.orders;
    totalPage.value = response.data.totalPages;
    notFound.value = response.data.notFound;

    calcCount();

    if (notFound.value && !search.value) {
    } else if (notFound.value) {
      setTimeout(async () => {
        notFound.value = false;
        search.value = "";

        await getOrders();
      }, 2000);
    } else {
      showLoader.value = true;
    }
  } catch (error) {
    console.error("Помилка при отриманні замовлень", error);
  } finally {
    isSearching.value = false;
  }
}

async function getSelectValue(event, id) {
  status.value = event.target.value;
  const idx = orders.value.findIndex((el) => el.order_id == id);
  orders.value[idx].status = event.target.value;

  try {
    const response = await axios.put(
      `${apiUrl}/order/change-status/${id}?status=${status.value}`
    );

    calcCount();
  } catch (error) {
    console.error(error);
  }
}

async function removeItem(id, parentId) {
  const parentIdx = orders.value.findIndex((el) => el.order_id === parentId);

  if (parentIdx === -1) {
    console.error("Parent order not found");
    return;
  }

  const idx = orders.value[parentIdx].orderItem.findIndex(
    (el) => el.item_id === id
  );

  if (idx === -1) {
    console.error("Item not found in order");
    return;
  }

  const totalPrice = ref(
    updatedTotalPrice.value === null
      ? orders.value[parentIdx].total_price
      : updatedTotalPrice
  );

  const price = ref(orders.value[parentIdx].orderItem[idx].price);

  updatedTotalPrice.value = totalPrice.value - price.value;

  orders.value[parentIdx].orderItem.splice(idx, 1);

  try {
    const response = await axios.put(
      `${apiUrl}/order/delete/${parentId}/${id}?totalPrice=${updatedTotalPrice.value}`
    );
  } catch (error) {
    console.error("Error updating the order:", error);
  }
}

async function getCalendarDate(date) {
  const year = date.year;
  const month = String(date.month + 1).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  filterDate.value = `${year}-${month}-${day}`;

  await getOrders();
}

async function filterProductsByMonth(year, month) {
  selectedYear.value = year;
  selectedMonth.value = month + 1;

  await getOrders();
}

async function handlerFilterSelectValue(event) {
  filterStatus.value = event.target.value;

  await getOrders();
}

async function clearFilters() {
  filterDate.value = "";
  filterStatus.value = "";
  selectedYear.value = "";
  selectedMonth.value = "";

  await getOrders();
}

async function removeOrder(id) {
  const idx = orders.value.findIndex((el) => el.order_id === id);

  if (idx === -1) {
    console.error("Item not found in order");
    return;
  }
  orders.value.splice(idx, 1);

  try {
    const response = await axios.delete(`${apiUrl}/order/delete/${id}`);
    calcCount();
  } catch (error) {
    console.error("Error updating the order:", error);
  }
}

async function focusAdminOrder(event) {
  event.target.value = event.target.value.replace(/[^0-9+]/g, "");

  if (!event.target.value.startsWith("+380")) {
    event.target.value =
      "+380" + event.target.value.replace(/[^0-9]/g, "").substring(3);
  }
}

async function searchAdminOrder(event) {
  search.value = event.target.value;

  setTimeout(async () => {
    await getOrders();
  }, 500);
}

async function changePage(page) {
  currentPage.value = page;
  scrollToTop();

  setTimeout(async () => {
    await getOrders();
  }, 500);
}

async function nextPage() {
  currentPage.value++;
  scrollToTop();

  setTimeout(async () => {
    await getOrders();
  }, 500);
}

async function prevPage() {
  currentPage.value--;
  scrollToTop();

  setTimeout(async () => {
    await getOrders();
  }, 500);
}
</script>

<style lang="scss" scoped>
.orders {
  padding-top: 100px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__search {
    input {
      width: 100%;
    }
  }
}

table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 3px;
    text-align: left;
    vertical-align: middle;
    font-size: 12px;
    cursor: pointer;

    svg {
      width: 40px;
    }

    button {
      width: 50%;
    }
  }

  tr {
    border: 1px solid #ddd;
  }

  h2 {
    font-size: 12px;
  }

  img {
    width: 75px;
    height: auto;
    display: block;
  }

  svg {
    width: 50px;
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

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.person {
  display: flex;
  flex-direction: column;
  gap: 5px;

  &__title {
    display: flex;
    align-items: baseline;
    gap: 7px;
  }
}

.order {
  display: flex;
  gap: 10px;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
}

select {
  padding: 10px;
  border-radius: 15px;
  font-weight: 600;
}

.new {
  background-color: rgba(144, 238, 144, 0.5);
}

.accepted {
  background: antiquewhite;
}

.done {
  background: aliceblue;
}

.canceled {
  background-color: rgb(236, 183, 83);
  color: white;
}

.return {
  background-color: darkred;
  color: white;
}

.price {
  width: 60px;
  text-align: center;
  padding: 4px;
  font-weight: 700;
  background: #e8e8f3;
  border-radius: 20px;
}

.filters {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;

  button {
    padding: 10px;
    width: 150px;
  }
}

@media screen and (max-width: 991px) {
  .orders {
    padding-top: 50px;
  }
  table {
    display: flex;
    thead {
      display: none;
    }

    tr {
      position: relative;
      padding: 20px;
      display: flex;
      flex-direction: column;

      td {
        div,
        select,
        h2 {
          width: 100%;
        }

        select {
          padding: 10px;
        }

        .person__title {
          flex-direction: column;
        }

        svg {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .filters {
    justify-content: center;
  }
}
</style>
