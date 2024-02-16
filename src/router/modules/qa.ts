export default {
  path: "/qa",
  redirect: "/qa/chat",
  component: () => import("@/views/qa/index.vue"),
  meta: {
    icon: "lollipop",
    title: "问答系统",
    // showLink: false,
    rank: 10
  },
  children: [
    {
      path: "/qa/chat",
      name: "chat",
      component: () => import("@/views/qa/chat/index.vue"),
      meta: {
        title: "对话"
      }
    },
    {
      path: "/qa/triad",
      name: "triad",
      component: () => import("@/views/qa/triad/index.vue"),
      meta: {
        title: "三元组"
      }
    }
  ]
} as RouteConfigsTable;
