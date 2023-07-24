<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./rule";
import { UserRequest } from "@/api/system/user";
import { PostPageResponse } from "@/api/system/post";
import { RoleDTO } from "@/api/system/role";
import { useUserStoreHook } from "@/store/modules/user";

interface FormProps {
  formInline: UserRequest;
  deptOptions: any[];
  postOptions: PostPageResponse[];
  roleOptions: RoleDTO[];
}

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    userId: 0,
    username: "",
    nickname: "",
    deptId: 0,
    phone: "",
    email: "",
    password: "",
    sex: 0,
    status: 1,
    postId: 0,
    roleId: 0,
    remark: ""
  }),
  deptOptions: () => [],
  postOptions: () => [],
  roleOptions: () => []
});

const newFormInline = ref(props.formInline);
const deptOptions = ref(props.deptOptions);
const roleOptions = ref(props.roleOptions);
const postOptions = ref(props.postOptions);

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
      <re-col :value="12">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="newFormInline.username"
            clearable
            placeholder="请输入用户名"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12">
        <el-form-item label="部门">
          <el-tree-select
            class="w-full"
            v-model="newFormInline.deptId"
            :data="deptOptions"
            :show-all-levels="false"
            value-key="id"
            :props="{
              value: 'id',
              label: 'deptName',
              emitPath: false,
              checkStrictly: true
            }"
            clearable
            placeholder="请选择部门"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12">
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input
            v-model="newFormInline.phoneNumber"
            clearable
            placeholder="请输入手机号码"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12">
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="newFormInline.email"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12">
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入昵称"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12">
        <el-form-item label="性别" prop="sex">
          <el-select
            class="w-full"
            v-model="newFormInline.sex"
            placeholder="请选择性别"
            clearable
          >
            <el-option
              v-for="dict in useUserStoreHook().dictionaryList['sysUser.sex']"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12">
        <el-form-item label="岗位" prop="postId">
          <el-select
            class="w-full"
            v-model="newFormInline.postId"
            placeholder="请选择岗位"
            clearable
          >
            <el-option
              v-for="item in postOptions"
              :key="item.postId"
              :label="item.postName"
              :value="item.postId"
              :disabled="item.status == 0"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12">
        <el-form-item label="角色" prop="roleId">
          <el-select
            class="w-full"
            v-model="newFormInline.roleId"
            placeholder="请选择角色"
            clearable
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
              :disabled="item.status == 0"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="newFormInline.status">
            <el-radio
              v-for="item in useUserStoreHook().dictionaryList['common.status']"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>

      <re-col :value="12" v-if="newFormInline.password !== undefined">
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="newFormInline.password"
            clearable
            placeholder="请输入密码"
          />
        </el-form-item>
      </re-col>
      <re-col :value="24">
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="newFormInline.remark"
            clearable
            placeholder="请输入备注内容"
            rows="6"
            type="textarea"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
