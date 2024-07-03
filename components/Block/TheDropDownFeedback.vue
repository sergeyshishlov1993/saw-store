<template>
  <div class="feedback" :class="{ open: openDrop }">
    <div class="feedback__phone">
      <icon-phone />
      <a href="tel:+380999999999">+380999999999</a>

      <icon-chevron-up v-if="openDrop" @click="openDrop = !openDrop" />
      <icon-chewron-down v-else @click="openDrop = !openDrop" />
    </div>

    <div class="feedback__info">
      <ui-text-h4 class="title">Прийом дзвінків</ui-text-h4>
      <ui-text-h6>Пн - Пт 09:00 - 20:00</ui-text-h6>
      <ui-text-h6>Сб - Вс 09:00 - 17:00</ui-text-h6>

      <form @submit.prevent="sendFeedback">
        <ui-input
          name="name"
          placeholder="Імʼя"
          :value="name"
          @focus="(event) => handleFocus(event, 'name')"
          @input="(event) => getInputValue(event, 'name')"
          @blur="(event) => handleBlur(event, 'name')"
          :class="{ invalid: errorsFormData?.name?.errors.length != 0 }"
        />
        <ui-error
          v-for="error in errorsFormData?.name?.errors ?? []"
          :key="error"
          :text="error"
        />
        <ui-input
          name="phone"
          placeholder="+380"
          :value="phone"
          type="phone"
          maxlength="13"
          minlength="13"
          @focus="(event) => handleFocus(event, 'phone')"
          @input="(event) => getInputValue(event, 'phone')"
          @blur="(event) => handleBlur(event, 'phone')"
          :class="{ invalid: errorsFormData?.phone?.errors.length != 0 }"
        />

        <ui-error
          v-for="error in errorsFormData?.phone?.errors ?? []"
          :key="error"
          :text="error"
        />

        <ui-btn>Передзвонити</ui-btn>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import UiTextH4 from "../Ui/UiTextH4.vue";
import UiTextH6 from "../Ui/UiTextH6.vue";
import UiInput from "../Ui/UiInput.vue";
import UiBtn from "../Ui/UiBtn.vue";
import IconChevronUp from "~/assets/icons/IconChevronUp.vue";
import IconChewronDown from "~/assets/icons/IconChewronDown.vue";
import IconPhone from "~/assets/icons/IconPhone.vue";
import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";

const name = ref("");
const phone = ref("+380");
const openDrop = ref(false);

function handleFocus(event, name) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;
}

const getInputValue = (event, n) => {
  switch (n) {
    case "name":
      name.value = event.target.value;
      break;

    case "phone":
      event.target.value = event.target.value.replace(/[^0-9+]/g, "");
      if (!event.target.value.startsWith("+380")) {
        event.target.value =
          "+380" + event.target.value.replace(/[^0-9]/g, "").substring(3);
      }
      phone.value = event.target.value;

      break;
  }
};

function handleBlur(event, n) {
  switch (n) {
    case "name":
      validateField((name.value = event.target.value), n);
      break;

    case "phone":
      validateField((phone.value = event.target.value), n);
      break;
  }
}

function doValidateForm() {
  createErrorObj("name");
  createErrorObj("phone");

  validateField(name.value, "name");
  validateField(phone.value, "phone");
}

function isFormValid() {
  return Object.values(errorsFormData).some((e) => {
    return e.errors.length > 0;
  });
}

const sendFeedback = async () => {
  doValidateForm();
  try {
    if (!isFormValid()) {
      const data = {
        name: name.value,
        phone: phone.value,
      };
      const response = await axios.post(`http://localhost:8000/feedback`, data);

      name.value = "";
      phone.value = "";
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
};
</script>

<style lang="scss" scoped>
.feedback {
  position: absolute;
  top: 40px;
  right: 15px;
  overflow: hidden;
  height: 50px;
  padding: 20px;
  background: #000;
  width: 250px;
  border-radius: 20px;

  &__phone {
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      width: 30px;
      fill: white;
    }

    a {
      color: #fff;
      &:hover {
        color: rgb(203, 24, 24);
      }
    }
  }

  &__info {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .title {
      color: rgb(203, 24, 24);
      font-size: 16px;
      font-weight: 600;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}

.open {
  overflow: visible;
  height: auto;
  h2 {
    color: white;
  }

  button {
    border: 1px solid white;
    color: white;
  }
}
</style>
