import { http } from "@/utils/http";

export interface OperationLogsQuery extends BasePageQuery {
  businessType?: string;
  requestModule?: string;
  status?: string;
  username?: string;
}

export interface OperationLogDTO {
  businessType?: number;
  businessTypeStr?: string;
  calledMethod?: string;
  deptId?: number;
  deptName?: string;
  errorStack?: string;
  operationId?: number;
  operationParam?: string;
  operationResult?: string;
  operationTime?: Date;
  operatorIp?: string;
  operatorLocation?: string;
  operatorType?: number;
  operatorTypeStr?: string;
  requestMethod?: string;
  requestModule?: string;
  requestUrl?: string;
  status?: number;
  statusStr?: string;
  userId?: number;
  username?: string;
}

/** 获取操作日志列表 */
export const getOperationLogListApi = (params?: OperationLogsQuery) => {
  return http.request<ResponseData<PageDTO<OperationLogDTO>>>(
    "get",
    "/logs/operationLogs",
    {
      params
    }
  );
};

export const exportOperationLogExcelApi = (
  params: OperationLogsQuery,
  fileName: string
) => {
  return http.download("/logs/operationLogs/excel", fileName, {
    params
  });
};

export const deleteOperationLogApi = (data: Array<number>) => {
  return http.request<ResponseData<void>>("delete", "/logs/operationLogs", {
    params: {
      // 需要将数组转换为字符串  否则Axios会将参数变成 noticeIds[0]:1  noticeIds[1]:2 这种格式，后端接收参数不成功
      operationIds: data.toString()
    }
  });
};
