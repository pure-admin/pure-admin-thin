import { http } from "@/utils/http";

// chat
export type ChatResult = {
  status: string;
  chat_history: Array<{
    role: string;
    content: string;
  }>;
  content: string;
};

export type ModelActionResult = {
  status: string;
  message: string;
};

/** 发起聊天请求 */
export const chat = (data?: object) => {
  return http.request<ChatResult>("post", "http://127.0.0.1:5005/qa/chat", {
    data
  });
};

/** 创建模型 */
export const createModel = () => {
  return http.request<ModelActionResult>(
    "post",
    "http://127.0.0.1:5005/qa/create_model"
  );
};

/** 终止模型 */
export const terminateModel = () => {
  return http.request<ModelActionResult>(
    "post",
    "http://127.0.0.1:5005/qa/terminate_model"
  );
};

// ---------------------------------------------
// traid
export type Triple = {
  subject: string;
  relation: string;
  object: string;
};

export type GetTriplesResult = {
  data: Triple[];
  total: number;
};

export type AddOrUpdateResult = {
  message: string;
};

export type DeleteResult = {
  message: string;
};

/** 获取三元组 */
export const getTraids = (page = 1, limit = 10) => {
  return http.request<GetTriplesResult>(
    "get",
    "http://127.0.0.1:5005/traid/get_traids",
    {
      params: { page, limit }
    }
  );
};

/** 搜索三元组 */
export const searchTraid = (keyword: string) => {
  return http.request<GetTriplesResult>(
    "get",
    "http://127.0.0.1:5005/traid/search",
    {
      params: { keyword }
    }
  );
};

/** 添加三元组 */
export const addTraid = (data: Triple) => {
  return http.request<AddOrUpdateResult>(
    "post",
    "http://127.0.0.1:5005/traid/add",
    {
      data
    }
  );
};

/** 更新三元组 */
export const updateTraid = (data: {
  old_subject: string;
  old_relation: string;
  old_object: string;
  new_subject: string;
  new_relation: string;
  new_object: string;
}) => {
  return http.request<AddOrUpdateResult>(
    "put",
    "http://127.0.0.1:5005/traid/update",
    {
      data
    }
  );
};

/** 删除三元组 */
export const deleteTraid = (data: Triple) => {
  return http.request<DeleteResult>(
    "delete",
    "http://127.0.0.1:5005/traid/delete",
    {
      data
    }
  );
};
