import { http } from "@/utils/http";

/** 可以做成泛型 */
export type CaptchaResult = {
  success: boolean;
  data: CaptchaDTO;
};

export type CaptchaDTO = {
  /** 验证码开关 */
  isCaptchaOn: boolean;
  /**  */
  uuid: string;
  /** `token` */
  img: string;
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

/** 验证码接口 */
export const getCaptchaCode = () => {
  return http.request<CaptchaResult>("get", "/captchaImage");
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
};
