<template>
  <form @submit.prevent="buyOrder" autocomplete="off">
    <ui-text-h3
      ><span>
        <ui-text-h4>1</ui-text-h4>
      </span>
      Контактні дані</ui-text-h3
    >

    <ui-input
      type="text"
      name="firstName"
      placeholder="Ваше імʼя"
      class="customInput"
      :value="firstName"
      @focus="(event) => handleFocus('firstName', event.target.value)"
      @input="(event) => getInputValue('firstName', event.target.value)"
      @blur="(event) => handleBlur('firstName', event.target.value)"
      :class="{ invalid: errorsFormData?.firstName?.errors.length != 0 }"
    />

    <ui-error
      v-for="error in errorsFormData?.firstName?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      type="text"
      name="secondName"
      placeholder="Ваше призвіще"
      :value="secondName"
      class="customInput"
      @focus="(event) => handleFocus('secondName', event.target.value)"
      @input="(event) => getInputValue('secondName', event.target.value)"
      @blur="(event) => handleBlur('secondName', event.target.value)"
      :class="{ invalid: errorsFormData?.secondName?.errors.length != 0 }"
    />

    <ui-error
      v-for="error in errorsFormData?.secondName?.errors ?? []"
      :key="error"
      :text="error"
    />

    <ui-input
      type="phone"
      name="phone"
      placeholder="+380"
      class="customInput"
      maxlength="13"
      minlength="13"
      :value="phone"
      @focus="(event) => handleFocus('phone', event.target.value)"
      @input="(event) => getInputValue('phone', event)"
      @blur="(event) => handleBlur('phone', event.target.value)"
      :class="{ invalid: errorsFormData?.phone?.errors.length != 0 }"
    />

    <ui-error
      v-for="error in errorsFormData?.phone?.errors ?? []"
      :key="error"
      :text="error"
    />

    <!-- ---------------------------------- -->
    <ui-text-h3
      ><span>
        <ui-text-h4>2</ui-text-h4>
      </span>
      Доставка "Нова Пошта"</ui-text-h3
    >

    <div class="input__wrapper">
      <input
        type="radio"
        id="Branch"
        name="newPost"
        value="841339c7-591a-42e2-8233-7a0a00f0ed6f"
        v-model="typeWarehouses"
      />
      <label for="Branch">у відділення</label>
    </div>

    <div class="input__wrapper">
      <input
        type="radio"
        id="BranchСargo"
        name="newPost"
        value="9a68df70-0267-42a8-bb5c-37f427e36ee4"
        v-model="typeWarehouses"
      />
      <label for="BranchСargo">у вантажне відділення</label>
    </div>

    <div class="input__wrapper">
      <input
        type="radio"
        id="Courier"
        name="newPost"
        value="Courier"
        v-model="typeWarehouses"
      />
      <label for="Courier">кур'єром за адресою</label>
    </div>

    <div class="input__wrapper">
      <input
        type="radio"
        id="Postomat"
        name="newPost"
        value="f9316480-5f2d-425d-bc2c-ac7cd29decf0"
        v-model="typeWarehouses"
      />
      <label for="Postomat">у поштомат</label>
    </div>

    <!-- ---------------город------------------- -->
    <div class="delivery__wrapper">
      <ui-input
        name="city"
        placeholder="Ваше місто"
        class="customInput"
        :value="city"
        @focus="(event) => handleFocus('city', event)"
        @input="(event) => getInputValue('city', event.target.value)"
        @blur="(event) => handleBlur('city', event.target.value)"
        :class="{ invalid: errorsFormData?.city?.errors.length != 0 }"
      />

      <ui-error
        v-for="error in errorsFormData?.city?.errors ?? []"
        :key="error"
        :text="error"
      />

      <ui-drop-down
        @selectCity="getCityValue"
        :value="cityList"
        name="cityList"
        :show="showDropCity"
      />
    </div>

    <!-- ---------------отделение------------------- -->
    <div class="delivery__wrapper">
      <ui-input
        placeholder="Ваше віділення"
        class="customInput"
        name="warehouses"
        :value="warehouses"
        @focus="(event) => handleFocus('warehouses', event)"
        @input="(event) => getInputValue('warehouses', event.target.value)"
        @blur="(event) => handleBlur('warehouses', event.target.value)"
        :class="{ invalid: errorsFormData?.warehouses?.errors.length != 0 }"
      />

      <ui-error
        v-for="error in errorsFormData?.warehouses?.errors ?? []"
        :key="error"
        :text="error"
      />

      <ui-drop-down
        @selectCity="getCityValue"
        :value="warehousesList"
        :show="showDropWarehouses"
        name="warehousesList"
      />
    </div>

    <!-- ---------------------------------- -->

    <ui-text-h3
      ><span>
        <ui-text-h4>3</ui-text-h4>
      </span>
      Оплата
    </ui-text-h3>

    <div class="input__wrapper">
      <input
        type="radio"
        id="Післяплатою"
        name="payment"
        value="Післяплатою"
        v-model="payment"
      />
      <label for="Післяплатою">Післяплатою</label>
    </div>

    <div class="input__wrapper">
      <input
        type="radio"
        id="На розрахунковий рахунок ФОП"
        name="payment"
        value="На розрахунковий рахунок ФОП"
        v-model="payment"
      />
      <label for="На розрахунковий рахунок ФОП"
        >На розрахунковий рахунок ФОП</label
      >
    </div>

    <ui-btn :disabled="!productsInСart.length">Оформити замовлення</ui-btn>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import UiInput from "~/components/Ui/UiInput.vue";
