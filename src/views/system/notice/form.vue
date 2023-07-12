<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { useUserStoreHook } from "@/store/modules/user";

/** TODO 有其他方式  来换掉这个props 父子组件传值吗？ */
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    noticeTitle: "",
    noticeType: "",
    status: "",
    noticeContent: ""
  })
});

const noticeData = ref(props.formInline);

const formRuleRef = ref();

function getFormRuleRef() {
  return formRuleRef.value;
}

defineExpose({ getFormRuleRef });
</script>

<template>
  <el-form
    ref="formRuleRef"
    :model="noticeData"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="公告标题" prop="noticeTitle">
      <el-input
        v-model="noticeData.noticeTitle"
        clearable
        placeholder="请输入公告标题"
      />
    </el-form-item>

    <el-form-item label="公告类型" prop="noticeType">
      <el-select
        v-model="noticeData.noticeType"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option
          v-for="dict in useUserStoreHook().dictionaryList[
            'sysNotice.noticeType'
          ]"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="公告类型" prop="status">
      <el-select
        v-model="noticeData.status"
        placeholder="请选择状态"
        clearable
        class="!w-[180px]"
      >
        <el-option
          v-for="dict in useUserStoreHook().dictionaryList['sysNotice.status']"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="公告内容" prop="noticeContent">
      <el-input
        v-model="noticeData.noticeContent"
        clearable
        placeholder="请输入公告内容"
        rows="6"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
