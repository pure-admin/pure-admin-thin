<script setup lang="ts">
import VDialog from "@/components/VDialog/VDialog.vue";
import { computed, reactive, ref } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import {
  AddRoleCommand,
  RoleDTO,
  UpdateRoleCommand,
  addRoleApi,
  updateRoleApi
} from "@/api/system/role";
import { MenuDTO } from "@/api/system/menu";

interface Props {
  type: "add" | "update";
  modelValue: boolean;
  row?: RoleDTO;
  menuOptions: MenuDTO[];
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "success"): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set(v) {
    emits("update:modelValue", v);
  }
});

const formData = reactive<AddRoleCommand | UpdateRoleCommand>({
  roleId: 0,
  dataScope: "",
  menuIds: [],
  remark: "",
  roleKey: "",
  roleName: "",
  roleSort: 1,
  status: ""
});

const statusList = useUserStoreHook().dictionaryMap["common.status"];

const rules: FormRules = {
  roleName: [
    {
      required: true,
      message: "角色名称不能为空"
    }
  ],
  roleKey: [
    {
      required: true,
      message: "权限标识不能为空"
    }
  ],
  roleSort: [
    {
      required: true,
      message: "角色序号不能为空"
    }
  ]
};
const formRef = ref<FormInstance>();
function handleOpened() {
  console.log("opened", props.row);
  if (props.row) {
    Object.assign(formData, props.row);
    formData.menuIds = props.row.selectedMenuList;
  } else {
    formRef.value?.resetFields();
  }
}

const treeRef = ref<InstanceType<typeof ElTree>>();
function handleCheckChange() {
  formData.menuIds = treeRef.value.getCheckedKeys(false) as number[];
}

const loading = ref(false);
async function handleConfirm() {
  try {
    loading.value = true;
    if (props.type === "add") {
      await addRoleApi(formData);
    } else if (props.type === "update") {
      await updateRoleApi(formData as UpdateRoleCommand);
    }
    ElMessage.info("提交成功");
    visible.value = false;
    emits("success");
  } catch (e) {
    console.error(e);
    ElMessage.error((e as Error)?.message || "提交失败");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <v-dialog
    show-full-screen
    fixed-body-height
    use-body-scrolling
    :title="type === 'add' ? '新增角色' : '更新角色'"
    v-model="visible"
    :loading="loading"
    @confirm="handleConfirm"
    @cancel="visible = false"
    @opened="handleOpened"
  >
    <el-form :model="formData" label-width="120px" :rules="rules" ref="formRef">
      <el-form-item prop="roleName" label="角色名称" required inline-message>
        <el-input v-model="formData.roleName" />
      </el-form-item>
      <el-form-item prop="roleKey" label="权限字符" required>
        <el-input v-model="formData.roleKey" />
      </el-form-item>
      <el-form-item prop="roleSort" label="角色顺序" required>
        <el-input-number :min="1" v-model="formData.roleSort" />
      </el-form-item>
      <el-form-item prop="status" label="角色状态">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="item in Object.keys(statusList)"
            :key="item"
            :label="statusList[item].value"
            >{{ statusList[item].label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单权限" prop="menuIds">
        <el-tree
          ref="treeRef"
          :props="{ label: 'menuName', children: 'children' }"
          :data="props.menuOptions"
          node-key="id"
          check-strictly
          show-checkbox
          default-expand-all
          check-on-click-node
          :expand-on-click-node="false"
          :default-checked-keys="formData.menuIds"
          @check-change="handleCheckChange"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item prop="remark" label="备注" style="margin-bottom: 0">
        <el-input type="textarea" v-model="formData.remark" />
      </el-form-item>
    </el-form>
  </v-dialog>
</template>