import UiError from "~/components/Ui/UiError.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import UiTextH3 from "~/components/Ui/UiTextH3.vue";
import UiTextH4 from "~/components/Ui/UiTextH4.vue";
import UiDropDown from "~/components/Ui/UiDropDown.vue";

import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";
import { useCartData } from "~/stores/cartData";

const { productsInСart, totalPriceCart } = useCartData();

const emit = defineEmits(["show"]);

const firstName = ref("");
const secondName = ref("");
const phone = ref("+380");
const city = ref("");
const cityList = ref([]);
const cityRef = ref("");
const warehouses = ref();
const typeWarehouses = ref("841339c7-591a-42e2-8233-7a0a00f0ed6f");
const warehousesList = ref([]);
const showDropCity = ref(false);
const showDropWarehouses = ref(false);
const payment = ref("Післяплатою");

async function getCityValue(value, valueCity, show, name, type) {
  cityRef.value = value;

  if (name == "cityList") {
    city.value = valueCity;
    showDropCity.value = show;
    typeWarehouses.value = type;
    try {
      const response = await axios.post(
        "http://localhost:8000/nova-poshta/citi",
        {
          city: city.value,
          cityRef: cityRef.value,
          numberWarehouses: warehouses.value,
          type: typeWarehouses.value,
        }
      );

      warehousesList.value = [];

      response.data.warehouses.data.forEach((el) => {
        warehousesList.value.push({
          city: el.Description,
          cityRef: el.CityRef,
        });
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    warehouses.value = valueCity;
    showDropWarehouses.value = show;
  }
}

async function handleFocus(name, event) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;

  switch (name) {
    case "city":
      showDropCity.value = true;

      break;

    case "warehouses":
      showDropWarehouses.value = true;
      if (city.value) {
        warehousesList.value = [];
        await getWarehousesNovaPoshta();
      }

      break;
  }
}

async function getInputValue(name, event) {
  switch (name) {
    case "firstName":
      firstName.value = event;
      validateField(firstName.value, "firstName");
      break;

    case "secondName":
      secondName.value = event;
      validateField(secondName.value, "secondName");
      break;

    case "phone":
      event.target.value = event.target.value.replace(/[^0-9+]/g, "");

      if (!event.target.value.startsWith("+380")) {
        event.target.value =
          "+380" + event.target.value.replace(/[^0-9]/g, "").substring(3);
      }

      phone.value = event.target.value;
      validateField(phone.value, "phone");

      break;

    case "city":
      city.value = event;
      validateField(city.value, "city");

      if (city.value.length >= 3) {
        await getCityNovaPoshta();
      }

      break;

    case "warehouses":
      warehouses.value = event;

      await getWarehousesNovaPoshta();

      break;
  }
}

async function handleBlur(name, event) {
  switch (name) {
    case "firstName":
      firstName.value = event;
      validateField(firstName.value, "firstName");
      break;

    case "secondName":
      secondName.value = event;
      validateField(secondName.value, "secondName");
      break;

    case "phone":
      phone.value = event;
      validateField(phone.value, "phone");
      break;

    case "city":
      city.value = event;
      validateField(city.value, "city");

      if (city.value.length >= 3) {
        await getCityNovaPoshta();
      }

      break;

    case "warehouses":
      warehouses.value = event;

      await getWarehousesNovaPoshta();

      break;
  }
}

function doValidateForm() {
  createErrorObj("firstName");
  createErrorObj("secondName");
  createErrorObj("phone");
  createErrorObj("city");
  createErrorObj("warehouses");

  validateField(firstName.value, "firstName");
  validateField(secondName.value, "secondName");
  validateField(phone.value, "phone");
  validateField(city.value, "city");
  validateField(warehouses.value, "warehouses");
}

function isFormValid() {
  return Object.values(errorsFormData).some((e) => {
    return e.errors.length > 0;
  });
}

//nova poshta city
async function getCityNovaPoshta() {
  const response = await axios.post("http://localhost:8000/nova-poshta/citi", {
    city: city.value,
    cityRef: cityRef.value,
    numberWarehouses: warehouses.value,
    type: typeWarehouses.value,
  });

  cityList.value = [];

  // showDropCity.value = true;

  response.data.city.data.forEach((el) => {
    cityList.value.push({ city: el.Description, cityRef: el.Ref });
  });
}

async function getWarehousesNovaPoshta() {
  const response = await axios.post(
    "http://localhost:8000/nova-poshta/citi/warehouses",
    {
      city: cityRef.value,
      numberWarehouses: warehouses.value,
      type: typeWarehouses.value,
    }
  );

  warehousesList.value = [];

  // showDropWarehouses.value = true;

  response.data.warehouses.data.forEach((el) => {
    warehousesList.value.push({
      city: el.Description,
      cityRef: el.CityRef,
    });
  });
}

async function buyOrder() {
  doValidateForm();

  if (!isFormValid()) {
    const random = crypto.randomUUID();
    const orders = productsInСart.map((el) => ({
      order_id: random,
      orderName: el.product_name,
      count: el.count,
      img: el.pictures[0].pictures_name,
      product_id: el.product_id,
      discount: el.discount,
      discountProduct: el.sale,
      price: el.price,
    }));

    try {
      const response = await axios.post(
        "http://localhost:8000/order/add-order",
        {
          order_id: random,
          name: firstName.value,
          secondName: secondName.value,
          phone: phone.value,
          orders: orders,
          payment: payment.value,
          city: city.value,
          warehouses: warehouses.value,
          totalPrice: totalPriceCart[0],
        }
      );

      firstName.value = "";
      secondName.value = "";
      phone.value = "";
      payment.value = "Післяплатою";
      city.value = "";
      warehouses.value = "";
      totalPriceCart[0] = 0;

      productsInСart.length = 0;

      emit("show", true);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  width: 60%;
  padding: 20px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;

  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgb(144, 5, 5);
      width: 30px;
      height: 30px;
      padding: 8px;
      border-radius: 100%;

      h2 {
        margin: 0;
        padding: 0;
        color: white;
        font-weight: 700;
      }
    }
  }

  button {
    margin-top: 50px;
    align-self: center;
  }
}

.input__wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.customInput {
  width: 100%;
}

.delivery__wrapper {
  width: 100%;
}
</style>
