import { http } from "@/utils/http";

export type CaptchaDTO = {
  /**  验证码的base64图片 */
  captchaCodeImg: string;
  /** 验证码对应的缓存key */
  captchaCodeKey: string;
};

export type ConfigDTO = {
  /** 验证码开关 */
  isCaptchaOn: boolean;
};

export type LoginByPasswordDTO = {
  /** 用户名 */
  username: string;
  /**  密码 */
  password: string;
  /** 验证码 */
  captchaCode: string;
  /** 验证码对应的缓存key */
  captchaCodeKey: string;
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 获取系统配置接口 */
export const getConfig = () => {
  return http.request<ResponseData<ConfigDTO>>("get", "/getConfig");
};

/** 验证码接口 */
export const getCaptchaCode = () => {
  return http.request<ResponseData<CaptchaDTO>>("get", "/captchaImage");
};

/** 登录接口 */
export const loginByPassword = (data: LoginByPasswordDTO) => {
  return http.request<ResponseData<any>>("post", "/login", { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
};
