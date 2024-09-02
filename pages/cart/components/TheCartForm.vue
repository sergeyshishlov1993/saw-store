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
        @change="handleChange"
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
        @change="handleChange"
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
        @change="handleChange"
      />
      <label for="Postomat">у поштомат</label>
    </div>

    <!-- ---------------город------------------- -->
    <div class="delivery__wrapper">
      <div class="input__wrapper">
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

        <icon-close @click="clearInputValue('city')" />
      </div>

      <ui-error
        v-for="error in errorsFormData?.city?.errors ?? []"
        :key="error"
        :text="error"
      />

      <ui-loader v-if="loadDataNovaPoshta" />

      <ui-drop-down
        v-else
        @selectCity="getCityValue"
        :value="cityList"
        name="cityList"
        :show="showDropCity"
      />
    </div>

    <!-- ---------------отделение------------------- -->
    <div class="delivery__wrapper" v-if="typeWarehouses !== 'Courier'">
      <div class="input__wrapper">
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

        <icon-close @click="clearInputValue('warehouses')" />
      </div>

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

    <div class="delivery__wrapper" v-else>
      <ui-input
        placeholder="Адреса доставки"
        class="customInput"
        name="courierDeliveryAddress"
        :value="courierDeliveryAddress"
        @focus="(event) => handleFocus('courierDeliveryAddress', event)"
        @input="
          (event) => getInputValue('courierDeliveryAddress', event.target.value)
        "
        @blur="
          (event) => handleBlur('courierDeliveryAddress', event.target.value)
        "
        :class="{
          invalid: errorsFormData?.courierDeliveryAddress?.errors.length != 0,
        }"
      />

      <ui-error
        v-for="error in errorsFormData?.courierDeliveryAddress?.errors ?? []"
        :key="error"
        :text="error"
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

    <ui-btn :disabled="!state.productsInСart.length"
      >Оформити замовлення</ui-btn
    >
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
import UiLoader from "~/components/Ui/UiLoader.vue";
import IconClose from "~/assets/icons/IconClose.vue";
import {
  errorsFormData,
  validateField,
  createErrorObj,
} from "~/utils/validation";
import { useCartData } from "~/stores/cartData";

const { state } = useCartData();
const apiUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;
const emit = defineEmits(["show"]);

const firstName = ref("");
const secondName = ref("");
const phone = ref("+380");
const city = ref("");
const cityList = ref([]);
const cityRef = ref("");
const warehouses = ref();
const courierDeliveryAddress = ref("");
const typeWarehouses = ref("841339c7-591a-42e2-8233-7a0a00f0ed6f");
const warehousesList = ref([]);
const showDropCity = ref(false);
const showDropWarehouses = ref(false);
const payment = ref("Післяплатою");
const loadDataNovaPoshta = ref(false);

async function handleChange(event) {
  typeWarehouses.value = event.target.value;

  await getWarehousesNovaPoshta();
}

async function getCityValue(value, valueCity, show, name, type) {
  cityRef.value = value;

  if (name == "cityList") {
    city.value = valueCity;
    showDropCity.value = show;
    warehouses.value = "";
    try {
      const response = await axios.post(`${apiUrl}/nova-poshta/citi`, {
        city: city.value,
        cityRef: cityRef.value,
        numberWarehouses: warehouses.value,
        type: typeWarehouses.value,
      });

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
      if (city.value) {
        warehousesList.value = [];
        await getWarehousesNovaPoshta();

        showDropWarehouses.value = true;
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

      if (city.value.length > 3) {
        await getCityNovaPoshta();
      } else if (!city.value.length) {
        cityList.value = [];
      } else {
        warehouses.value = "";
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

    case "courierDeliveryAddress":
      courierDeliveryAddress.value = event;
      warehouses.value = "Кур'єрська доставка";

      break;
  }
}

function clearInputValue(name) {
  if (name === "city") {
    city.value = "";
    cityList.value = [];
    warehouses.value = "";
    showDropCity.value = false;
  } else {
    warehouses.value = "";
  }
}

function doValidateForm() {
  createErrorObj("firstName");
  createErrorObj("secondName");
  createErrorObj("phone");
  createErrorObj("city");
  createErrorObj("warehouses");
  createErrorObj("courierDeliveryAddress");

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
  try {
    const response = await axios.post(`${apiUrl}/nova-poshta/citi`, {
      city: city.value,
      cityRef: cityRef.value,
      numberWarehouses: warehouses.value,
      type: typeWarehouses.value,
    });

    cityList.value = [];

    response.data.city.data.forEach((el) => {
      cityList.value.push({ city: el.Description, cityRef: el.Ref });
    });
  } catch (error) {
    console.error("помилка", error);
  }
}

async function getWarehousesNovaPoshta() {
  loadDataNovaPoshta.value = true;

  try {
    warehousesList.value = [];

    const response = await axios.post(`${apiUrl}/nova-poshta/citi/warehouses`, {
      city: cityRef.value,
      numberWarehouses: warehouses.value,
      type: typeWarehouses.value,
    });

    for (const el of response.data.warehouses.data) {
      warehousesList.value.push({
        city: el.Description,
        cityRef: el.CityRef,
      });
    }

    if (!response.data.warehouses.data.length) {
      showDropWarehouses.value = false;
    }

    loadDataNovaPoshta.value = false;
  } catch (error) {
    console.error("помилка", error);
    loadDataNovaPoshta.value = false; // Зупинити лоадер навіть у разі помилки
  }
}

async function buyOrder() {
  doValidateForm();

  if (!isFormValid()) {
    try {
      const random = crypto.randomUUID();
      const orders = state.productsInСart.map((el) => ({
        order_id: random,
        orderName: el.product_name,
        count: el.count,
        img: el.pictures[0].pictures_name,
        product_id: el.product_id,
        discount: el.discount,
        discountProduct: el.sale,
        price: el.price,
      }));

      const response = await axios.post(`${apiUrl}/order/add-order`, {
        order_id: random,
        order_name: orders.orderName,
        order_pictures: orders.img,
        name: firstName.value,
        secondName: secondName.value,
        phone: phone.value,
        orders: orders,
        payment: payment.value,
        city: city.value,
        warehouses: warehouses.value,
        courierDeliveryAddress: courierDeliveryAddress.value,
        totalPrice: state.totalPriceCart,
      });

      firstName.value = "";
      secondName.value = "";
      phone.value = "";
      payment.value = "Післяплатою";
      city.value = "";
      warehouses.value = "";
      courierDeliveryAddress.value = "";
      state.totalPriceCart = 0;

      state.productsInСart.length = 0;

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
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;

  svg {
    position: absolute;
    top: 6px;
    right: 5px;
    width: 30px;
  }
}

.customInput {
  width: 100%;
}

.delivery__wrapper {
  width: 100%;
}

@media screen and (max-width: 1023px) {
  form {
    margin-top: 20px;
    width: 100%;
    order: 2;
  }
}

@media screen and (max-width: 991px) {
  form {
    gap: 20px;
  }
}

@media screen and (max-width: 767px) {
  form {
    h2 {
      font-size: 16px;
    }

    .input__wrapper {
      label {
        font-size: 13px;
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 40px;

      font-size: 13px;
    }
  }
}
</style>
