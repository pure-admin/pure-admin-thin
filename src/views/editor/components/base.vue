<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { IEditorConfig } from "@wangeditor/editor";
import { Editor } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, shallowRef } from "vue";
defineOptions({
  name: "BaseEditor"
});

const content = defineModel<string>("content");
console.log("content", content);

const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml =
  '<pre><code class="language-java">' + content.value + "</code></pre>";
const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} };

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
  <div class="wangeditor">
    <Editor
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      style="height: 500px; overflow-y: hidden"
      @onCreated="handleCreated"
    />
  </div>
</template>
