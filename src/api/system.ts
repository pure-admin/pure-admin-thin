import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

type ResultDept = {
  success: boolean;
  data?: Array<any>;
};

interface SystemNoticeQuery extends BasePageQuery {
  noticeType: string;
  noticeTitle: string;
  creatorName: string;
}

type SystemNoticeDTO = {
  noticeId: string;
  noticeTitle: string;
  noticeType: number;
  noticeContent: string;
  status: number;
  createTime: Date;
  creatorName: string;
};

export type SystemNoticeRequest = {
  noticeId?: number;
  noticeTitle: string;
  noticeType: number;
  noticeContent: string;
  status: number;
};

/** 获取用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<Result>("post", "/user", { data });
};

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<Result>("post", "/role", { data });
};

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<ResultDept>("post", "/dept", { data });
};

/** 获取系统通知列表 */
export const getSystemNoticeListApi = (params?: SystemNoticeQuery) => {
  return http.request<ResponseData<PageDTO<SystemNoticeDTO>>>(
    "get",
    "/system/notices",
    {
      params
    }
  );
};

/** 添加系统通知 */
export const addSystemNoticeApi = (data: SystemNoticeRequest) => {
  return http.request<ResponseData<void>>("post", "/system/notices", {
    data
  });
};

/** 修改系统通知 */
export const updateSystemNoticeApi = (data: SystemNoticeRequest) => {
  return http.request<ResponseData<void>>(
    "put",
    `/system/notices/${data.noticeId}`,
    {
      data
    }
  );
};

/** 删除系统通知 */
export const deleteSystemNoticeApi = (data: Array<number>) => {
  return http.request<ResponseData<void>>("delete", "/system/notices", {
    params: {
      // 需要将数组转换为字符串  否则Axios会将参数变成 noticeIds[0]:1  noticeIds[1]:2 这种格式，后端接收参数不成功
      noticeIds: data.toString()
    }
  });
};

type OperationLogDTO = {
  operationId: number;
  businessType: number;
  businessTypeStr: string;
  requestMethod: string;
  requestModule: string;
  requestUrl: string;
  calledMethod: string;
  operatorType: number;
  operatorTypeStr: string;
  userId: number;
  username: string;
  operatorIp: string;
  operatorLocation: string;
  deptId: number;
  deptName: string;
  operationParam: string;
  operationResult: string;
  status: number;
  statusStr: string;
  errorStack: string;
  operationTime: Date;
};

/** 获取操作日志列表 */
export const getOperationLogListApi = (params?: SystemNoticeQuery) => {
  return http.request<ResponseData<PageDTO<OperationLogDTO>>>(
    "get",
    "/operationLog/list",
    {
      params
    }
  );
};
