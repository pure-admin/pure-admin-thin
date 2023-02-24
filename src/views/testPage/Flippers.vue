<script setup lang="ts">
import { ref, defineExpose, computed } from "vue";

const props = defineProps({
  frontText: {
    type: Number,
    default: 0
  },
  backText: {
    type: Number,
    default: 1
  }
});

// 设置前牌文字
const frontTextFromData = ref(props.frontText);
// 设置后排文字
const backTextFromData = ref(props.backText);

function setFront(text: number): void {
  frontTextFromData.value = text;
}

function setBack(text: number): void {
  backTextFromData.value = text;
}

const textClass = (number: number) => {
  return "number" + number;
};

const styleName = computed(() => {
  return {
    mainClass: `m-flipper down go`,
    font: `digital front ${textClass(frontTextFromData.value)}`,
    back: `digital back ${textClass(backTextFromData.value)}`
  };
});

// 缓存 promise 测试

defineExpose({
  setFront,
  setBack
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
