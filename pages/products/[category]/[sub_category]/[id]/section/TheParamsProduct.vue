<template>
  <div class="wrapper_parametr">
    <ui-text-h2 class="title">Властивості</ui-text-h2>

    <div class="parametr">
      <table class="spec-table">
        <tbody>
          <tr v-for="param in parametr" :key="param.id">
            <td>
              <ui-text-h4>
                {{ param.parameter_name }}
              </ui-text-h4>
            </td>

            <td>
              <ui-text-h4 class="value">
                {{ param.parameter_value }}
              </ui-text-h4>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ui-text-h4
      class="show_more_param"
      v-if="!props.tab"
      @click="showMoreParam"
    >
      Показати всі властивості
    </ui-text-h4>
  </div>
</template>

<script setup>
import UiTextH2 from "~/components/Ui/UiTextH2.vue";
import UiTextH4 from "~/components/Ui/UiTextH4.vue";
import useScrollToTop from "~/utils/useScrollToTop";

const { showScrollToTop, scrollToTop } = useScrollToTop();

const props = defineProps({
  parametr: {
    type: Array,
    default: () => [],
  },

  tab: {
    type: String,
  },
});

const emit = defineEmits(["moreParam"]);

function showMoreParam() {
  emit("moreParam", "Властивості");
  scrollToTop();
}
</script>

<style lang="scss" scoped>
.wrapper_parametr {
  padding-top: 100px;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.title {
  font-weight: 700;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
}
.spec-table th,
.spec-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
.spec-table th {
  background-color: #f8f8f8;
}

.value {
  font-weight: 700;
}

.show_more_param {
  cursor: pointer;
  text-decoration: underline;
  transition: font-weight 0.3s ease;

  &:hover {
    font-weight: 700;
  }
}

@media screen and (max-width: 991px) {
  .title {
    font-size: 18px;
  }

  .wrapper_parametr {
    width: 100%;
    padding-top: 50px;
  }

  .spec-table td {
    h2 {
      font-size: 13px;
    }
  }

  .show_more_param {
    font-size: 14px;
  }
}

@media screen and (max-width: 767px) {
  .title {
    font-size: 16px;
  }
}

@media (hover: none) {
  .show_more_param:hover {
    background-color: initial;
    color: initial;
  }
}
</style>
