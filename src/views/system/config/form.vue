<script setup lang="ts">
import { ref } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { formRules } from "./utils/rule";
import { ConfigDTO } from "@/api/system/config";

interface FormProps<T> {
  formInline: T;
}

/** TODO 有其他方式  来换掉这个props 父子组件传值吗？ */
const props = withDefaults(defineProps<FormProps<ConfigDTO>>(), {
  formInline: () => ({})
});

const formData = ref(props.formInline);

// TODO 这段有优化的空间吗？
const formRuleRef = ref();

function getFormRuleRef() {
  return formRuleRef.value;
}

defineExpose({ getFormRuleRef });
</script>

<template>
  <el-form
    ref="formRuleRef"
    :model="formData"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="参数名称" prop="configName">
      <el-input
        v-model="formData.configName"
        clearable
        placeholder="请输入参数名称"
        :disabled="true"
      />
    </el-form-item>
    <el-form-item label="参数键名" prop="configKey">
      <el-input
        v-model="formData.configKey"
        clearable
        placeholder="请输入参数键名"
        :disabled="true"
      />
    </el-form-item>

    <el-form-item label="参数值" prop="configValue">
      <el-select
        v-model="formData.configValue"
        v-if="formData.configOptions.length > 0"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option
          v-for="item in formData.configOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-input
        v-else
        v-model="formData.configValue"
        placeholder="请输入参数键值"
      />
    </el-form-item>
    <el-form-item label="允许修改" prop="isAllowChange">
      <el-select
        v-model="formData.isAllowChange"
        placeholder="请选择"
        clearable
        class="!w-[180px]"
        :disabled="true"
      >
        <el-option
          v-for="dict in useUserStoreHook().dictionaryList['common.yesOrNo']"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="formData.remark"
        type="textarea"
        placeholder="请输入内容"
        :disabled="true"
      />
    </el-form-item>
  </el-form>
</template>
