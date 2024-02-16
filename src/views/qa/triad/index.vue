<script setup lang="ts">
import { ref } from "vue";
import { getHelloMessage } from "@/api/routes";

defineOptions({
  name: "QAtriad"
});

const message = ref(""); // 响应式变量，用于存储返回的消息

const handleClick = async () => {
  try {
    const response = await getHelloMessage();
    message.value = response.message; // 更新消息
  } catch (error) {
    console.error("Error fetching message:", error);
    message.value = "Error fetching message";
  }
};
</script>

<template>
  <h1>三元组管理</h1>
  <button @click="handleClick">获取消息</button>
  <p v-if="message">{{ message }}</p>
  <!-- 显示消息 -->
</template>
