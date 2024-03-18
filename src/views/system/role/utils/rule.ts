import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "角色名称为必填项", trigger: "blur" }],
  code: [{ required: true, message: "角色标识为必填项", trigger: "blur" }],
  deptIds: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === "" || value.lenght < 1) {
          callback(new Error("手机号为必填项"));
        } else {
          callback();
        }
      },
      trigger: "blur"
      // trigger: "click" // 如果想在点击确定按钮时触发这个校验，trigger 设置成 click 即可
    }
  ]
});
