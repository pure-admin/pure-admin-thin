<script setup lang="tsx">
import { ref } from "vue";
const props = defineProps({
  createTime: {
    type: String,
    default: ""
  }
});

const createTime = ref(props.createTime);

const shortcuts = [
  {
    text: "最近1周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  },
  {
    text: "最近1个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    }
  },
  {
    text: "最近3个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    }
  }
];
</script>

<template>
  <el-date-picker
    v-model="createTime"
    type="datetimerange"
    :shortcuts="shortcuts"
    range-separator="-"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    value-format="YYYY-MM-DD h:m:s"
  />
</template>
