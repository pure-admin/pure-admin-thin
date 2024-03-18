import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { isPhone, isEmail } from "@pureadmin/utils";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  nickName: [{ required: true, message: "用户昵称为必填项", trigger: "blur" }],
  username: [{ required: true, message: "用户名称为必填项", trigger: "blur" }],
  password: [{ required: true, message: "用户密码为必填项", trigger: "blur" }],
  phone: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("手机号为必填项"));
        } else if (!isPhone(value)) {
          callback(new Error("请输入正确的手机号码格式"));
        } else {
          callback();
        }
      },
      trigger: "blur"
      // trigger: "click" // 如果想在点击确定按钮时触发这个校验，trigger 设置成 click 即可
    }
  ],
  email: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("邮箱为必填项"));
        } else if (!isEmail(value)) {
          callback(new Error("请输入正确的邮箱格式"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  parentId: [{ required: true, message: "部门为必填项", trigger: "blur" }],
  roleOptionsId: [{ required: true, message: "角色为必填项", trigger: "blur" }],
  jobOptionsId: [{ required: true, message: "岗位为必填项", trigger: "blur" }]
});

/** 自定义修改密码规则校验 */
export const formRulesPwd = reactive(<FormRules>{
  oldPwd: [{ required: true, message: "旧密码为必填项", trigger: "blur" }],
  newPwd: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("新密码为必填项"));
        } else if (value.length < 6) {
          callback(new Error("密码长度小于6"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  newPwdCop: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("确认新密码为必填项"));
        } else if (value.length < 6) {
          callback(new Error("密码长度小于6"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});
/** 自定义修改邮箱规则校验 */
export const formRulesEmail = reactive(<FormRules>{
  email: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("邮箱为必填项"));
        } else if (!isEmail(value)) {
          callback(new Error("请输入正确的邮箱格式"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  code: [
    { required: true, message: "验证码为必填项", trigger: "blur" },
    { min: 4, max: 8, message: "Length should be 4 to 8", trigger: "blur" }
  ],
  pwd: [
    { required: true, message: "密码为必填项", trigger: "blur" },
    { min: 6, max: 18, message: "Length should be 4 to 8", trigger: "blur" }
  ]
});
