export default {
  path: "/multi-layer",
  redirect: "/multi-layer/modeling",
  component: () => import("@/views/multi-layer/modeling/index.vue"),
  meta: {
    icon: "lollipop",
    title: "多层建模",
    // showLink: false,
    rank: 1
  },
  children: [
    {
      path: "/multi-layer/modeling",
      name: "modeling",
      component: () => import("@/views/multi-layer/modeling/index.vue"),
      meta: {
        title: "模型建立"
      }
    },
    {
      path: "/multi-layer/management",
      name: "management",
      component: () => import("@/views/multi-layer/management/index.vue"),
      meta: {
        title: "模型管理"
      }
    }
  ]
} as RouteConfigsTable;
