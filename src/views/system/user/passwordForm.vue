<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./rule";
import { PasswordRequest } from "@/api/system/user";

interface FormProps {
  formInline: PasswordRequest;
}

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    userId: 0,
    password: ""
  })
});

const newFormInline = ref(props.formInline);

const formRuleRef = ref();

function getFormRuleRef() {
  return formRuleRef.value;
}

defineExpose({ getFormRuleRef });
</script>

<template>
  <el-form
    ref="formRuleRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col :value="24">
        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="newFormInline.password"
            clearable
            placeholder="请输入新密码"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
