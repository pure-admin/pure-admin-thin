import { http } from "@/utils/http";
import type { ApiAbstract } from "@/utils/http/ApiAbstract";

export const baseUrlApi = (url: string) => `/api/${url}`;
export const baseUrlAuth = (url: string) => `/auth/${url}`;
export const baseUrlAvatar = (url: string) => `/avatar/${url}`;

export const get = (params: any) => {
  return http.request<ApiAbstract>("get", baseUrlApi("menus"), {
    params
  });
};

export const add = (data: any) => {
  return http.request("post", baseUrlApi("menus"), {
    data
  });
};

export const del = (ids: number[] | any) => {
  return http.request("delete", baseUrlApi("menus"), {
    data: ids
  });
};
export const edit = (data: any) => {
  return http.request<ApiAbstract>("put", baseUrlApi("menus"), {
    data
  });
};
export const download = (data: any) => {
  return http.request<Blob>(
    "get",
    baseUrlApi("menus/download"),
    {
      data
    },
    { responseType: "blob" }
  );
};
