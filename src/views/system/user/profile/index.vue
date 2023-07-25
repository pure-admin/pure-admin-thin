<script setup lang="ts">
import resetPwd from "./resetPwd.vue";
import userInfo from "./userInfo.vue";
import userAvatar from "./userAvatar.vue";
// import userAvatar from "./userAvatar";
// import { getUserProfile } from '@/api/system/user';
// import * as userApi from "@/api/system/userApi";
import { reactive, ref } from "vue";
import dayjs from "dayjs";
import { useUserStoreHook } from "@/store/modules/user";

const activeTab = ref("userinfo");
const state = reactive({
  user: {},
  roleName: {},
  postName: {}
});

/** 用户名 */
const currentUserInfo = useUserStoreHook()?.currentUserInfo;

state.user = currentUserInfo;
console.log(currentUserInfo);

function getUser() {
  // userApi.getUserProfile().then(response => {
  //   state.user = response.user;
  //   state.roleName = response.roleName;
  //   state.postName = response.postName;
  // });
}

getUser();
</script>
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>个人信息</span>
            </div>
          </template>
          <div>
            <div class="text-center">
              <userAvatar :user="state.user" />
            </div>

            <el-row>
              <el-descriptions :column="1">
                <el-descriptions-item label="用户名称">{{
                  currentUserInfo.username
                }}</el-descriptions-item>
                <el-descriptions-item label="手机号码">{{
                  currentUserInfo.phoneNumber
                }}</el-descriptions-item>
                <el-descriptions-item label="用户邮箱">{{
                  currentUserInfo.email
                }}</el-descriptions-item>
                <el-descriptions-item label="部门 / 职位">
                  {{ currentUserInfo.deptName }} /
                  {{ currentUserInfo.postName }}
                </el-descriptions-item>
                <el-descriptions-item label="角色">
                  {{ currentUserInfo.roleName }}
                </el-descriptions-item>
                <el-descriptions-item label="创建日期">
                  {{
                    dayjs(currentUserInfo.createTime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }}
                </el-descriptions-item>
              </el-descriptions>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>基本资料</span>
            </div>
          </template>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="state.user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="state.user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
