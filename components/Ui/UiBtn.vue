<template>
  <button @mouseover="hoverIn" @mouseleave="hoverOut">
    <slot />
  </button>
</template>

<script setup>
const hoverIn = (event) => {
  const svgPath = event.currentTarget.querySelector("svg path");
  if (svgPath) {
    svgPath.setAttribute("fill", "white");
  }
};

const hoverOut = (event) => {
  const svgPath = event.currentTarget.querySelector("svg path");
  if (svgPath) {
    svgPath.setAttribute("fill", "black"); // вкажіть оригінальний колір, якщо потрібно
  }
};
</script>

<style lang="scss" scoped>
button {
  width: 220px;

  font-size: 14px;
  font-weight: 600;

  color: black;
  border: 1px solid black;
  line-height: 46px;
  text-align: center;
  border-radius: 20px;

  @media (hover: hover) {
    &:hover {
      color: white;
      background: rgba(144, 5, 5, 1);
      svg {
        path {
          fill: white !important;
        }
      }
    }
  }
}
</style>
