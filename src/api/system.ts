import { http } from "../utils/http";

export const getProvince = () => {
  return http.request("get", "/city");
};
