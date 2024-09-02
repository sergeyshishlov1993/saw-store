<template>
  <div class="container">
    <div class="main-slider">
      <ui-text-h3 class="title">Завантажити зображення</ui-text-h3>
      <hr />

      <form @submit.prevent="loadSliderImg">
        <div class="firebase">
          <div v-for="img in downloadURL" :key="img" class="firebase__img">
            <img :src="img" :alt="img" />
            <icon-close @click="deleteFileByUrl(img)" />
          </div>
        </div>

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
        <ui-btn :disabled="isLoadToFirebase">Завантажити</ui-btn>
      </form>

      <ui-text-h3 class="title">Зображення головного слайдера</ui-text-h3>
      <hr />

      <div class="main-slider__img">
        <div
          class="main-slider__img_wrapper"
          v-for="slid in slider"
          :key="slid.id"
        >
          <img :src="slid.name" :alt="slid.id" />
          <icon-close @click="deleteFileByUrlAndDataBase(slid.name, slid.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import UiTextH3 from "~/components/Ui/UiTextH3.vue";
import UiBtn from "~/components/Ui/UiBtn.vue";
import IconClose from "~/assets/icons/IconClose.vue";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "~/firebaseConfig";

const storage = getStorage(app);
const files = ref(null);
const downloadURL = ref([]);
const slider = ref([]);
const showLoader = ref(false);
const isLoadToFirebase = ref(true);
const progress = ref(0);
const apiUrl = process.env.VITE_API_URL;

onMounted(async () => {
  await getSliderImg();
});

function handleFocus(event, name) {
  createErrorObj(name);
  errorsFormData[name].isDirty = true;
}

async function getFiles(f) {
  files.value = f;

  await loadFilesToStorage(files.value);
}

function handleBlur(event, name) {
  console.log("blur", event);
  switch (name) {
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
    isLoadToFirebase.value = false;
    progress.value = 0;
    console.log("URLs of uploaded files:", downloadURL.value);
  } catch (error) {
    console.error("Error uploading files:", error.message);
    progress.value = 0;
  }
}

async function deleteFileByUrl(fileUrl, id) {
  const idx = downloadURL.value.findIndex((el) => el === fileUrl);
  downloadURL.value.splice(idx, 1);

  try {
    const fileRef = storageRef(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Помилка при видаленні файлу:", error.message);
  }
}

async function deleteFileByUrlAndDataBase(fileUrl, id) {
  const idx = slider.value.findIndex((el) => el.id === id);
  slider.value.splice(idx, 1);

  try {
    const response = await axios.delete(`${apiUrl}/slider/${id}`);

    console.log("slider", response);
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

async function getSliderImg() {
  try {
    const response = await axios.get(`${apiUrl}/slider`);

    console.log("slider", response);

    slider.value = response.data.slider;
  } catch (error) {
    console.error("сталась помилка:", error);
  }
}

async function loadSliderImg() {
  try {
    if (!downloadURL.value.length) {
      console.error("Файли ще не завантажені.");
      return;
    }

    for (const el of downloadURL.value) {
      const response = await axios.post(`${apiUrl}/slider/add`, {
        id: crypto.randomUUID(),
        linkImg: el,
      });
      console.log("slider", response);
    }

    files.value = null;
    downloadURL.value = [];
    isLoadToFirebase.value = true;
    await getSliderImg();
  } catch (error) {
    console.error("Сталася помилка:", error);

    await deleteAllFileByUrl(downloadURL.value);
  }
}
</script>

<style lang="scss" scoped>
.main-slider {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__img {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;

    img {
      width: 300px;
    }

    &__wrapper {
      display: flex;
      align-items: flex-start;
    }
  }
}

.title {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin: 0 auto;

  .firebase {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;

    &__img {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 20px;

      img {
        width: 200px;
      }

      svg {
        width: 25px;
      }
    }
  }
}

span {
  font-weight: bold;
  margin-left: 10px;
}
</style>
