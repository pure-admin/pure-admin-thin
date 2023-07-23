import { http } from "@/utils/http";
import { Tree } from "@/utils/tree";

export interface MenuQuery {
  isButton: boolean;
}

/**
 * MenuDTO
 */
export interface MenuDTO extends Tree {
  createTime?: Date;
  isButton?: number;
  id?: number;
  menuName?: string;
  parentId?: number;
  menuType: number;
  menuTypeStr: string;
  path?: string;
  permission?: string;
  routerName?: string;
  status?: number;
  statusStr?: string;
}

/**
 * MenuDetailDTO
 */
export interface MenuDetailDTO extends MenuDTO {
  meta: MetaDTO;
  permission?: string;
}

/**
 * AddMenuCommand
 */
export interface MenuRequest {
  id: number;
  parentId: number;
  menuName: string;
  routerName?: string;
  path?: string;
  permission?: string;
  status: number;
  isButton: boolean;
  menuType: number;
  meta: MetaDTO;
}

/**
 * MetaDTO
 */
export interface MetaDTO {
  auths?: string[];
  dynamicLevel?: number;
  extraIcon?: ExtraIconDTO;
  frameLoading?: boolean;
  frameSrc?: string;
  hiddenTag?: boolean;
  icon?: string;
  isFrameSrcInternal?: boolean;
  keepAlive?: boolean;
  rank?: number;
  roles?: string[];
  showLink?: boolean;
  showParent?: boolean;
  title?: string;
  transition?: TransitionDTO;
}

/**
 * ExtraIconDTO
 */
export interface ExtraIconDTO {
  name?: string;
  svg?: boolean;
}

/**
 * TransitionDTO
 */
export interface TransitionDTO {
  enterTransition?: string;
  leaveTransition?: string;
  name?: string;
}

/** 获取菜单列表 */
export const getMenuListApi = (params: MenuQuery) => {
  return http.request<ResponseData<Array<MenuDTO>>>("get", "/system/menus", {
    params
  });
};

/** 添加菜单 */
export const addMenuApi = (data: MenuRequest) => {
  return http.request<ResponseData<void>>("post", "/system/menus", { data });
};

/** 修改菜单 */
export const updateMenuApi = (menuId: string, data: MenuRequest) => {
  return http.request<ResponseData<void>>("put", `/system/menus/${menuId}`, {
    data
  });
};

/** 删除菜单 */
export const deleteMenuApi = (menuId: string) => {
  return http.request<ResponseData<void>>("delete", `/system/menus/${menuId}`);
};

/** 菜单详情 */
export const getMenuInfoApi = (menuId: string) => {
  return http.request<ResponseData<MenuDetailDTO>>(
    "get",
    `/system/menus/${menuId}`
  );
};
