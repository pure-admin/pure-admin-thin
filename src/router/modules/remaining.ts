const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: "加载中...",
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  },
  {
    path: "/system/user/profile",
    component: Layout,
    meta: {
      title: "个人中心",
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/",
        name: "Redirect",
        component: () => import("@/views/system/user/profile/index.vue")
      }
    ]
  }
] as Array<RouteConfigsTable>;
