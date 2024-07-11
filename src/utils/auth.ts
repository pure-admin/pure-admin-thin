import Cookies from "js-cookie";
import { storageLocal } from "@pureadmin/utils";
import { useUserStoreHook } from "@/store/modules/user";

// Định nghĩa interface cho thông tin dữ liệu người dùng
export interface DataInfo<T> {
  /** Token truy cập */
  accessToken: string;
  /** Thời gian hết hạn của accessToken (dưới dạng timestamp) */
  expires: T;
  /** Token dùng để làm mới accessToken */
  refreshToken: string;
  /** Ảnh đại diện */
  avatar?: string;
  /** Tên đăng nhập */
  username?: string;
  /** Biệt danh */
  nickname?: string;
  /** Các vai trò của người dùng hiện tại */
  roles?: Array<string>;
}

// Khai báo các hằng số
export const userKey = "user-info"; // Key cho localStorage lưu thông tin người dùng
export const TokenKey = "authorized-token"; // Key cho cookie lưu token truy cập
export const multipleTabsKey = "multiple-tabs"; // Key cho cookie kiểm tra nhiều tab mở
export const oidcKey = "admin-pure-oidcuser"; // Key cho localStorage lưu thông tin người dùng
/**
 * Hàm lấy thông tin token từ cookie hoặc localStorage
 * Nếu không tìm thấy token trong cookie, thử lấy từ localStorage
 */
export function getToken(): DataInfo<number> {
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageLocal().getItem(userKey);
}

/**
 * Hàm thiết lập thông tin token và thông tin người dùng
 * Sử dụng phương thức làm mới token mà không cần đăng nhập lại
 * Lưu accessToken, expires và refreshToken vào cookie với key là TokenKey
 * Lưu avatar, username, nickname, roles, refreshToken và expires vào localStorage với key là userKey
 */
export function setToken(data: DataInfo<Date>) {
  let expires = 0;
  const { accessToken, refreshToken } = data;
  const { isRemembered, loginDay } = useUserStoreHook();

  // Xử lý giá trị của expires
  expires = new Date(data.expires).getTime();
  const cookieString = JSON.stringify({ accessToken, expires, refreshToken });

  // Thiết lập cookie TokenKey với các thông tin vừa xử lý
  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expires - Date.now()) / 86400000
      })
    : Cookies.set(TokenKey, cookieString);

  // Thiết lập cookie multipleTabsKey để kiểm tra nhiều tab
  Cookies.set(
    multipleTabsKey,
    "true",
    isRemembered
      ? {
          expires: loginDay
        }
      : {}
  );

  // Hàm để thiết lập thông tin người dùng vào localStorage và store Vuex
  function setUserKey({ avatar, username, nickname, roles }) {
    useUserStoreHook().SET_AVATAR(avatar);
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_NICKNAME(nickname);
    useUserStoreHook().SET_ROLES(roles);
    storageLocal().setItem(userKey, {
      refreshToken,
      expires,
      avatar,
      username,
      nickname,
      roles
    });
  }

  // Kiểm tra và thiết lập thông tin người dùng
  if (data.username) {
    const { username, roles } = data;
    setUserKey({
      avatar: data?.avatar ?? "",
      username,
      nickname: data?.nickname ?? "",
      roles
    });
  } else {
    const avatar =
      storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "";
    const username =
      storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "";
    const nickname =
      storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "";
    const roles =
      storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [];
    setUserKey({
      avatar,
      username,
      nickname,
      roles
    });
  }
}

/**
 * Hàm xóa thông tin token và thông tin người dùng từ cookie và localStorage
 */
export function removeToken() {
  Cookies.remove(TokenKey); // Xóa cookie TokenKey
  Cookies.remove(multipleTabsKey); // Xóa cookie multipleTabsKey
  storageLocal().removeItem(userKey); // Xóa localStorage userKey
}

/**
 * Hàm định dạng token JWT
 */
export const formatToken = (token: string): string => {
  return "Bearer " + token;
};
