// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

// http://mockjs.com/examples.html#Object
const permissionRouter = {
  path: "/permission",
  name: "permission",
  redirect: "/permission/page",
  meta: {
    title: "message.permission",
    icon: "Lollipop",
    i18n: true,
    showLink: true,
    rank: 3
  },
  children: [
    {
      path: "/permission/page",
      name: "permissionPage",
      meta: {
        title: "message.permissionPage",
        i18n: true,
        showLink: true
      }
    },
    {
      path: "/permission/button",
      name: "permissionButton",
      meta: {
        title: "message.permissionButton",
        i18n: true,
        showLink: true,
        authority: []
      }
    }
  ]
};

// 添加不同按钮权限到/permission/button页面中
function setDifAuthority(authority, routes) {
  routes.children[1].meta.authority = [authority];
  return routes;
}

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: ({ query }) => {
      if (query.name === "admin") {
        return {
          code: 0,
          info: [setDifAuthority("v-admin", permissionRouter)]
        };
      } else {
        return {
          code: 0,
          info: [setDifAuthority("v-test", permissionRouter)]
        };
      }
    }
  }
] as MockMethod[];
