<template>
  <div class="reviews">
    <ui-text-h2 class="title"
      >Відгуки <span v-if="!props.reviews">({{ reviews.length }})</span>
    </ui-text-h2>

    <ui-btn @click="showFormReview = !showFormReview" v-if="isAdmin">
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

      <ui-btn @click="getReviews" id="load-more-button" v-if="!props.reviews"
        >Переглянути ще відгуки</ui-btn
      >

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

const showFormReview = ref(false);
const currentOffset = ref(0);
const reviews = ref([]);

onMounted(async () => {
  if (props.reviews) {
    reviews.value = props.reviews;
  } else {
    await getReviews();
  }
});

const emit = defineEmits(["moreReviews"]);
const props = defineProps({
  reviews: {
    type: Array,
  },

  id: {
    type: String,
  },
});

function createReview(date) {
  reviews.value.push(date);
  showFormReview.value = false;
}

async function getReviews() {
  try {
    const response = await axios.get(
      `http://localhost:8000/products/${props.id}/review?offset=${currentOffset.value}`
    );

    reviews.value = response.data.reviews;

    currentOffset.value += response.data.reviews.length;

    scrollToTop();

    if (response.data.reviews.length < 5) {
      currentOffset.value = 0;
    }
  } catch (error) {
    console.error("Ошибка:", error);
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
  padding-top: 150px;
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
</style>
