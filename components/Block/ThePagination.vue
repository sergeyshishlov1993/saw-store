<template>
  <div class="pagination">
    <ui-btn
      v-for="page in pages"
      :key="page"
      :class="{ active: page == current }"
      @click="changePage(page)"
    >
      {{ page }}
    </ui-btn>
  </div>
</template>

<script setup>
import UiBtn from "../Ui/UiBtn.vue";
const emit = defineEmits(["changePage"]);
const props = defineProps({
  total: Number,
  current: Number,
});

const { total, current } = toRefs(props);

const pages = computed(() => {
  const range = [];
  const sidePages = 2; // Кількість сторінок до та після поточної сторінки
  const paginationWidth = 5; // Загальна кількість відображуваних кнопок сторінок

  // Функція для додавання сторінок у масив
  function addPage(page) {
    if (!range.includes(page)) {
      range.push(page);
    }
  }

  // Додавання початкових та кінцевих сторінок
  addPage(1);
  if (props.current > paginationWidth) {
    range.push("...");
  }

  // Додавання середніх сторінок
  for (
    let i = Math.max(2, props.current - sidePages);
    i <= Math.min(props.total - 1, props.current + sidePages);
    i++
  ) {
    addPage(i);
  }

  // Додавання многоточчя та останньої сторінки
  if (props.current < props.total - paginationWidth + 1) {
    range.push("...");
  }
  addPage(props.total);

  return range;
});

const changePage = (page) => {
  if (page === "...") {
    return; // Ігнорування кліка на многоточчя
  }
  // Місце для вашого коду або еміттера подій зміни сторінки
  console.log("Перехід на сторінку:", page);
  emit("changePage", page);
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;

  font-weight: 500;
}

.active {
  background: rgba(144, 5, 5, 1);
  color: white;
}
</style>
