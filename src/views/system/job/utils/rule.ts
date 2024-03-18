import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "岗位名称为必填项", trigger: "blur" }],
  jobSort: [{ required: true, message: "岗位排序为必填项", trigger: "blur" }]
});
