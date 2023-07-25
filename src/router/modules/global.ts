export default {
  path: "/global",
  redirect: "/global/user/profile",
  meta: {
    icon: "checkboxCircleLine",
    title: "首页",
    rank: 0,
    showLink: false
  },
  children: [
    {
      path: "/global/user/profile",
      name: "Success",
      component: () => import("@/views/system/user/profile/index.vue"),
      meta: {
        title: "个人中心"
      }
    }
  ]
} as RouteConfigsTable;
