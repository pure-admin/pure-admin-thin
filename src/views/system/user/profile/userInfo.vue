<script setup lang="ts">
// import { updateUserProfile } from '@/api/system/userApi';
// import * as userApi from "@/api/system/userApi";
import { ref, reactive } from "vue";
import { updateUserProfileApi, UserProfileRequest } from "@/api/system/user";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";

defineOptions({
  name: "SystemUserProfile"
});

const userRef = ref<FormInstance>();

const props = defineProps({
  user: {
    type: Object
  }
});

const userModel = reactive<UserProfileRequest>({
  nickname: props.user.nickname,
  phoneNumber: props.user.phoneNumber,
  email: props.user.email,
  sex: props.user.sex
});

console.log(userModel);
console.log(props.user);

// const { proxy } = getCurrentInstance();

const rules = ref({
  nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "邮箱地址不能为空", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"]
    }
  ],
  phoneNumber: [
    { required: true, message: "手机号码不能为空", trigger: "blur" },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur"
    }
  ]
});

/** 提交按钮 */
function submit() {
  console.log(userRef.value);
  userRef.value.validate(valid => {
    if (valid) {
      updateUserProfileApi(userModel).then(() => {
        message("修改成功", {
          type: "success"
        });
      });
    }
  });
}
</script>

<template>
  <el-form ref="userRef" :model="userModel" :rules="rules" label-width="80px">
    <el-form-item label="用户昵称">
      <el-input v-model="userModel.nickname" maxlength="30" />
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="userModel.phoneNumber" maxlength="11" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="userModel.email" maxlength="50" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="userModel.sex">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
