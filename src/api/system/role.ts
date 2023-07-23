import { http } from "@/utils/http";

export interface RoleQuery extends BasePageQuery {
  roleKey?: string;
  roleName?: string;
  status?: string;
  timeRangeColumn?: string;
}

export interface RoleDTO {
  createTime: Date;
  dataScope: number;
  remark: string;
  roleId: number;
  roleKey: string;
  roleName: string;
  roleSort: number;
  selectedDeptList: number[];
  selectedMenuList: number[];
  status: number;
}

export function getRoleListApi(params: RoleQuery) {
  return http.request<ResponseData<PageDTO<RoleDTO>>>(
    "get",
    "/system/role/list",
    {
      params
    }
  );
}

export function getRoleInfoApi(roleId: number) {
  return http.request<ResponseData<RoleDTO>>("get", "/system/role/" + roleId);
}

export interface AddRoleCommand {
  dataScope?: string;
  menuIds: number[];
  remark?: string;
  roleKey: string;
  roleName: string;
  roleSort: number;
  status?: string;
}

export function addRoleApi(data: AddRoleCommand) {
  return http.request<void>("post", "/system/role", {
    data
  });
}

export interface UpdateRoleCommand extends AddRoleCommand {
  roleId: number;
}

export function updateRoleApi(data: UpdateRoleCommand) {
  return http.request<void>("put", "/system/role", {
    data
  });
}

export function deleteRoleApi(roleId: number) {
  return http.request<void>("delete", "/system/role/" + roleId);
}
