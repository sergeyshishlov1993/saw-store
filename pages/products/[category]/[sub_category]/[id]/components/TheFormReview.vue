<template>
  <form @submit.prevent="(event) => leaveFeedback(event)">
    <ui-input
      name="nikname"
      placeholder="Ваше імʼя"
      :value="nikname"
      autocomplete="off"
      @focus="(event) => handleFocus('nikname', event)"
      @input="(event) => getInputValue('nikname', event)"
      @blur="(event) => handleBlur('nikname', event)"
      :class="{ invalid: errorsFormData?.nikname?.errors.length != 0 }"
    />

    <ui-error
      v-for="error in errorsFormData?.review?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-text-aria
      name="review"
      placeholder="Ваш відгук"
      :value="review"
      autocomplete="off"
      @focus="(event) => handleFocus('review', event)"
      @input="(event) => getInputValue('review', event)"
      @blur="(event) => handleBlur('review', event)"
      :class="{ invalid: errorsFormData?.review?.errors.length != 0 }"
    />

    <ui-error
      v-for="error in errorsFormData?.review?.errors ?? []"
      :key="error"
      :text="error"
    />

    <div class="star" v-if="!props.reviewId">
      <ui-text-h2>Оцініть Товар</ui-text-h2>

      <the-star-counter
        :starsCount="starsCount"
        :rate="currentRate"
        @changeStar="(emitParam) => countLikeStar(emitParam)"
      />
    </div>

    <ui-btn>Відправити</ui-btn>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";

import TheStarCounter from "./TheStarCounter.vue";
import axios from "axios";
import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";

onMounted(() => {
  const storedNickname = localStorage.getItem("nickname");

  if (storedNickname) {
    nikname.value = storedNickname;
  } else {
    return;
  }
});

const props = defineProps({
  product_id: {
    type: String,
  },

  reviewId: {
    type: String,
  },
});

const emit = defineEmits(["addReview"]);

const nikname = ref("");
const review = ref("");
const starsCount = ref(5);
const currentRate = ref(0);
const apiUrl = import.meta.env.VITE_API_URL;

function handleFocus(name, event) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;
}

function getInputValue(name, event) {
  switch (name) {
    case "nikname":
      nikname.value = event.target.value;
      validateField(nikname.value, "nikname");
      break;

    case "review":
      review.value = event.target.value;
      validateField(review.value, "review");
      break;
  }
}

function handleBlur(event, n) {
  switch (n) {
    case "nikname":
      nikname.value = event.target.value;
      validateField(nikname.value, "nikname");
      break;

    case "review":
      review.value = event.target.value;
      validateField(review.value, "review");
      break;
  }
}

function doValidateForm() {
  createErrorObj("nikname");
  createErrorObj("review");

  validateField(nikname.value, "nikname");
  validateField(review.value, "review");
}

function isFormValid() {
  return Object.values(errorsFormData).some((e) => {
    return e.errors.length > 0;
  });
}

function countLikeStar(emitParam) {
  currentRate.value = emitParam;
}

function manageNickname(nickname) {
  localStorage.setItem("nickname", nickname);
  console.log("Нове значення додано у localStorage:", nickname);
}

async function leaveFeedback(event) {
  try {
    doValidateForm();

    if (!isFormValid()) {
      const data = {
        nikname: nikname.value,
        review: review.value,
        rating: currentRate.value,
      };

      if (props.reviewId) {
        const response = await axios.post(
          `${apiUrl}/products/${props.product_id}/review/${props.reviewId}/responses`,
          data
        );
      } else {
        const response = await axios.post(
          `${apiUrl}/products/${props.product_id}/review`,
          data
        );
      }

      emit("addReview", {
        createdAt: new Date(),
        user_name: nikname.value,
        comment: review.value,
        rating: currentRate.value,
      });

      manageNickname(nikname.value);

      event.target.reset();
      currentRate.value = 0;
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 500px;
}

.star {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
