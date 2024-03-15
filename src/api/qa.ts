import { http } from "@/utils/http";

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
