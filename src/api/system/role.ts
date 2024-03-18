import { http } from "@/utils/http";
import { type ApiAbstract, PageQuery } from "@/utils/http/ApiAbstract";
import { baseUrlApi } from "../utils";
import type { Dept } from "./dept";

export class Role {
  id: number;
  /**
   * 用户
   */
  users: any;
  /**
   * 菜单
   */
  menus: any;
  /**
   * 部门
   */
  depts: Dept[] | any[];
  /**
   * 名称
   */
  name: string;
  /**
   * 数据权限，全部 、 本级 、 自定义
   */
  dataScope: string;
  /**
   * 级别，数值越小，级别越大
   */
  level: number;
  /**
   * 描述
   */
  description: string;
}
export class RoleQueryCriteria extends PageQuery {
  blurry: string;
  createTime: Date[];
}
export const getAll = (data: Partial<RoleQueryCriteria>) => {
  return http.request<Role[]>("get", baseUrlApi("roles/all"), {
    data
  });
};

export const get = (params?: number | any) => {
  return http.request<ApiAbstract<Role>>("get", baseUrlApi("roles"), {
    params
  });
};

export const getLevel = () => {
  return http.request("get", baseUrlApi("roles/level"));
};

export const editMenu = data => {
  return http.request("put", baseUrlApi("roles/menu"), { data });
};
export const add = (data: Partial<Role>) => {
  return http.request("post", baseUrlApi("roles"), {
    data
  });
};

export const del = (ids: number[] | any) => {
  return http.request("delete", baseUrlApi("roles"), {
    data: ids
  });
};
export const edit = (data: Partial<Role>) => {
  return http.request<ApiAbstract<Role>>("put", baseUrlApi("roles"), {
    data
  });
};
export const menus = (data: Partial<Dept>) => {
  return http.request("put", baseUrlApi("roles/menu"), {
    data
  });
};
export const download = (data: Partial<RoleQueryCriteria>) => {
  return http.request<Blob>(
    "get",
    baseUrlApi("roles/download"),
    {
      data
    },
    { responseType: "blob" }
  );
};
