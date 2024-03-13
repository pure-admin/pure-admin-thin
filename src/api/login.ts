import { http } from "@/utils/http";
import { ApiAbstract } from "@/utils/http/ApiAbstract";
import { baseUrlAuth } from "./utils";
import Cookies from "js-cookie";
export class UserResult extends ApiAbstract {
  declare data: {
    img: string;
    uuid: string;
  };
}
export interface UserUser {
  avatarName?: string;
  avatarPath?: string;
  createTime?: Date;
  dept?: any;
  deptId?: 0;
  email?: string;
  enabled?: boolean;
  gender?: string;
  id?: Number;
  isAdmin?: boolean;
  jobs?: any;
  nickName?: string;
  password?: string;
  phone?: string;
  roles?: any;
  updateBy?: string;
  updateTime?: Date;
  username?: string;
}
export interface User {
  authorities?: any;
  dataScopes?: any;
  roles?: any;
  user?: UserUser;
}
export class UserLogResult extends ApiAbstract {
  declare data: {
    token: string;
    user: User;
    username: string;
    roles: Array<string>;
  };
}

/** 获取验证码 */
export const getCode = () => {
  return http.request<UserResult>("get", baseUrlAuth("code"));
};

/** 登录 */
export const login = (data?: object) => {
  return http.request<UserLogResult>("post", baseUrlAuth("login"), { data });
};
/** 获取用户信息 */
export const userInfo = () => {
  return http.request<ApiAbstract>("get", baseUrlAuth("info"), null, {
    headers: {
      Authorization: Cookies.get("token")
    }
  });
};

/** 退出登录 */
export const logout = () => {
  return http.request<UserResult>("delete", baseUrlAuth("logout"));
};
