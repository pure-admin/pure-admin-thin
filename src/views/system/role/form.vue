<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: 0,
    name: "",
    description: "",
    dataScope: "全部",
    level: 0,
    depts: [],
    deptIds: []
  })
});
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const props1 = {
  multiple: true,
  value: "id",
  label: "name",
  checkStrictly: true
};
function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-row>
      <el-col>
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入角色名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="角色级别" prop="level">
          <el-input-number
            v-model="newFormInline.level"
            clearable
            :min="0"
            placeholder="请输入角色级别"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数据范围" prop="dataScope">
          <el-select
            v-model="newFormInline.dataScope"
            filterable
            placeholder="请选择数据范围"
          >
            <el-option key="全部" value="全部" label="全部" default />
            <el-option key="本级" value="本级" label="本级" />
            <el-option key="自定义" value="自定义" label="自定义" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col v-show="newFormInline.dataScope === '自定义'">
        <el-form-item label="数据权限" prop="deptIds">
          <el-cascader
            v-model="newFormInline.deptIds"
            placeholder="请选择部门"
            clearable
            filterable
            :props="props1"
            :show-all-levels="false"
            :options="newFormInline.depts"
          >
            <template #default="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf && data.children?.length > 0">
                ({{ data.children?.length }})
              </span>
            </template>
          </el-cascader>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="备注">
          <el-input
            v-model="newFormInline.description"
            placeholder="请输入备注信息"
            type="textarea"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
