<script setup lang="ts">
import { useDetail } from "./hook";
import { onMounted, ref, reactive } from "vue";
import { get, type Generator } from "@/api/generator/generator";
import { Base } from "@/views/editor/components";

defineOptions({
  name: "TabQueryDetail"
});

const { initToDetail, getParameter } = useDetail();
initToDetail("query");
const datas = ref([]);
const content = ref("");
onMounted(() => {
  get(getParameter.id, 1).then(data => {
    console.log("data", data);
    datas.value = data.data;
    content.value =
      '<pre><code class="language-java">' +
      data.data[0].content +
      "</code></pre>";
  });
});
const clickFn = (item: String) => {
  content.value = '<pre><code class="language-java">' + item + "</code></pre>";
};
</script>

<template>
  <div>
    <span
      v-for="(item, index) in datas"
      :key="index"
      @click="clickFn(item.content)"
    >
      {{ item.name }} &nbsp;
    </span>

    <Base v-model:content="content" />
  </div>
</template>
