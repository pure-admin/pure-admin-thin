<template>
  <codemirror
    v-model="myCode"
    placeholder="Code goes here..."
    :style="{ height: '100%' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
  />
</template>

<script setup lang="ts">
import { shallowRef, ref, watch } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

defineOptions({
  name: "Codemirror"
});

const code = defineProps({
  code: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "java"
  }
});

const emits = defineEmits(["update:code", "update:type"]);
const extensions = ref([]);
const myCode = ref(code.code);
extensions.value = [java(), oneDark];
watch(
  () => code.type,
  newValue => {
    if (newValue === "javascript") {
      extensions.value[0] = javascript();
    } else if (newValue === "xml") {
      extensions.value[0] = xml();
    } else if (newValue === "html") {
      extensions.value[0] = html();
    } else {
      extensions.value[0] = java();
    }
  }
);
watch(
  () => code.code,
  newValue => {
    myCode.value = newValue;
  }
);
// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = payload => {
  view.value = payload.view;
};

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state;
  const ranges = state.selection.ranges;
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0);
  const cursor = ranges[0].anchor;
  const length = state.doc.length;
  const lines = state.doc.lines;
  // more state info ...
  // return ...
};
</script>
