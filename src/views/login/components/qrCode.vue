<script setup lang="ts">
import Motion from "../utils/motion";
import ReQrcode from "@/components/ReQrcode";

defineProps({
  currentPage: {
    type: Number,
    default: 2
  }
});

const $pageEmit = defineEmits(["update:currentPage"]);
</script>

<template>
  <Motion class="-mt-2 -mb-2"> <ReQrcode text="模拟测试" /> </Motion>
  <Motion :delay="100">
    <el-divider>
      <p class="text-xs text-gray-500">{{ '扫码后点击"确认",即可完成登录' }}</p>
    </el-divider>
  </Motion>
  <Motion :delay="150">
    <el-button class="w-full mt-4" @click="$pageEmit('update:currentPage', 0)">
      返回
    </el-button>
  </Motion>
</template>
