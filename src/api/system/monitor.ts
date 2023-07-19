import { http } from "@/utils/http";

export interface OnlineUserQuery {
  ipAddress: string;
  username: string;
}

export interface OnlineUserInfo {
  browser?: string;
  deptName?: string;
  ipAddress?: string;
  loginLocation?: string;
  loginTime?: number;
  operationSystem?: string;
  tokenId?: string;
  username?: string;
}

/** 获取操作日志列表 */
export const getOnlineUserListApi = (params?: OnlineUserQuery) => {
  return http.request<ResponseData<PageDTO<OnlineUserInfo>>>(
    "get",
    "/monitor/onlineUsers",
    {
      params
    }
  );
};

export const logoutOnlineUserApi = (tokenId: string) => {
  return http.request<ResponseData<void>>(
    "delete",
    `/monitor/onlineUser/${tokenId}`
  );
};
