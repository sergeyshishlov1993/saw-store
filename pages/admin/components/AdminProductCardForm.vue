<template>
  <div class="form__wrapper">
    <div class="loader" v-if="showLoader">
      <div class="spinner-border text-light" role="status"></div>
    </div>

    <div class="pictures__wrapper">
      <div class="img" v-for="img in pictures" :key="img.id">
        <img :src="img.pictures_name" :alt="img.id" />
        <icon-close class="remove" @click="removePictures(img.id)" />
      </div>
    </div>

    <form @submit.prevent="changeProduct">
      <ui-select
        :category="subCategory"
        :selectCategory="selectedCategory"
        @update-select="getSelectValue"
      />

      <ui-input
        name="name_product"
        placeholder="Назва товару"
        type="text"
        :value="productName"
        @focus="(event) => handleFocus(event, 'productName')"
        @input="(event) => getInputValue(event, 'productName')"
        @blur="(event) => handleBlur(event, 'productName')"
        :class="{ invalid: errorsFormData?.productName?.errors.length != 0 }"
      />

      <ui-error
        v-for="error in errorsFormData?.productName?.errors ?? []"
        :key="error"
        :text="error"
      />

      <ui-text-aria
        name="name_description"
        placeholder="Опис товару"
        type="text"
        :value="productDescription"
        @focus="(event) => handleFocus(event, 'name_description')"
        @input="(event) => getInputValue(event, 'name_description')"
        @blur="(event) => handleBlur(event, 'name_description')"
        :class="{
          invalid: errorsFormData?.name_description?.errors.length != 0,
        }"
      />

      <ui-error
        v-for="error in errorsFormData?.name_description?.errors ?? []"
        :key="error"
        :text="error"
      />

      <ui-input
        name="price"
        placeholder="Ціна"
        type="text"
        :value="price"
        @focus="(event) => handleFocus(event, 'price')"
        @input="(event) => getInputValue(event, 'price')"
        @blur="(event) => handleBlur(event, 'price')"
        :class="{
          invalid: errorsFormData?.price?.errors.length != 0,
        }"
      />

      <ui-error
        v-for="error in errorsFormData?.price?.errors ?? []"
        :key="error"
        :text="error"
      />

      <div class="checkbox__wrapper">
        <input type="checkbox" name="bestseller" v-model="bestseller" />
        <ui-text-h5> Хіт продажу </ui-text-h5>
      </div>

      <div class="checkbox__wrapper">
        <input type="checkbox" name="sale" v-model="sale" />
        <ui-text-h5> Aкційний </ui-text-h5>
      </div>

      <div class="discount" v-if="sale">
        <ui-input
          name="discont"
          placeholder="Акційна ціна в %"
          type="text"
          :value="discount"
          @focus="(event) => handleFocus(event, 'discount')"
          @input="(event) => getInputValue(event, 'discount')"
          @blur="(event) => handleBlur(event, 'discount')"
        />

        <ui-text-h5>
          Ціна зі знижкою : <span>{{ finalPrice }}</span> грн
        </ui-text-h5>
      </div>

      <div class="checkbox__wrapper">
        <input type="checkbox" name="available" v-model="available" />
        <ui-text-h5> В наявності </ui-text-h5>
      </div>

      <ui-btn>Змінити</ui-btn>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import UiSelect from "~/components/Ui/UiSelect.vue";
import UiInput from "~/components/Ui/UiInput.vue";
import UiTextAria from "~/components/Ui/UiTextAria.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import IconClose from "~/assets/icons/IconClose.vue";

const props = defineProps({
  id: {
    type: String,
  },

  productName: {
    type: String,
  },

  productDescription: {
    type: String,
  },

  price: {
    type: String,
  },

  discount: {
    type: String,
  },

  available: {
    type: String,
  },

  bestseller: {
    type: String,
  },

  sale: {
    type: String,
  },

  subCategory: {
    type: String,
  },

  pictures: {
    type: Array,
  },
});

