<template>
  <div class="container">
    <the-modal-sucses notificationText="feedback" v-if="showSuccessModal" />

    <div class="form__wrapper" v-else>
      <div>
        <ui-text-h2 id="title">{{ props.titleForm }}</ui-text-h2>
        <ui-text-h5 id="text"
          >Вкажіть свій номер телефону і ми з Вами зв'яжемося найближчим
          часом</ui-text-h5
        >
      </div>

      <form @submit.prevent="sendFeedback">
        <div class="error__wrapper">
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
        </div>

        <div class="error__wrapper">
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
        </div>

        <ui-btn>Надіслати</ui-btn>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import UiTextH2 from "../Ui/UiTextH2.vue";
import UiTextH5 from "../Ui/UiTextH5.vue";
import UiInput from "../Ui/UiInput.vue";
import UiError from "../Ui/UiError.vue";
import UiBtn from "../Ui/UiBtn.vue";

import TheModalSucses from "~/components/Block/TheModalSucses.vue";
import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";

const name = ref("");
const phone = ref("+380");
const props = defineProps({
  titleForm: {
    type: String,
  },
});
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;
const showSuccessModal = ref(false);

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
      const response = await axios.post(`${apiUrl}/feedback`, data);

      name.value = "";
      phone.value = "";
    }

    showSuccessModal.value = true;

    setTimeout(() => {
      showSuccessModal.value = false;
    }, 1000);
  } catch (error) {
    console.error("Ошибка:", error);
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 200px;
}
.form__wrapper {
  margin-top: 88px;
  padding: 50px 100px;
  width: 100%;
  height: 300px;
  background: rgba(218, 223, 228, 1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: -1px 2px 20px -6px rgba(0, 0, 0, 0.75);

  form {
    display: flex;
    align-items: center;
    gap: 40px;
  }
}

#title {
  color: rgba(59, 84, 96, 1);

  font-size: 21px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0.23999999463558197px;
}

#text {
  margin-top: 10px;
  color: rgba(35, 31, 32, 1);
  line-height: 24px;
}

@media screen and (max-width: 1199px) {
  .form__wrapper {
    flex-direction: column;
  }
}

@media screen and (max-width: 991px) {
  .form__wrapper {
    form {
      gap: 15px;

      input {
        width: 160px;
      }

      button {
        width: 160px;
      }
    }
  }
}

@media screen and (max-width: 769px) {
  .container {
    padding-bottom: 50px;
  }

  .form__wrapper {
    display: none;
  }
}
</style>
