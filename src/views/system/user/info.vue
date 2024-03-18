<script setup lang="ts">
import { ref, reactive } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useUser } from "./utils/info";
import { isPhone } from "@pureadmin/utils";
import type { FormInstance } from "element-plus";

import Check from "@iconify-icons/ep/avatar";
import SignIn from "@iconify-icons/ri/login-box-line";
import NodeTree from "@iconify-icons/ri/node-tree";
import Phone from "@iconify-icons/ep/iphone";
import Mail from "@iconify-icons/ri/mail-fill";
import Secure from "@iconify-icons/ri/secure-payment-fill";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log("tab", tab.paneName);
  console.log("event", event);
};

const treeRef = ref();
const tableRef = ref();
const ruleFormRef = ref<FormInstance>();
const {
  userInfo,
  handleUpload,
  handleReset,
  handleResetEmail,
  submitEditUser
} = useUser(tableRef, treeRef);

const user = reactive(userInfo.value);
defineOptions({
  name: "UserInfo"
});
</script>

<template>
  <div class="justify-between">
    <el-row :gutter="30">
      <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="5">
        <div class="grid-content">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>个人信息</span>
              </div>
            </template>
            <div class="el-upload">
              <el-avatar
                :size="80"
                src="https://empty"
                @click="handleUpload(userInfo)"
              >
                <img :src="'/avatar/' + userInfo.avatarName" />
              </el-avatar>
            </div>

            <ul class="user-info">
              <li>
                <div style="height: 100%">
                  <IconifyIconOffline class="check-zh" :icon="SignIn" />
                  登录账号
                  <div class="user-right">{{ userInfo.username }}</div>
                </div>
              </li>
              <li>
                <IconifyIconOffline class="check-zh" :icon="Check" />
                用户昵称
                <div class="user-right">{{ userInfo.nickName }}</div>
              </li>
              <li>
                <IconifyIconOffline class="check-zh" :icon="NodeTree" />
                所属部门
                <div class="user-right">{{ userInfo.dept.name }}</div>
              </li>
              <li>
                <IconifyIconOffline class="check-zh" :icon="Phone" />
                手机号码
                <div class="user-right">{{ userInfo.phone }}</div>
              </li>
              <li>
                <IconifyIconOffline class="check-zh" :icon="Mail" />
                用户邮箱
                <div class="user-right">{{ userInfo.email }}</div>
              </li>
              <li>
                <IconifyIconOffline class="check-zh" :icon="Secure" />
                安全设置
                <div class="user-right">
                  <a @click="handleReset">修改密码 </a>

                  <a @click="handleResetEmail"> 修改邮箱</a>
                </div>
              </li>
            </ul>
          </el-card>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="8" :lg="18" :xl="11"
        ><div class="grid-content">
          <el-tabs
            v-model="activeName"
            class="demo-tabs grid-content"
            @tab-click="handleClick"
          >
            <el-tab-pane label="用户资料" name="first">
              <el-form
                ref="ruleFormRef"
                :model="user"
                style="margin-top: 10px"
                size="small"
                label-width="65px"
              >
                <el-form-item
                  label="昵称"
                  prop="nickName"
                  :rules="[
                    {
                      required: true,
                      message: '昵称为必填项',
                      trigger: 'blur'
                    },
                    {
                      min: 3,
                      max: 12,
                      message: 'Length should be 4 to 12',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input
                    v-model="user.nickName"
                    clearable
                    style="width: 35%"
                  />
                  <span style="margin-left: 10px; color: #e6a23c"
                    >⚠️用户昵称不作为登录使用</span
                  >
                </el-form-item>
                <el-form-item
                  label="手机号"
                  prop="phone"
                  :rules="[
                    {
                      required: true,
                      message: '手机号为必填项',
                      trigger: 'blur'
                    },
                    {
                      required: true,
                      validator: (rule, value, callback) => {
                        if (value === '') {
                          callback(new Error('手机号为必填项'));
                        } else if (!isPhone(value)) {
                          callback(new Error('请输入正确的手机号码格式'));
                        } else {
                          callback();
                        }
                      },
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input v-model="user.phone" clearable style="width: 35%" />
                  <span style="margin-left: 10px; color: #e6a23c"
                    >⚠️手机号码不能重复</span
                  >
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                  <el-radio-group v-model="user.gender" style="width: 178px">
                    <el-radio label="男" value="男">男</el-radio>
                    <el-radio label="女" value="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitEditUser(ruleFormRef, user)"
                    >保存配置</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="second">操作日志</el-tab-pane>
          </el-tabs>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<style>
.el-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
  border-radius: 4px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  font-size: 32px;
  font-weight: 600;
  color: #6b778c;
}

.el-upload {
  display: inline-block;
  width: 100%;
  text-align: center;
  cursor: pointer;
  outline: none;
}

.user-info {
  padding-left: 0;
  list-style: none;

  li {
    padding: 11px 0;
    font-size: 13px;
    border-bottom: 1px solid #f0f3f4;
  }

  .user-right {
    float: right;

    a {
      color: #317ef3;
    }
  }
}

.check-zh {
  display: unset;
}
</style>
