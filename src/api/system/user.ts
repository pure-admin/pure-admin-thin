import { http } from "@/utils/http";

export interface UserQuery extends BasePageQuery {
  deptId?: number;
  phoneNumber?: string;
  status?: number;
  userId?: number;
  username?: string;
}

/**
 * UserDTO
 */
export interface UserDTO {
  avatar?: string;
  createTime?: Date;
  creatorId?: number;
  creatorName?: string;
  deptId?: number;
  deptName?: string;
  email?: string;
  loginDate?: Date;
  loginIp?: string;
  nickname?: string;
  phoneNumber?: string;
  postId?: number;
  remark?: string;
  roleId?: number;
  roleName?: string;
  sex?: number;
  status?: number;
  updaterId?: number;
  updaterName?: string;
  updateTime?: Date;
  userId?: number;
  username?: string;
  userType?: number;
}

/**
 * AddUserCommand
 */
export interface UserRequest {
  userId: number;
  avatar?: string;
  deptId?: number;
  email?: string;
  nickname?: string;
  phoneNumber?: string;
  password: string;
  postId?: number;
  remark?: string;
  roleId?: number;
  sex?: number;
  status?: number;
  username?: string;
}

/**
 * UpdateProfileCommand
 */
export interface UserProfileRequest {
  email?: string;
  nickName?: string;
  phoneNumber?: string;
  sex?: number;
  userId?: number;
}

/**
 * ResetPasswordCommand
 */
export interface ResetPasswordRequest {
  newPassword?: string;
  oldPassword?: string;
  userId?: number;
}

/**
 * 修改密码
 */
export interface PasswordRequest {
  userId: number;
  password: string;
}

/** 获取用户列表 */
export const getUserListApi = (params?: UserQuery) => {
  return http.request<ResponseData<PageDTO<UserDTO>>>("get", "/system/users", {
    params
  });
};

/** 新增用户 */
export const addUserApi = (data?: UserRequest) => {
  return http.request<ResponseData<void>>("post", "/system/users", {
    data
  });
};

/** 编辑用户 */
export const updateUserApi = (userId: number, data?: UserRequest) => {
  return http.request<ResponseData<void>>("put", `/system/users/${userId}`, {
    data
  });
};

/** 更改用户密码 */
export const updateUserPasswordApi = (data?: PasswordRequest) => {
  return http.request<ResponseData<void>>(
    "put",
    `/system/users/${data.userId}/password`,
    {
      data
    }
  );
};

/** 删除用户 */
export const deleteUserApi = (userId: number) => {
  return http.request<ResponseData<void>>("delete", `/system/users/${userId}`);
};

/** 修改用户状态 */
export const updateUserStatusApi = (userId: number, status: number) => {
  return http.request<ResponseData<PageDTO<UserDTO>>>(
    "put",
    `/system/users/${userId}/status`,
    {
      data: {
        status: status
      }
    }
  );
};

/** 批量导出用户 */
export const exportUserExcelApi = (params: UserQuery, fileName: string) => {
  return http.download("/system/users/excel", fileName, {
    params
  });
};

/** 用户头像上传 */
export const uploadUserAvatarApi = data => {
  return http.request<ResponseData<void>>(
    "post",
    "/system/user/profile/avatar",
    {
      data
    },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

/** 更改用户资料 */
export const updateUserProfileApi = (data?: UserProfileRequest) => {
  return http.request<ResponseData<void>>("put", "/system/user/profile", {
    data
  });
};

/** 更改当前用户密码 */
export const updateCurrentUserPasswordApi = (data?: ResetPasswordRequest) => {
  return http.request<ResponseData<void>>(
    "put",
    "/system/user/profile/password",
    {
      data
    }
  );
};
