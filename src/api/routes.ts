import { http } from "@/utils/http";

type Result = {
  success: boolean;
  msg: string;
  msgDev: string;
  data: object;
};

export const getAsyncRoutes = () => {
  return http.request<Result>("get", "/get-async-routes");
};
