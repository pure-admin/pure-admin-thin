import { http } from "@/utils/http";
import {
  type ApiAbstract,
  type Page,
  PageQuery,
  VersionEntity
} from "@/utils/http/ApiAbstract";
import { baseUrlApi } from "../utils";

export class Job extends VersionEntity {
  id: number;
  /**
   * 岗位名称
   */
  name: string;

  /**
   * 岗位排序
   */
  jobSort: number;

  /**
   * 是否启用
   */
  enabled: boolean;
}
export class JobQueryCriteria extends PageQuery {
  name: string;
  enabled: boolean;
  createTime: Date[];
}

export const get = (params?: number | any) => {
  return http.request<ApiAbstract<Page<Job>>>("get", baseUrlApi("job"), {
    params
  });
};

export const add = (data: Partial<Job>) => {
  return http.request("post", baseUrlApi("job"), {
    data
  });
};

export const del = (ids: number[] | any) => {
  return http.request("delete", baseUrlApi("job"), {
    data: ids
  });
};
export const edit = (data: Partial<Job>) => {
  return http.request("put", baseUrlApi("job"), {
    data
  });
};
export const download = (data: Partial<JobQueryCriteria>) => {
  return http.request<Blob>(
    "get",
    baseUrlApi("job/download"),
    {
      data
    },
    { responseType: "blob" }
  );
};
