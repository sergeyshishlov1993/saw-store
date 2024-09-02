<template>
  <div class="container">
    <div class="form__wrapper">
      <div class="loader" v-if="showLoader">
        <div class="spinner-border text-light" role="status"></div>
      </div>

      <div class="pictures__wrapper">
        <div class="img" v-for="img in downloadURL" :key="img">
          <img :src="img" :alt="img" />
          <icon-close class="remove" @click="deleteFileByUrl(img)" />
        </div>
      </div>

      <form @submit.prevent="addCustomProduct">
        <ui-select
          :category="subCategory"
          :selectCategory="selectedCategory"
          @update-select="getSelectValue"
        />

        <input
          type="file"
          id="fileUpload"
          name="fileUpload"
          multiple
          @focus="(event) => handleFocus(event, 'file')"
          @change="(event) => getFiles(event.target.files)"
          @blur="(event) => handleBlur(event, 'file')"
          :class="{ invalid: errorsFormData?.file?.errors.length != 0 }"
        />

        <progress :value="progress" max="100" style="width: 300px"></progress>
        <span>{{ progress.toFixed(0) }}%</span>

        <ui-error
          v-for="error in errorsFormData?.file?.errors ?? []"
          :key="error"
          :text="error"
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
          <input type="checkbox" name="parametr" v-model="parametrFlag" />
          <ui-text-h5> Додати властивості </ui-text-h5>
        </div>

        <div class="parametr" v-if="parametrFlag">
          <form @submit.prevent="addParams">
            <ui-input
              name="назва"
              placeholder="назва"
              :value="parametrName"
              @input="(event) => getParamValue(event.target.value, 'paramName')"
            />

            <ui-input
              name="значення"
              placeholder="значення"
              :value="parametrValue"
              @input="
                (event) => getParamValue(event.target.value, 'paramValue')
              "
            />

            <ui-btn>додати</ui-btn>
          </form>

          <table>
            <thead>
              <tr>
                <th>Назва</th>
                <th>Значення</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="param in parameters" :key="param.name">
                <td>
                  <ui-text-h5>{{ param.name }}</ui-text-h5>
                </td>

                <td>
                  <ui-text-h5>{{ param.value }}</ui-text-h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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

        <ui-btn>Додати товар</ui-btn>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "~/firebaseConfig";

import axios from "axios";
import UiTextH5 from "~/components/Ui/UiTextH5.vue";
import UiSelect from "~/components/Ui/UiSelect.vue";
import UiInput from "~/components/Ui/UiInput.vue";
import UiTextAria from "~/components/Ui/UiTextAria.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import IconClose from "~/assets/icons/IconClose.vue";

const storage = getStorage(app);
const files = ref(null);
const downloadURL = ref([]);
const subCategory = ref();
const selectedCategory = ref("");
const selectedCategoryValue = ref("");
const productName = ref("");
const productDescription = ref("");
const price = ref("");
const parametrFlag = ref(false);
const parameters = ref([]);
const parametrName = ref("");
const parametrValue = ref("");
const bestseller = ref(false);
const sale = ref(false);
const available = ref(false);
const discount = ref("");
const showLoader = ref(false);
const progress = ref(0);
const apiUrl = process.env.VITE_API_URL;

onMounted(async () => {
  await getSubCategory();
});

async function getSubCategory() {
  try {
    const response = await axios.get(`${apiUrl}/products/category`);

    subCategory.value = response.data.subCategory;
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

async function getFiles(f) {
  files.value = f;

  await loadFilesToStorage(files.value);
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
  console.log("blur", event);
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

    case "file":
      validateField(event.target.files, name);
  }
}

async function loadFilesToStorage(files) {
  try {
    const uploadPromises = Array.from(files).map((file) => {
      const uniqueFileName = `${crypto.randomUUID()}_${file.name}`;
      const storagePath = `files/${uniqueFileName}`;
      const storageReference = storageRef(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageReference, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progressPercent =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress.value = progressPercent;
          },
          (error) => reject(error),
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          }
        );
      });
    });

    downloadURL.value = await Promise.all(uploadPromises);

    progress.value = 0;
    console.log("URLs of uploaded files:", downloadURL.value);
  } catch (error) {
    console.error("Error uploading files:", error.message);
    progress.value = 0;
  }
}

function getParamValue(event, name) {
  switch (name) {
    case "paramName":
      parametrName.value = event;
      break;

    case "paramValue":
      parametrValue.value = event;
      break;
  }
}

function addParams() {
  parameters.value.push({
    name: parametrName.value,
    value: parametrValue.value,
  });

  parametrName.value = "";
  parametrValue.value = "";
}

async function deleteFileByUrl(fileUrl) {
  const idx = downloadURL.value.findIndex((el) => el === fileUrl);
  downloadURL.value.splice(idx, 1);

  try {
    const fileRef = storageRef(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Помилка при видаленні файлу:", error.message);
  }
}

async function deleteAllFileByUrl(fileUrl) {
  try {
    fileUrl.forEach(async (el) => {
      const fileRef = storageRef(storage, el);
      await deleteObject(fileRef);
    });
  } catch (error) {
    console.error("Помилка при видаленні файлу:", error.message);
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

async function addCustomProduct() {
  doValidateForm();

  showLoader.value = true;

  try {
    if (!downloadURL.value.length) {
      console.error("Файли ще не завантажені.");
      return;
    }

    const salePrice = ref(finalPrice.value);
    if (!isFormValid()) {
      if (!sale.value) {
        discount.value = 0;
        salePrice.value = 0;
      }

      const response = await axios.post(`${apiUrl}/admin/products/add`, {
        id: crypto.randomUUID(),
        sub_category_id: selectedCategoryValue.value,
        product_name: productName.value,
        product_description: productDescription.value,
        price: price.value,
        discount: discount.value,
        sale_price: salePrice.value,
        available: available.value.toString(),
        bestseller: bestseller.value.toString(),
        sale: sale.value.toString(),
        customProduct: true,
        pictures: downloadURL.value,
        parameters: parameters.value,
      });

      console.log("response", response);

      selectedCategoryValue.value = "";
      productName.value = "";
      productDescription.value = "";
      price.value = "";
      discount.value = "";
      showLoader.value = false;
      salePrice.value = "";
      available.value = false;
      bestseller.value = false;
      sale.value = false;
      parametrFlag.value = false;
      downloadURL.value = [];
      parameters.value = [];
    }
  } catch (error) {
    console.error(error);

    await deleteAllFileByUrl(downloadURL.value);
  }
}
</script>

<style lang="scss" scoped>
.form__wrapper {
  padding-top: 100px;
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

.parametr {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);

  th,
  td {
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    font-size: 14px;
    border-radius: 20px;
    border: 1px solid gray;
  }
}
</style>
