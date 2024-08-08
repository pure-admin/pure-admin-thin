// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";
export default defineFakeRoute([
  {
    url: "/get-async-routes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: []
      };
    }
  }
]);
