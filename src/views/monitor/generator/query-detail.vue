<script setup lang="ts">
import { useDetail } from "./hook";
import { onMounted, ref } from "vue";
import { get } from "@/api/generator/generator";
import { Base } from "@/views/editor/components";

defineOptions({
  name: "TabQueryDetail"
});

const { initToDetail, getParameter } = useDetail();
initToDetail("query");
const datas = ref([]);
onMounted(() => {
  get(getParameter.id, 1).then(data => {
    console.log("data", data);
    datas.value = data.data;
  });
});
</script>

<template>
  <div>
    <span v-for="(item, index) in datas" :key="index">
      {{ item.name }} &nbsp;
    </span>

    <Base v-model:content="datas[0]" />
  </div>
</template>
