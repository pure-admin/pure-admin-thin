import { http } from "../utils/http";

export const getProvinces = () => {
  return http.request("get", "/getProvinces");
};
export const getPrice = () => {
  return http.request("get", "/getPrice");
};
