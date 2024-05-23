export default {
  path: "/correlationAnalysis",
  redirect: "/correlationAnalysis/parameterExtraction",
  component: () =>
    import("@/views/correlationAnalysis/parameterExtraction/index.vue"),
  meta: {
    icon: "ep:edit",
    title: "关联分析",
    // showLink: false,
    rank: 5
  },
  children: [
    {
      path: "/correlationAnalysis/parameterExtraction",
      name: "parameterExtraction",
      component: () =>
        import("@/views/correlationAnalysis/parameterExtraction/index.vue"),
      meta: {
        title: "关键参数提取"
      }
    },
    {
      path: "/correlationAnalysis/correlation",
      name: "correlation",
      component: () =>
        import("@/views/correlationAnalysis/correlation/index.vue"),
      meta: {
        title: "关联度分析"
      }
    }
  ]
} as RouteConfigsTable;
