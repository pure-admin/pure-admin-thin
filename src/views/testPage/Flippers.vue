<script setup lang="ts">
import { ref, defineExpose, computed } from "vue";
// 设置前牌文字
const frontTextFromData = ref(0);
function setFront(text: number): void {
  frontTextFromData.value = text;
}

const textClass = (number: number) => {
  return "number" + number;
};

const styleName = computed(() => {
  return {
    mainClass: `m-flipper down go`,
    font: `digital front ${textClass(frontTextFromData.value)}`,
    back: `digital back ${textClass(frontTextFromData.value)}`
  };
});

defineExpose({
  setFront
});
</script>

<template>
  <div :class="[styleName.mainClass]">
    <div :class="[styleName.font]" />
    <div :class="[styleName.back]" />
  </div>
</template>

<style scoped>
@import "./filpper.css";
</style>
