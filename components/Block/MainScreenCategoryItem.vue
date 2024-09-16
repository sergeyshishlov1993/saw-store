<template>
  <div class="main_card__wrapper">
    <component :is="componentsIcon" />
    <ui-text-h5>{{ props.title[0] }}</ui-text-h5>
  </div>
</template>

<script setup>
import { computed } from "vue";
import IconCompressors from "../../assets/icons/IconCompressors.vue";
import IconConstructionVacuumCleaners from "../../assets/icons/IconConstructionVacuumCleaners.vue";
import IconCordlessTool from "../../assets/icons/IconCordlessTool.vue";
import IconGardenTool from "../../assets/icons/IconGardenTool.vue";
import IconPetrolTools from "../../assets/icons/IconPetrolTools.vue";
import IconPowerTool from "../../assets/icons/IconPowerTool.vue";
import IconWeldingEquipment from "../../assets/icons/IconWeldingEquipment.vue";
import IconWoodTool from "../../assets/icons/IconWoodTool.vue";
import iconConcreteMixer from "../../assets/icons/iconConcreteMixer.vue";
import UiTextH5 from "../Ui/UiTextH5.vue";

const props = defineProps({
  title: {
    type: Array,
    require: true,
  },
});

const componentsIcon = computed(() => {
  switch (props.title[0]) {
    case "Електроінструмент":
      return IconPowerTool;

    case "Акумуляторний інструмент":
      return IconCordlessTool;

    case "Деревообробний інструмент":
      return IconWoodTool;

    case "Зварювальне обладнання":
      return IconWeldingEquipment;

    case "Садово парковий інструмент":
      return IconGardenTool;

    case "Бензоінструменти":
      return IconPetrolTools;

    case "Компресори та пневмоінструменти":
      return IconCompressors;

    case "Будівельна техніка та обладнання":
      return iconConcreteMixer;
  }
});
</script>

<style lang="scss" scoped>
.main_card__wrapper {
  width: calc(12.5% - 8px);
  margin: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 210px;
  border-radius: 20px;
  box-shadow: 0px 2px 6px rgb(0 0 0 / 8%);

  transition: transform 0.3s ease;
  transform-origin: center;

  h2 {
    width: 150px;
    text-align: center;
    line-height: 19px;
  }

  @media (hover: hover) {
    &:hover {
      transform: scale(1.1);
      h2 {
        font-weight: 700;
        color: darkred;
        cursor: pointer;
      }

      svg {
        filter: contrast(200%) brightness(3%);
      }
    }
  }
}

@media screen and (max-width: 1399px) {
  .main_card__wrapper {
    width: 160px;
  }
}
</style>
