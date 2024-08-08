// src/router/modules/dashboard.ts
export default {
  path: "/",
  name: "Dashbroad",
  redirect: "/dashboard/index",
  meta: {
    icon: "ri:dashboard-line",
    title: "仪表盘",
    rank: 0
  },
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "/dashboard/index",
      name: "DashbroadIndex",
      component: () => import("@/views/dashboard/index.vue"),
      meta: {
        title: "仪表盘",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
