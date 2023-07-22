import { http } from "@/utils/http";

export interface DeptQuery extends BaseQuery {
  // TODO 目前不需要这个参数
  deptId?: number;
  parentId?: number;
}

/**
 * DeptDTO
 */
export interface DeptDTO {
  createTime?: Date;
  id?: number;
  deptName?: string;
  email?: string;
  leaderName?: string;
  orderNum?: number;
  parentId?: number;
  phone?: string;
  status?: number;
  statusStr?: string;
}

/**
 * AddDeptCommand
 */
export interface DeptRequest {
  deptName: string;
  email?: string;
  leaderName?: string;
  orderNum: number;
  parentId: number;
  phone?: string;
  status: number;
}

export interface DeptTreeDTO {
  id: number;
  parentId: number;
  label: string;
  children: [DeptTreeDTO];
}

/** 获取部门列表 */
export const getDeptListApi = (params?: DeptQuery) => {
  return http.request<ResponseData<Array<DeptDTO>>>("get", "/system/depts", {
    params
  });
};

/** 新增部门 */
export const addDeptApi = (data: DeptRequest) => {
  console.log(data);
  return http.request<ResponseData<void>>("post", "/system/dept", {
    data
  });
};

/** 部门详情 */
export const getDeptInfoApi = (deptId: string) => {
  return http.request<ResponseData<DeptDTO>>("get", `/system/dept/${deptId}`);
};

/** 修改部门 */
export const updateDeptApi = (deptId: string, data: DeptRequest) => {
  return http.request<ResponseData<void>>("put", `/system/dept/${deptId}`, {
    data
  });
};

/** 删除部门 */
export const deleteDeptApi = (deptId: string) => {
  return http.request<ResponseData<void>>("delete", `/system/dept/${deptId}`);
};

/** 获取部门树级结构 */
export const getDeptTree = () => {
  return http.request<ResponseData<DeptTreeDTO>>(
    "get",
    "/system/depts/dropdown"
  );
};
