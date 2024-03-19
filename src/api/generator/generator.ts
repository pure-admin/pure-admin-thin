import { http } from "@/utils/http";
import { type ApiAbstract, VersionEntity } from "@/utils/http/ApiAbstract";
import { baseUrlApi } from "../utils";

export class Generator extends VersionEntity {
  name: string;
  content: string;
}
export const get = (tableName, type) => {
  return http.request<ApiAbstract<Generator>>(
    "post",
    baseUrlApi("generator/") + tableName + "/" + type
  );
};
