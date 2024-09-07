<template>
  <div class="review">
    <div class="person">
      <div class="person__wrapper">
        <icon-person />

        <div class="person__title">
          <ui-text-h5>{{ props.nikname }}</ui-text-h5>
          <the-star-counter :rate="Number(props.rating)" />
        </div>
      </div>

      <ui-text-h5>{{ formattedDate }}</ui-text-h5>
    </div>

    <ui-text-h5 class="comment">
      {{ props.comment }}
    </ui-text-h5>

    <div v-if="props.reviewId" class="button__wrapper">
      <ui-btn @click="showResponseForm = !showResponseForm">
        <icon-arrow-response /> Відповісти</ui-btn
      >
      <ui-btn v-if="isAdmin" @click="deleteReview">
        <icon-close />
        Видалити
      </ui-btn>
    </div>

    <!-- <-------ответ на отзывы -->
    <div class="response">
      <div v-if="showAllResponse" class="response__wrapper">
        <the-review-responses
          v-for="response in reviewResponse"
          :key="response.response_id"
          :id="response.response_id"
          :nikname="response.user_name"
          :dataCreate="response.createdAt"
          :comment="response.comment"
          :admin_response="response.admin_response"
        />

        <ui-btn class="response_btn" @click="showAllResponse = !showAllResponse"
          >приховати відповіді</ui-btn
        >
      </div>

      <div v-else class="response__wrapper">
        <the-review-responses
          v-for="response in firstResponse"
          :key="response.response_id"
          :nikname="response.user_name"
          :dataCreate="response.createdAt"
          :comment="response.comment"
          :responseId="response.response_id"
          :productId="props.productId"
          :reviewId="props.reviewId"
          @deleteResponse="deleteResponseClient"
        />

        <ui-btn class="response_btn" @click="getAllReviews" v-if="countResponses > 1"
          >переглянути всі відповіді
          <span>({{ countResponses }})</span>
        </ui-btn>
      </div>
    </div>

    <the-form-review
      v-if="showResponseForm"
      :reviewId="props.reviewId"
      @addReview="createResponse"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import IconPerson from "~/assets/icons/IconPerson.vue";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import TheStarCounter from "~/components/Block/TheStarCounter.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import IconArrowResponse from "~/assets/icons/IconArrowResponse.vue";
import IconClose from "~/assets/icons/IconClose.vue";
import TheFormReview from "./TheFormReview.vue";
import TheReviewResponses from "./TheReviewResponses.vue";

const route = useRoute();
const isAdmin = ref(route.path.startsWith("/admin"));

onMounted(async () => {
  await nextTick();
  await getReviewsResponse();
});

const currentOffset = ref(0);
const reviewResponse = ref([]);
const firstResponse = ref();
const showAllResponse = ref(false);
const countResponses = ref(0);

const emit = defineEmits(["deleteReview"]);
const props = defineProps({
  nikname: String,
  rating: String,
  comment: String,
  dataCreate: String,
  reviewId: String,
  reviewResponses: Array,
  productId: String,
});
const showResponseForm = ref(false);
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

let dateStr = props.dataCreate;
let date = new Date(dateStr);
let formattedDate = date.toLocaleDateString("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

async function createResponse(data) {
  if (firstResponse.value.length === 0) {
    firstResponse.value.push(data);
    countResponses.value += 1;
    await getReviewsResponse();
  } else {
    reviewResponse.value.push(data);
    countResponses.value += 1;

    await getReviewsResponse();
  }

  return (showResponseForm.value = false);
}

async function getReviewsResponse() {
  try {
    if (props.reviewId) {
      const response = await axios.get(
        `${apiUrl}/products/${props.productId}/review/${props.reviewId}/responses?offset=${currentOffset.value}`
      );

      firstResponse.value = response.data.reviewResponse;
      countResponses.value = response.data.totalResponses;
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

async function getAllReviews() {
  try {
    const response = await axios.get(
      `${apiUrl}/products/${props.id}/review/${props.reviewId}/responses?all=true`
    );

    reviewResponse.value = response.data.reviewResponse;

    showAllResponse.value = true;
  } catch (error) {
    console.error("Ошибка при загрузке всех отзывов:", error);
  }
}

async function deleteReview() {
  try {
    const response = await axios.delete(
      `${apiUrl}/admin/products/review/${props.reviewId}`
    );

    emit("deleteReview", props.reviewId);
  } catch (error) {
    console.error(`Ошибка при удаления отзыва: ${props.reviewId}`, error);
  }
}

function deleteResponseClient(id) {
  const idx = firstResponse.value.findIndex((el) => {
    return el.response_id === id;
  });

  firstResponse.value.splice(idx, 1);
  countResponses.value--;
}
</script>

<style lang="scss" scoped>
.review {
  padding-top: 30px;
  width: 75%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-bottom: 1px solid rgb(232, 221, 221);

  .button__wrapper {
    display: flex;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    align-self: self-start;
    height: 40px;
    border: none;

    svg {
      width: 25px;
    }
  }

  form {
    align-self: self-end;
  }
}
.person {
  display: flex;
  justify-content: space-between;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 20px;

    svg {
      width: 50px;
    }
  }
  &__title {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.comment {
  line-height: 30px;
}

.response {
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 45px;

  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &_btn {
    align-self: center !important;
    width: 250px;
    font-weight: 500;
    span {
      font-size: 18px;
      font-weight: 700;
    }
  }
}

@media screen and (max-width: 991px) {
  .review {
    width: 100%;
    gap: 20px;
  }

  .person {
    &__wrapper {
      svg {
        width: 30px;
      }
    }
    &__title {
      gap: 5px;
    }
  }
}

@media screen and (max-width: 767px) {
  .review {
    gap: 10px;
  }

  .response {
    &_btn {
      font-size: 13px;
      gap: 5px !important;

      span {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
}
</style>
