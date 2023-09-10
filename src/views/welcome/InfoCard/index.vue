<script setup lang="ts">
defineOptions({
  name: "InfoCard"
});
defineProps({
  icon: String,
  width: String,
  height: String,
  text: String
});
</script>

<template>
  <el-card shadow="always" class="card-style">
    <div class="icon-text">
      <IconifyIconOnline :icon="icon" :width="width" :height="height" />
      <span class="span-style">{{ text }}</span>
    </div>
  </el-card>
</template>
