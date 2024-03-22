import { http } from "@/utils/http";
import type { ApiAbstract } from "@/utils/http/ApiAbstract";
import { baseUrlApi } from "../utils";

export class Generator {
  name: string;
  content: string;
}
export const get = (tableName, type) => {
  return http.request<ApiAbstract<Generator>>(
    "post",
    baseUrlApi("generator/") + tableName + "/" + type
  );
};

export const download = (name: String) => {
  return http.request<Blob>(
    "post",
    baseUrlApi("generator/" + name + "/2"),
    {},
    { responseType: "blob" }
  );
};

export function sync(tables) {
  return http.request<Blob>("post", baseUrlApi("generator/sync"), {
    data: tables
  });
}
