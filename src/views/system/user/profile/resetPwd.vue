<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import {
  updateCurrentUserPasswordApi,
  ResetPasswordRequest
} from "@/api/system/user";
import { FormInstance } from "element-plus";
import { message } from "@/utils/message";

// const { proxy } = getCurrentInstance();

const user = reactive<ResetPasswordRequest>({
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined
});

const pwdRef = ref<FormInstance>();

const equalToPassword = (rule, value, callback) => {
  if (user.newPassword !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};
const rules = ref({
  oldPassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  newPassword: [
    { required: true, message: "新密码不能为空", trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: "长度在 6 到 20 个字符",
      trigger: "blur"
    }
  ],
  confirmPassword: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
    { required: true, validator: equalToPassword, trigger: "blur" }
  ]
});

/** 提交按钮 */
function submit() {
  console.log(user);
  pwdRef.value.validate(valid => {
    if (valid) {
      updateCurrentUserPasswordApi(toRaw(user)).then(() => {
        message("修改成功", {
          type: "success"
        });
      });
    }
  });
}
</script>

<template>
  <el-form ref="pwdRef" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input
        v-model="user.oldPassword"
        placeholder="请输入旧密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        v-model="user.newPassword"
        placeholder="请输入新密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
        v-model="user.confirmPassword"
        placeholder="请确认密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
