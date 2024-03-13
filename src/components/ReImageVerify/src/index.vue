<script setup lang="ts">
import { watch } from "vue";
import { useImageVerify } from "./hooks";

defineOptions({
  name: "ReImageVerify"
});

interface Props {
  code?: string;
}

interface Emits {
  (e: "update:code", code: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  code: ""
});

const emit = defineEmits<Emits>();

const { imgSrc, imgCode, getImgCode } = useImageVerify();

watch(imgCode, newValue => {
  emit("update:code", newValue);
});

defineExpose({ getImgCode });
</script>

<template>
  <el-image
    style="width: 120; height: 40"
    :src="imgSrc"
    fit="contain"
    @click="getImgCode"
  />
</template>
