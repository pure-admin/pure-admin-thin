export default {
  path: "/project",
  name: "Project",
  redirect: "/project/manage",
  meta: {
    title: "项目管理",
    icon: "ri:projector-line",
    showLink: true,
    rank: 1
  },
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "/project/manage",
      name: "ProjectManagement",
      component: () => import("@/views/project/ProjectManagement.vue"),
      meta: {
        title: "项目列表",
        showLink: true
      }
    },
    {
      path: "/project/detail",
      name: "ProjectDetail",
      component: () => import("@/views/project/ProjectDetail.vue"),
      meta: {
        title: "项目详情",
        showLink: false
      }
    }
  ]
};
