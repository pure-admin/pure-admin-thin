<script setup lang="ts">
import { useDetail } from "./hook";
import { onMounted, ref } from "vue";
import { get, type Generator } from "@/api/generator/generator";
import { Code } from "@/views/editor/components";

defineOptions({
  name: "TabQueryDetail"
});

const { initToDetail, getParameter } = useDetail();
initToDetail("query");
const datas = ref([]);
const content = ref("");
const type = ref("java");
onMounted(() => {
  get(getParameter.id, 1).then(data => {
    console.log("data", data);
    datas.value = data.data;
    content.value = data.data[0].content;
  });
});
const clickFn = (item: Generator) => {
  if (item.name.indexOf("Xml") > -1) {
    type.value = "xml";
  } else if (item.name.indexOf("api") > -1) {
    type.value = "javascript";
  } else if (item.name.indexOf("index") > -1) {
    type.value = "html";
  } else {
    type.value = "java";
  }
  content.value = item.content;
};
</script>

<template>
  <div>
    <span v-for="(item, index) in datas" :key="index" @click="clickFn(item)">
      {{ item.name }} &nbsp;
    </span>
    <Code v-model:code="content" v-model:type="type" />
  </div>
</template>
