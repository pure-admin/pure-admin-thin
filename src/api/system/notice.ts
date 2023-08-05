import { http } from "@/utils/http";

export interface SystemNoticeQuery extends BasePageQuery {
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
