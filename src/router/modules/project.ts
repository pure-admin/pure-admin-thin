export default {
  path: "/project",
  name: "Project",
  redirect: "/project/index",
  meta: {
    title: "项目管理",
    icon: "ri:projector-line",
    rank: 1
  },
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "/project/index",
      name: "ProjectIndex",
      component: () => import("@/views/project/ProjectManagement.vue"),
      meta: {
        title: "项目管理",
        showLink: true
      }
    }
  ]
};
