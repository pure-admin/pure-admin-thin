import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const externalLink = {
  path: "/externals",
  component: Layout,
  meta: {
    icon: "link",
    title: $t("menus.externalLink"),
    i18n: true,
    rank: 190
  },
  children: [
    {
      path: "/external",
      name: "https://pure-admin-doc.vercel.app",
      meta: {
        title: $t("menus.externalLink"),
        i18n: true
      }
    }
  ]
};

export default externalLink;
