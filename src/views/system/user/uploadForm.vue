<script setup lang="ts">
import { reactive, ref } from "vue";
import { getToken } from "@/utils/auth";
import { http } from "@/utils/http";
import { message } from "@/utils/message";
import { useHook } from "./hook";

const { getList } = useHook();

/** * 用户导入参数 */
const upload = reactive({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: "",
  // 是否禁用上传
  loading: false,
  // 设置上传的请求头部
  headers: { Authorization: `Bearer ${getToken().token}` },
  // 上传的地址
  url: `${import.meta.env.VITE_APP_BASE_API}/system/users/excel`
});

/** 下载模板操作 */
function downloadTemplate() {
  http.download(
    "system/users/excelTemplate",
    `user_template_${new Date().getTime()}.xls`
  );
}

/** 文件上传中处理 */
const handleFileUploadProgress = () => {
  upload.loading = true;
};

/** 文件上传成功处理 */
const handleFileSuccess = () => {
  upload.open = false;
  upload.loading = false;
  formRef.value.clearFiles();
  message("导入成功", { type: "success" });
  getList();
};

const formRef = ref();

function getFormRef() {
  return formRef.value;
}

defineExpose({ getFormRef });
</script>

<template>
  <el-upload
    ref="formRef"
    :limit="1"
    accept=".xlsx,.xls"
    :headers="upload.headers"
    :action="upload.url"
    :disabled="upload.loading"
    :on-progress="handleFileUploadProgress"
    :on-success="handleFileSuccess"
    :auto-upload="false"
    drag
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <template #tip>
      <div class="el-upload__tip text-center">
        <span>仅允许导入xls、xlsx格式文件。</span>
        <el-link
          type="primary"
          :underline="false"
          style="font-size: 12px; vertical-align: baseline"
          @click="downloadTemplate"
          >下载模板</el-link
        >
      </div>
    </template>
  </el-upload>
</template>
