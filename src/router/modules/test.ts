export default {
  path: "/test",
  redirect: "/test/countdown",
  meta: {
    icon: "material-symbols:import-contacts-outline",
    title: "测试页面"
  },
  children: [
    {
      path: "/test/countdown",
      name: "Countdown",
      component: () => import("@/views/testPage/Countdown.vue"),
      meta: {
        title: "倒计时"
      }
    }
  ]
} as RouteConfigsTable;
