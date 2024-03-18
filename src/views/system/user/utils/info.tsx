import { type Ref, h, ref, watch, reactive, onMounted, computed } from "vue";
import croppingUpload from "../upload.vue";
import { baseUrlAvatar } from "@/api/utils";
import { zxcvbn } from "@zxcvbn-ts/core";
import { isAllEmpty, isNull, isEmail } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
import { storageLocal } from "@pureadmin/utils";
import * as User from "@/api/system/user";
import {
  ElForm,
  ElInput,
  ElFormItem,
  ElProgress,
  ElButton
} from "element-plus";
import { message } from "@/utils/message";
import { formRulesPwd, formRulesEmail } from "./rule";
import type { FormInstance } from "element-plus";

export function useUser(tableRef: Ref, treeRef: Ref) {
  console.log(tableRef, treeRef);
  // 上传头像信息
  const avatarInfo = ref();
  const ruleFormRef = ref();
  // 重置的新密码
  const pwdForm = reactive({
    newPwd: "",
    oldPwd: "",
    newPwdCop: ""
  });
  const pwdProgress = [
    { color: "#e74242", text: "非常弱" },
    { color: "#EFBD47", text: "弱" },
    { color: "#ffa500", text: "一般" },
    { color: "#1bbf1b", text: "强" },
    { color: "#008000", text: "非常强" }
  ];
  const ruleEmailFormRef = ref();

  // 重置的新邮箱
  const emailForm = reactive({
    pwd: "",
    code: "",
    email: ""
  });
  // 当前密码强度（0-4）
  const curScore = ref();
  const form = reactive({
    // 左侧部门树的id
    deptId: "",
    username: "",
    createTime: "",
    phone: "",
    status: ""
  });
  /** 用户信息 */
  const userInfo = computed(() => {
    return storageLocal().getItem("user-info").user;
  });
  /** 获取邮箱验证码 */
  const getEmailCode = email => {
    if (isNull(email)) {
      message("email必填", {
        type: "error"
      });
    } else if (!isEmail(email)) {
      message("email格式错误", {
        type: "error"
      });
    } else {
      console.log("email", email);
      User.resetEmail(email)
        .then(() => {
          message("更换邮箱成功", {
            type: "success"
          });
        })
        .catch(error => {
          message(`${error}`, {
            type: "error"
          });
        });
    }
  };
  onMounted(async () => {
    console.log(userInfo);
  });

  /** 上传头像 */
  function handleUpload(row) {
    addDialog({
      title: "裁剪、上传头像",
      width: "50%",
      draggable: false,
      closeOnClickModal: false,
      contentRenderer: () =>
        h(croppingUpload, {
          imgSrc: baseUrlAvatar(row.avatarName),
          onCropper: info => (avatarInfo.value = info)
        }),
      beforeSure: done => {
        console.log("avatarInfo.value", avatarInfo.value);
        User.updateAvatarByid({ id: row.id, avatar: avatarInfo.value.blob });
        // 根据实际业务使用avatarInfo.value和row里的某些字段去调用上传头像接口即可
        done(); // 关闭弹框
      }
    });
  }

  watch(
    pwdForm,
    ({ newPwd }) =>
      (curScore.value = isAllEmpty(newPwd) ? -1 : zxcvbn(newPwd).score)
  );
  /** 重置密码 */
  function handleReset() {
    addDialog({
      title: `重置 ${userInfo.value.user.nickName} 用户的密码`,
      width: "30%",
      draggable: true,
      closeOnClickModal: false,
      contentRenderer: () => (
        <>
          <ElForm
            ref={ruleFormRef}
            model={pwdForm}
            {...{ rules: formRulesPwd }}
          >
            <ElFormItem prop="oldPwd" label="请输入旧密码：">
              <ElInput
                clearable
                show-password
                type="password"
                v-model={pwdForm.oldPwd}
                placeholder="请输入旧密码"
              />
            </ElFormItem>
            <ElFormItem prop="newPwd" label="请输入新密码：">
              <ElInput
                clearable
                show-password
                type="password"
                v-model={pwdForm.newPwd}
                placeholder="请输入新密码"
              />
            </ElFormItem>
            <div class="mt-4 flex">
              {pwdProgress.map(({ color, text }, idx) => (
                <div
                  class="w-[19vw]"
                  style={{ marginLeft: idx !== 0 ? "4px" : 0 }}
                >
                  <ElProgress
                    striped
                    striped-flow
                    duration={curScore.value === idx ? 6 : 0}
                    percentage={curScore.value >= idx ? 100 : 0}
                    color={color}
                    stroke-width={10}
                    show-text={false}
                  />
                  <p
                    class="text-center"
                    style={{ color: curScore.value === idx ? color : "" }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <ElFormItem prop="newPwdCop" label="请确认新密码：">
              <ElInput
                clearable
                show-password
                type="password"
                v-model={pwdForm.newPwdCop}
                placeholder="请确认新密码"
              />
            </ElFormItem>
          </ElForm>
        </>
      ),
      closeCallBack: () =>
        Object.assign(pwdForm, {
          newPwd: "",
          oldPwd: "",
          newPwdCop: ""
        }),
      beforeSure: done => {
        ruleFormRef.value.validate(valid => {
          if (valid) {
            if (pwdForm.newPwd !== pwdForm.newPwdCop) {
              message(`两次密码不想等`, {
                type: "error"
              });
            } else {
              // 表单规则校验通过
              message(`已成功重置 ${userInfo.value.user.nickName} 用户的密码`, {
                type: "success"
              });
              // 根据实际业务使用pwdForm.newPwd和row里的某些字段去调用重置用户密码接口即可
              done(); // 关闭弹框
            }
          }
        });
      }
    });
  }
  /** 更换邮箱 */
  function handleResetEmail() {
    addDialog({
      title: `更换 ${userInfo.value.user.nickName} 用户的邮箱`,
      width: "30%",
      draggable: true,
      closeOnClickModal: false,
      contentRenderer: () => (
        <>
          <ElForm
            ref={ruleEmailFormRef}
            model={emailForm}
            {...{ rules: formRulesEmail }}
          >
            <ElFormItem prop="email" label="新邮箱：">
              <ElInput
                clearable
                type="email"
                v-model={emailForm.email}
                placeholder="请输入邮箱"
              />
            </ElFormItem>
            <ElFormItem prop="code" label="验证码：">
              <ElInput
                clearable
                type="text"
                v-model={emailForm.code}
                placeholder="请输入验证码"
                v-slots={{
                  append: () => (
                    <ElButton onClick={() => getEmailCode(emailForm.email)}>
                      获取验证码
                    </ElButton>
                  )
                }}
              ></ElInput>
            </ElFormItem>
            <ElFormItem prop="pwd" label="当前密码：">
              <ElInput
                clearable
                show-password
                type="password"
                v-model={emailForm.pwd}
                placeholder="请输入当前密码"
              />
            </ElFormItem>
          </ElForm>
        </>
      ),
      closeCallBack: () =>
        Object.assign(emailForm, {
          pwd: "",
          code: "",
          email: ""
        }),
      beforeSure: done => {
        ruleEmailFormRef.value.validate(valid => {
          if (valid) {
            console.log("emailForm", emailForm);
            User.updateEmail({
              code: emailForm.code,
              pass: emailForm.pwd,
              email: emailForm.email
            })
              .then(() => {
                // 表单规则校验通过
                message(
                  `已成功更换 ${userInfo.value.user.nickName} 用户的邮箱`,
                  {
                    type: "success"
                  }
                );
                // 根据实际业务使用pwdForm.newPwd和row里的某些字段去调用重置用户密码接口即可
                done(); // 关闭弹框
              })
              .catch(error => {
                console.log("error", error.response);
                console.log("error", error.response.data.message);
                message(`验证码错误：${error.response.data.message}`, {
                  type: "error"
                });
              });
          }
        });
      }
    });
  }
  //更新用户谢谢
  const submitEditUser = async (formEl: FormInstance | undefined, userI) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log("userI!", userI);
        User.editUser({
          id: userI.id,
          nickName: userI.nickName,
          gender: userI.gender,
          phone: userI.phone
        });
      } else {
        console.log("error submit!", fields);
      }
    });
  };
  return {
    form,
    userInfo,
    handleUpload,
    handleReset,
    handleResetEmail,
    submitEditUser
  };
}
