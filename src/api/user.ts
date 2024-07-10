import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    /** Đường dẫn ảnh đại diện */
    avatar: string;
    /** Tên người dùng */
    username: string;
    /** Bút danh */
    nickname: string;
    /** Các vai trò của người dùng hiện tại */
    roles: Array<string>;
    /** Mã thông báo truy cập */
    accessToken: string;
    /** Mã thông báo cần thiết để gọi API làm mới `accessToken` */
    refreshToken: string;
    /** Thời gian hết hạn của `accessToken` (định dạng 'xxxx/xx/xx xx:xx:xx') */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** Mã thông báo truy cập */
    accessToken: string;
    /** Mã thông báo cần thiết để gọi API làm mới `accessToken` */
    refreshToken: string;
    /** Thời gian hết hạn của `accessToken` (định dạng 'xxxx/xx/xx xx:xx:xx') */
    expires: Date;
  };
};

/** Đăng nhập */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/login", { data });
};

/** Làm mới `token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};
