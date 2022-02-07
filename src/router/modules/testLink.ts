import Layout from "/@/layout/index.vue";

const testLink = {
  path: "/test",
  name: "test",
  component: Layout,
  redirect: "/test/index",
  meta: {
    icon: "Link",
    title: "message.hsTest",
    showLink: true,
    i18n: true,
    rank: 10
  },
  children: [
    {
      path: "/test",
      name: "test",
      component: () => import("/@/views/test/index.vue"),
      meta: {
        title: "message.hsTest",
        showLink: true,
        i18n: true
        // rank: 191
      }
    }
  ]
};

export default testLink;
