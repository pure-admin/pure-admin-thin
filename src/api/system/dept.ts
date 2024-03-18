import { http } from "@/utils/http";
import { PageQuery, type ApiAbstract } from "@/utils/http/ApiAbstract";
import { baseUrlApi } from "../utils";

export class Dept {
  createBy: string;
  createTime: Date;
  deptSort: number;
  enabled: boolean;
  hasChildren: boolean;
  id: number;
  pid: number;
  status: number;
  label: string;
  leaf: boolean;
  name: string;
  subCount: number;
  updateBy: string;
  updateTime: Date;
  menus: any[];
}
export class DeptQueryCriteria extends PageQuery {
  name: string;
  enabled: boolean;
  pid: number;
  pidIsNull: boolean;
  createTime: Array<Date>;
}

export const getDepts = (params: DeptQueryCriteria | any) => {
  return http.request<ApiAbstract<Dept>>("get", baseUrlApi("dept"), {
    params
  });
};
export const getDeptTree = (params?: DeptQueryCriteria | any) => {
  return http.request<ApiAbstract<Dept>>("get", baseUrlApi("dept/treeAll"), {
    params
  });
};

export const getDeptSuperior = (ids: Number[]) => {
  const data = ids.length || ids.length === 0 ? ids : Array.of(ids);
  return http.request<ApiAbstract<Dept>>("post", baseUrlApi("dept/superior"), {
    data
  });
};

export const add = (data: Partial<Dept>) => {
  return http.request<ApiAbstract<Dept>>("post", baseUrlApi("dept"), {
    data
  });
};

export const del = (ids: number[] | any) => {
  return http.request("delete", baseUrlApi("dept"), {
    data: ids
  });
};
export const edit = (data: Partial<Dept>) => {
  return http.request<ApiAbstract<Dept>>("put", baseUrlApi("dept"), {
    data
  });
};
export const download = (data: Partial<DeptQueryCriteria>) => {
  return http.request<Blob>(
    "get",
    baseUrlApi("dept/download"),
    {
      data
    },
    { responseType: "blob" }
  );
};
