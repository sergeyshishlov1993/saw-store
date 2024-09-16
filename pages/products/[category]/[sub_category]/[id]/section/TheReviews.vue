<template>
  <div class="reviews">
    <ui-text-h2 class="title"
      >Відгуки <span v-if="!props.reviews">({{ totalReviews }})</span>
    </ui-text-h2>

    <ui-btn @click="showFormReview = !showFormReview">
      <icon-pensil />
      залишити відгук
    </ui-btn>

    <the-form-review
      v-if="showFormReview"
      :product_id="props.id"
      @addReview="createReview"
    />

    <div v-if="reviews.length">
      <the-review
        v-for="review in reviews"
        :key="review.review_id"
        :nikname="review.user_name"
        :dataCreate="review.createdAt"
        :comment="review.comment"
        :rating="review.rating"
        :reviewId="review.review_id"
        :reviewResponses="review.reviewResponses"
        :productId="props.id"
        @deleteReview="deleteReviewClient"
      />

      <div
        class="wrapper__pagination"
        v-if="props.currentTab == 'Відгуки' && totalPageCount > 1"
      >
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

      <ui-text-h4
        class="show_more_reviews"
        v-if="props.reviews"
        @click="showMoreReviews"
      >
        Показати всі відгуки
      </ui-text-h4>
    </div>

    <div v-else class="message">
      <ui-text-h2> Цей товар поки що не отримав відгуків ! </ui-text-h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import UiBtn from "~/components/Ui/UiBtn.vue";
import IconPensil from "~/assets/icons/IconPensil.vue";
import UiTextH2 from "~/components/Ui/UiTextH2.vue";
import UiTextH4 from "~/components/Ui/UiTextH4.vue";
const { showScrollToTop, scrollToTop } = useScrollToTop();

import TheFormReview from "../components/TheFormReview.vue";
import TheReview from "../components/TheReview.vue";
import IconChevronLeft from "~/assets/icons/IconChevronLeft.vue";
import IconChevronNext from "~/assets/icons/IconChevronNext.vue";
import ThePagination from "~/components/Block/ThePagination.vue";

const showFormReview = ref(false);
const currentOffset = ref(0);
const reviews = ref([]);
const currentPage = ref(1);
const totalPageCount = ref();
const totalReviews = ref();
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

onMounted(async () => {
  if (props.reviews) {
    reviews.value = props.reviews;
  } else {
    await getReviews();
  }
});

const emit = defineEmits(["moreReviews", "counReviews"]);
const props = defineProps({
  reviews: Array,
  id: String,
  currentTab: String,
});

async function createReview(date) {
  reviews.value.push(date);
  totalReviews.value += 1;
  showFormReview.value = false;

  emit("counReviews", totalReviews.value);

  await getReviews();
}

async function getReviews(page = 1) {
  try {
    const limit = 5;
    const offset = (page - 1) * limit;

    const response = await axios.get(
      `${apiUrl}/products/${props.id}/review?offset=${offset}&limit=${limit}`
    );

    reviews.value = response.data.reviews;
    currentOffset.value = offset;
    totalPageCount.value = response.data.totalPages;
    currentPage.value = response.data.currentPage;
    totalReviews.value = response.data.total;

    scrollToTop();
  } catch (error) {
    console.error("Помилка:", error);
  }
}

async function changePage(page) {
  await getReviews(page);
}

async function nextPage() {
  if (currentPage.value < totalPageCount.value) {
    await getReviews(currentPage.value + 1);
  }
}

async function prevPage() {
  if (currentPage.value > 1) {
    await getReviews(currentPage.value - 1);
  }
}

const showMoreReviews = () => {
  emit("moreReviews", "Відгуки");
  scrollToTop();
};

function deleteReviewClient(id) {
  const idx = reviews.value.findIndex((el) => {
    return el.review_id === id;
  });

  reviews.value.splice(idx, 1);
}
</script>

<style lang="scss" scoped>
.reviews {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 75%;

  button {
    svg {
      width: 20px;
    }
  }
}

.title {
  font-weight: 700;
  span {
    font-weight: 500;
    font-size: 24px;
  }
}

.message {
  padding-top: 100px;

  h2 {
    font-size: 30px;
  }
}

.show_more_reviews {
  margin-top: 50px;
  cursor: pointer;
  text-decoration: underline;
  transition: font-weight 0.3s ease;
  &:hover {
    font-weight: 700;
  }
}

.wrapper__pagination {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

@media screen and (max-width: 991px) {
  .reviews {
    padding-top: 50px;
    width: 100%;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      width: 200px;
      height: 40px;

      svg {
        width: 15px;
      }
    }
  }

  .title {
    font-size: 18px;
  }

  .message {
    padding-top: 30px;

    h2 {
      font-size: 18px;
    }
  }
}

.show_more_reviews {
  font-size: 14px;
}

@media screen and (max-width: 767px) {
  .reviews {
    gap: 30px;
  }

  .title {
    font-size: 16px;
  }

  .message {
    padding-top: 20px;
    h2 {
      font-size: 14px;
    }
  }
}

@media (hover: none) {
  .show_more_reviews:hover {
    background-color: initial;
    color: initial;
  }
}
</style>
