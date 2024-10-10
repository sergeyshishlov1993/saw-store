<template>
  <div class="login">
    <form @submit.prevent="login">
      <ui-text-h3>Вхід</ui-text-h3>
      <ui-input
        placeholder="user"
        type="text"
        @focus="(event) => handleFocus(event, 'user')"
        @input="(event) => getInputValue(event, 'user')"
        @blur="(event) => handleBlur(event, 'user')"
        :value="userName"
        :class="{ invalid: errorsFormData?.user?.errors.length != 0 }"
      />

      <ui-error
        v-for="error in errorsFormData?.user?.errors ?? []"
        :key="error"
        :text="error"
      />

      <ui-input
        placeholder="password"
        type="password"
        @focus="(event) => handleFocus(event, 'password')"
        @input="(event) => getInputValue(event, 'password')"
        @blur="(event) => handleBlur(event, 'password')"
        :value="password"
      />

      <ui-error
        v-for="error in errorsFormData?.password?.errors ?? []"
        :key="error"
        :text="error"
      />
      <ui-btn>Вхід</ui-btn>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import UiTextH3 from "~/components/Ui/UiTextH3.vue";
import UiInput from "~/components/Ui/UiInput.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";

const emit = defineEmits(["auth"]);
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;
const userName = ref("");
const password = ref("");

onMounted(async () => {
  await checkTokenExpiration();
});

function handleFocus(event, name) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;
}

function getInputValue(event, name) {
  switch (name) {
    case "user":
      userName.value = event.target.value;
      break;

    case "password":
      password.value = event.target.value;
      break;
  }
}

function handleBlur(event, n) {
  switch (n) {
    case "user":
      validateField((userName.value = event.target.value), n);
      break;

    case "password":
      validateField((password.value = event.target.value), n);
      break;
  }
}

function doValidateForm() {
  createErrorObj("user");
  createErrorObj("password");

  validateField(userName.value, "user");
  validateField(password.value, "password");
}

function isFormValid() {
  return Object.values(errorsFormData).some((e) => {
    return e.errors.length > 0;
  });
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await axios.post(`${apiUrl}/admin/login/token`, {
      token: refreshToken,
    });

    console.log("response", response);

    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);

      const newAccessTokenExpires = new Date(
        new Date().getTime() + 3600 * 1000
      );
      localStorage.setItem(
        "accessTokenExpires",
        newAccessTokenExpires.toISOString()
      );

      console.log("Access token has been refreshed.");
      emit("auth", true);
      return response.data.accessToken;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    console.log("Error occurred during token refresh");
  }
}

function checkTokenExpiration() {
  const accessTokenExpires = new Date(
    localStorage.getItem("accessTokenExpires")
  );
  const refreshTokenExpires = new Date(
    localStorage.getItem("refreshTokenExpires")
  );

  if (new Date() > accessTokenExpires) {
    console.log("время вышло обновить");
    refreshAccessToken();
  } else if (new Date() > refreshTokenExpires) {
    console.log("Refresh token expired. Need to login again.");

    emit("logout");
  } else {
    emit("auth", true);

    console.log("Зареган");
  }
}

async function login() {
  doValidateForm();
  if (!isFormValid()) {
    try {
      const response = await axios.post(`${apiUrl}/admin/login`, {
        username: userName.value,
        password: password.value,
      });

      if (response.status === 200) {
        const accessTokenExpires = new Date(new Date().getTime() + 3600 * 1000);
        const refreshTokenExpires = new Date(
          new Date().getTime() + 604800 * 1000
        );

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem(
          "accessTokenExpires",
          accessTokenExpires.toISOString()
        );
        localStorage.setItem(
          "refreshTokenExpires",
          refreshTokenExpires.toISOString()
        );

        emit("auth", true);

        userName.value = "";
        password.value = "";
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 50px;
  width: 600px;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  input {
    width: 100%;
  }
}

@media screen and (max-width: 991px) {
  .login {
    width: 500px;
    form {
      h2 {
        font-size: 16px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .login {
    padding: 20px;
    width: 400px;

    form {
      gap: 10px;
    }
  }
}

@media screen and (max-width: 426px) {
  .login {
    width: 300px;
  }
}
</style>