const subCategory = ref();
const selectedCategory = ref("");
const selectedCategoryValue = ref(props.subCategory);
const productName = ref(props.productName);
const productDescription = ref(props.productDescription);
const price = ref(props.price);
const bestseller = ref(props.bestseller == "true" ? true : false);
const sale = ref(props.sale == "true" ? true : false);
const available = ref(props.available == "true" ? true : false);
const discount = ref(props.discount);
const showLoader = ref(false);
const apiUrl = process.env.VITE_API_URL || import.meta.env.VITE_API_URL;

onMounted(async () => {
  await getSubCategory();
});

async function getSubCategory() {
  try {
    const response = await axios.get(`${apiUrl}/products/category`);

    subCategory.value = response.data.subCategory;

    subCategory.value.forEach((el) => {
      if (el.sub_category_id == props.subCategory) {
        selectedCategory.value = el.sub_category_name;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

const finalPrice = computed(() => {
  const discountPrice = (+price.value * +discount.value) / 100;
  return +price.value - discountPrice;
});

function getSelectValue(name, value) {
  selectedCategory.value = name;
  selectedCategoryValue.value = value;
}

function handleFocus(event, name) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;
}

const getInputValue = (event, name) => {
  switch (name) {
    case "productName":
      productName.value = event.target.value;
      break;

    case "name_description":
      productDescription.value = event.target.value;
      break;

    case "price":
      event.target.value = event.target.value.replace(/[^0-9+]/g, "");

      price.value = event.target.value;
      break;

    case "discount":
      event.target.value = event.target.value.replace(/[^0-9+]/g, "");

      discount.value = event.target.value;
      break;
  }
};

function handleBlur(event, name) {
  switch (name) {
    case "productName":
      validateField((productName.value = event.target.value), name);
      break;

    case "name_description":
      validateField((productDescription.value = event.target.value), name);
      break;

    case "price":
      validateField(
        (price.value = event.target.value.replace(/[^0-9+]/g)),
        name
      );
      break;
  }
}

function doValidateForm() {
  createErrorObj("productName");
  createErrorObj("name_description");
  createErrorObj("price");

  validateField(productName.value, "productName");
  validateField(productDescription.value, "name_description");
  validateField(price.value, "price");
}

function isFormValid() {
  return Object.values(errorsFormData).some((e) => {
    return e.errors.length > 0;
  });
}

async function changeProduct() {
  doValidateForm();

  showLoader.value = true;

  try {
    const salePrice = ref(finalPrice.value);
    if (!isFormValid()) {
      if (!sale.value) {
        discount.value = 0;
        salePrice.value = 0;
      }

      const response = await axios.put(
        `${apiUrl}/admin/products/update/${props.id}`,
        {
          sub_category_id: selectedCategoryValue.value,
          product_name: productName.value,
          product_description: productDescription.value,
          price: price.value,
          discount: discount.value,
          sale_price: salePrice.value,
          available: available.value.toString(),
          bestseller: bestseller.value.toString(),
          sale: sale.value.toString(),
        }
      );

      showLoader.value = false;
    }
  } catch (error) {
    console.error(error);
  }
}

async function removePictures(id) {
  const idx = props.pictures.findIndex((el) => el.id == id);

  props.pictures.splice(idx, 1);

  try {
    const response = await axios.delete(
      `${apiUrl}/admin/products/${props.id}/${id}`
    );
  } catch (error) {
    console.error("сталась помилка"), error;
  }
}
</script>

<style lang="scss" scoped>
.form__wrapper {
  padding-top: 150px;
  width: 100%;
  position: relative;

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);

    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
}
form {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);

  textarea {
    height: 150px;
  }

  button {
    align-self: center;
  }
}

.title__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 25px;
  }
}

.checkbox__wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.discount {
  display: flex;
  flex-direction: column;
  gap: 5px;
  h2 {
    span {
      font-weight: 600;
      font-size: 15px;
      color: darkred;
    }
  }
}

.pictures__wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;

  .img {
    padding: 5px;
    position: relative;
    width: 100px;

    box-shadow: 0px 2px 5px rgb(120 144 156 / 8%),
      0px 2px 5px rgb(48 48 48 / 5%);
    border-radius: 2px;

    .remove {
      position: absolute;
      top: 0;
      left: 95px;
      width: 30px;
    }
  }
}
</style>
