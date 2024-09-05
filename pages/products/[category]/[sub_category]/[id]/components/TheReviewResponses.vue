<template>
  <div class="review_response">
    <div class="person">
      <div class="person__wrapper">
        <icon-response-admin
          v-if="!!props.admin_response || props.nikname === 'saw store'"
        />
        <icon-person v-else />

        <div class="person__title">
          <ui-text-h5>{{ props.nikname }}</ui-text-h5>
        </div>
      </div>

      <ui-text-h5>{{ formattedDate }}</ui-text-h5>
    </div>

    <ui-text-h5 class="comment">
      {{ props.comment }}
    </ui-text-h5>

    <ui-btn v-if="isAdmin" @click="deleteResponse">
      <icon-close />
      Видалити
    </ui-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import IconPerson from "~/assets/icons/IconPerson.vue";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import IconResponseAdmin from "~/assets/icons/IconResponseAdmin.vue";
import IconClose from "~/assets/icons/IconClose.vue";
const route = useRoute();
const isAdmin = ref(route.path.startsWith("/admin"));

const emit = defineEmits(["deleteResponse"]);
const props = defineProps({
  productId: {
    type: String,
  },

  reviewId: {
    type: String,
  },

  responseId: {
    type: String,
  },

  nikname: {
    type: String,
  },

  comment: {
    type: String,
  },

  admin_response: {
    type: String,
  },

  dataCreate: {
    type: Date,
  },
});
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;
let dateStr = props.dataCreate;
let date = new Date(dateStr);

let formattedDate = date.toLocaleDateString("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

async function deleteResponse() {
  try {
    const response = await axios.delete(
      `${apiUrl}/admin/products/${props.productId}/review/${props.reviewId}/${props.responseId}`
    );

    emit("deleteResponse", props.responseId);
  } catch (error) {
    console.error(`Ошибка при удаления ответа: ${props.responseId}`, error);
  }
}
</script>

<style lang="scss" scoped>
.review_response {
  width: 600px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    align-self: self-start;
    border: none;

    svg {
      width: 25px;
    }
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
  }
}

.comment {
  line-height: 30px;
}

@media screen and (max-width: 991px) {
  .review_response {
    padding-top: 50px;
    width: 100%;

    .person {
      align-items: center;

      &__wrapper {
        justify-content: space-between;
        gap: 10px;

        svg {
          width: 25px;
        }
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
</style>
