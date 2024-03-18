import { http } from "@/utils/http";
import {
  type ApiAbstract,
  PageQuery,
  VersionEntity
} from "@/utils/http/ApiAbstract";
import { baseUrlApi } from "../utils";
import type { Role } from "./role";
import type { Job } from "./job";
import type { Dept } from "./dept";
import { encrypt } from "@/utils/rsaEncrypt";

export class User extends VersionEntity {
  id: number;
  /**
   * 用户角色
   */
  roles: Role[];
  /**
   * 用户岗位
   */
  jobs: Job[];
  /**
   * 用户部门
   */
  dept: Dept;
  /**
   * 用户名称
   */
  username: string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 电话号码
   */
  phone: string;
  /**
   * 用户性别
   */
  gender: string;
  /**
   * 头像真实名称
   */
  avatarName: string;
  /**
   * 头像存储的路径
   */
  avatarPath: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 是否启用
   */
  enabled: string;
  /**
   * 是否为admin账号
   */
  isAdmin: boolean;
  /**
   * 最后修改密码的时间
   */
  pwdResetTime: Date;
}
export class UserQueryCriteria extends PageQuery {
  name: string;
  deptId: number;
  deptIds: number[];
  enabled: boolean;
  createTime: Date[];
}

export const get = (params: number | any) => {
  return http.request<ApiAbstract<User>>("get", baseUrlApi("users"), {
    params
  });
};

export const add = (data: Partial<User>) => {
  return http.request("post", baseUrlApi("users"), {
    data
  });
};

export const del = (ids: number[] | any) => {
  return http.request("delete", baseUrlApi("users"), {
    data: ids
  });
};
export const edit = (data: Partial<User>) => {
  return http.request("put", baseUrlApi("users"), {
    data
  });
};
export const download = (data: Partial<UserQueryCriteria>) => {
  return http.request<Blob>(
    "get",
    baseUrlApi("users/download"),
    {
      data
    },
    { responseType: "blob" }
  );
};

export const updateAvatarByid = ({ id, avatar }) => {
  const formData = new FormData();
  formData.append("avatar", avatar, "avatar.jpg");
  return http.request("post", baseUrlApi("/users/updateAvatar/" + id), {
    data: formData,
    // 请求超时时间
    timeout: 60000,
    headers: {
      "Content-Type": "multipart/form-data",
      filename: "avatar.png"
    }
  });
};

export function updatePass({ oldPass, newPass }) {
  const data = {
    oldPass: encrypt(oldPass),
    newPass: encrypt(newPass)
  };
  return http.request("post", baseUrlApi("users/updatePass"), {
    data
  });
}

export function resetEmail(data) {
  return http.request("post", baseUrlApi("/code/resetEmail?email=" + data));
}

export function updateEmail(form) {
  const data = {
    password: encrypt(form.pass),
    email: form.email
  };
  return http.request("post", baseUrlApi("users/updateEmail/" + form.code), {
    data
  });
}
export function editUser(data) {
  return http.request("put", baseUrlApi("users/center"), {
    data
  });
}

export function getLog() {
  return http.request("get", baseUrlApi("logs/user"));
}
