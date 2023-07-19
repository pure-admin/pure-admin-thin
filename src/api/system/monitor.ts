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

/** 强制登出用户 */
export const logoutOnlineUserApi = (tokenId: string) => {
  return http.request<ResponseData<void>>(
    "delete",
    `/monitor/onlineUser/${tokenId}`
  );
};

/**
 * ServerInfo
 */
export interface ServerInfo {
  cpuInfo?: CpuInfo;
  diskInfos?: DiskInfo[];
  jvmInfo?: JvmInfo;
  memoryInfo?: MemoryInfo;
  systemInfo?: SystemInfo;
}

/**
 * CpuInfo
 */
export interface CpuInfo {
  cpuNum?: number;
  free?: number;
  sys?: number;
  total?: number;
  used?: number;
  wait?: number;
}

/**
 * DiskInfo
 */
export interface DiskInfo {
  dirName?: string;
  free?: string;
  sysTypeName?: string;
  total?: string;
  typeName?: string;
  usage?: number;
  used?: string;
}

/**
 * JvmInfo
 */
export interface JvmInfo {
  free?: number;
  home?: string;
  inputArgs?: string;
  max?: number;
  name?: string;
  runTime?: string;
  startTime?: string;
  total?: number;
  usage?: number;
  used?: number;
  version?: string;
}

/**
 * MemoryInfo
 */
export interface MemoryInfo {
  free?: number;
  total?: number;
  usage?: number;
  used?: number;
}

/**
 * SystemInfo
 */
export interface SystemInfo {
  computerIp?: string;
  computerName?: string;
  osArch?: string;
  osName?: string;
  userDir?: string;
}

/** 获取服务器信息 */
export const getServerInfoApi = () => {
  return http.request<ResponseData<ServerInfo>>("get", "/monitor/serverInfo");
};

/**
 * RedisCacheInfoDTO
 */
export interface RedisCacheInfoDTO {
  commandStats?: CommandStatusDTO[];
  dbSize?: number;
  info?: { [key: string]: string };
}

/**
 * CommandStatusDTO
 */
export interface CommandStatusDTO {
  name?: string;
  value?: string;
}

/** 获取Redis信息 */
export const getCacheInfoApi = () => {
  return http.request<ResponseData<ServerInfo>>("get", "/monitor/cacheInfo");
};
