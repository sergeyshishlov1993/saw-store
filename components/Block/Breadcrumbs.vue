<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumbs">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="crumb">
        <router-link
          v-if="index !== breadcrumbs.length - 1"
          :to="crumb.path"
          :style="{ color: 'inherit' }"
        >
          {{ crumb.name }}
        </router-link>
        <span
          v-else
          :style="{ color: 'darkred', 'font-weight': 500 }"
          class="disabled-crumb"
        >
          {{ crumb.name }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="separator"> > </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.breadcrumbs {
  margin-top: 50px;
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
}
.crumb {
  margin-right: 0.5rem;
}
.separator {
  margin-left: 0.5rem;
}

.disabled-crumb {
  cursor: default;
}
</style>
