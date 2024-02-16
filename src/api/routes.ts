import { http } from "@/utils/http";

// type Result = {
//   success: boolean;
//   data: Array<any>;
// };

type HelloMessageResult = {
  message: string;
};

// mock 中的添加路由的接口，用不到注释掉了
// export const getAsyncRoutes = () => {
//   return http.request<Result>("get", "/getAsyncRoutes");
// };

export const getHelloMessage = () => {
  return http.request<HelloMessageResult>("get", "http://127.0.0.1:5005/hello");
};
