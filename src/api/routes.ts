import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getAsyncRoutes = () => {
  return http.request<Result>(
    "get",
    baseUrlApi("api/v1/user/manage/getRoutes")
  );
};
