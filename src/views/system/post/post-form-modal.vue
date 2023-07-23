<script setup lang="ts">
import VDialog from "@/components/VDialog/VDialog.vue";
import { computed, reactive, ref } from "vue";
import {
  AddPostCommand,
  PostPageResponse,
  UpdatePostCommand,
  addPostApi,
  updatePostApi
} from "@/api/system/post";
import { useUserStoreHook } from "@/store/modules/user";
import { ElMessage, FormInstance, FormRules } from "element-plus";

interface Props {
  type: "add" | "update";
  modelValue: boolean;
  row?: PostPageResponse;
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

const formData = reactive<AddPostCommand | UpdatePostCommand>({
  postId: 0,
  postCode: "",
  postName: "",
  postSort: 1,
  remark: "",
  status: ""
});

const statusList = useUserStoreHook().dictionaryMap["common.status"];

const rules: FormRules = {
  postName: [
    {
      required: true,
      message: "岗位名称不能为空"
    }
  ],
  postCode: [
    {
      required: true,
      message: "岗位编码不能为空"
    }
  ],
  postSort: [
    {
      required: true,
      message: "岗位序号不能为空"
    }
  ]
};
const formRef = ref<FormInstance>();
function handleOpened() {
  if (props.row) {
    Object.assign(formData, props.row);
  } else {
    formRef.value?.resetFields();
  }
}

const loading = ref(false);
async function handleConfirm() {
  try {
    loading.value = true;
    if (props.type === "add") {
      await addPostApi(formData);
    } else if (props.type === "update") {
      await updatePostApi(formData as UpdatePostCommand);
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
    :fixed-body-height="false"
    use-body-scrolling
    :title="type === 'add' ? '新增岗位' : '更新岗位'"
    v-model="visible"
    :loading="loading"
    @confirm="handleConfirm"
    @cancel="visible = false"
    @opened="handleOpened"
  >
    <el-form :model="formData" label-width="120px" :rules="rules" ref="formRef">
      <el-form-item prop="postName" label="岗位名称" required inline-message>
        <el-input v-model="formData.postName" />
      </el-form-item>
      <el-form-item prop="postCode" label="岗位编码" required>
        <el-input v-model="formData.postCode" />
      </el-form-item>
      <el-form-item prop="postSort" label="岗位顺序" required>
        <el-input-number :min="1" v-model="formData.postSort" />
      </el-form-item>
      <el-form-item prop="status" label="岗位状态">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="item in Object.keys(statusList)"
            :key="item"
            :label="statusList[item].value"
            >{{ statusList[item].label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="remark" label="备注" style="margin-bottom: 0">
        <el-input type="textarea" v-model="formData.remark" />
      </el-form-item>
    </el-form>
  </v-dialog>
</template>
