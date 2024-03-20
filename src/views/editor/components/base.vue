<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { IEditorConfig } from "@wangeditor/editor";
import { Editor } from "@wangeditor/editor-for-vue";
import {
  onMounted,
  onBeforeUnmount,
  shallowRef,
  defineProps,
  defineEmits,
  ref
} from "vue";
defineOptions({
  name: "BaseEditor"
});

const content = defineProps({
  content: {
    type: String,
    default: ""
  }
});
const emits = defineEmits(["update:content"]);
const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} };

console.log("content", content.content);
const htmlText = ref(content.content);
onMounted(() => {});
const handleCreated = editor => {
  // 记录 editor 实例，重要！
  editorRef.value = editor;
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <div>
    <Editor
      v-model="htmlText"
      :defaultConfig="editorConfig"
      :mode="mode"
      style="height: 100%; overflow-y: hidden"
      @onCreated="handleCreated"
    />
  </div>
</template>
