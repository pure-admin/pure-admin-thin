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
  /** 系统字典配置（下拉选项之类的） */
  dictionary: Map<String, Array<DictionaryData>>;
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

/**
 * 后端token实现
 */
export type TokenDTO = {
  /** token */
  token: string;
  /** 当前登录的用户 */
  currentUser: CurrentLoginUserDTO;
};

export type CurrentLoginUserDTO = {
  userInfo: any;
  roleKey: string;
  permissions: Set<string>;
};

export type DictionaryData = {
  label: string;
  value: number;
  cssTag: string;
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
  return http.request<ResponseData<TokenDTO>>("post", "/login", { data });
};

/** 获取当前登录用户接口 */
export const getLoginUserInfo = () => {
  return http.request<ResponseData<TokenDTO>>("get", "/getLoginUserInfo");
};
