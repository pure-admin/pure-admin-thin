import { http } from "@/utils/http";

export interface PostListCommand extends BasePageQuery {
  postCode?: string;
  postName?: string;
  status?: number;
}

export interface PostPageResponse {
  createTime: string;
  postCode: string;
  postId: number;
  postName: string;
  postSort: number;
  remark: string;
  status: number;
  statusStr: string;
}

export function getPostListApi(params: PostListCommand) {
  return http.request<ResponseData<PageDTO<PostPageResponse>>>(
    "get",
    "/system/post/list",
    {
      params
    }
  );
}

export const exportPostExcelApi = (
  params: PostListCommand,
  fileName: string
) => {
  return http.download("/system/post/excel", fileName, {
    params
  });
};

export const deletePostApi = (data: Array<number>) => {
  return http.request<ResponseData<void>>("delete", "/system/post", {
    params: {
      // 需要将数组转换为字符串  否则Axios会将参数变成 noticeIds[0]:1  noticeIds[1]:2 这种格式，后端接收参数不成功
      ids: data.toString()
    }
  });
};

export interface AddPostCommand {
  postCode: string;
  postName: string;
  postSort: number;
  remark?: string;
  status?: string;
}

export const addPostApi = (data: AddPostCommand) => {
  return http.request<ResponseData<void>>("post", "/system/post", {
    data
  });
};

export interface UpdatePostCommand extends AddPostCommand {
  postId: number;
}

export const updatePostApi = (data: UpdatePostCommand) => {
  return http.request<ResponseData<void>>("put", "/system/post", {
    data
  });
};
