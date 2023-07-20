import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  configValue: [
    { required: true, message: "角色名称为必填项", trigger: "blur" }
  ]
});
