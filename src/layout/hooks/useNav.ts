import { storeToRefs } from "pinia";
import { getConfig } from "@/config";
import { emitter } from "@/utils/mitt";
import { routeMetaType } from "../types";
import userAvatar from "@/assets/user.jpg";
import { getTopMenu } from "@/router/utils";
import { useGlobal } from "@pureadmin/utils";
import { routerArrays } from "@/layout/types";
import { useRouter, useRoute } from "vue-router";
import { router, remainingPaths, resetRouter } from "@/router";
import { computed, type CSSProperties } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { removeToken } from "@/utils/auth";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";

const errorInfo = "当前路由配置不正确，请检查配置";

export function useNav() {
  const route = useRoute();
  const pureApp = useAppStoreHook();
  const routers = useRouter().options.routes;
  const { wholeMenus } = storeToRefs(usePermissionStoreHook());
  /** 平台`layout`中所有`el-tooltip`的`effect`配置，默认`light` */
  const tooltipEffect = getConfig()?.TooltipEffect ?? "light";

  const getDivStyle = computed((): CSSProperties => {
    return {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      overflow: "hidden"
    };
  });

  /** 用户名 */
  const username = computed(() => {
    return useUserStoreHook()?.username;
  });

  const avatarsStyle = computed(() => {
    return username.value ? { marginRight: "10px" } : "";
  });

  const isCollapse = computed(() => {
    return !pureApp.getSidebarStatus;
  });

  const device = computed(() => {
    return pureApp.getDevice;
  });

  const { $storage, $config } = useGlobal<GlobalPropertiesApi>();
  const layout = computed(() => {
    return $storage?.layout?.layout;
  });

  const title = computed(() => {
    return $config.Title;
  });

  /** 动态title */
  function changeTitle(meta: routeMetaType) {
    const Title = getConfig().Title;
    if (Title) document.title = `${meta.title} | ${Title}`;
    else document.title = meta.title;
  }

  /** 退出登录 */
  function logout() {
    useUserStoreHook().SET_USERNAME("");
    useUserStoreHook().SET_ROLES([]);
    removeToken();
    useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
    resetRouter();
    router.push("/login");
  }

  /** 个人中心 */
  function userProfile() {
    router.push("/global/user/profile");
  }

  function backTopMenu() {
    router.push(getTopMenu()?.path);
  }

  function onPanel() {
    emitter.emit("openPanel");
  }

  function toggleSideBar() {
    pureApp.toggleSideBar();
  }

  function handleResize(menuRef) {
    menuRef?.handleResize();
  }

  function resolvePath(route) {
    if (!route.children) return console.error(errorInfo);
    const httpReg = /^http(s?):\/\//;
    const routeChildPath = route.children[0]?.path;
    if (httpReg.test(routeChildPath)) {
      return route.path + "/" + routeChildPath;
    } else {
      return routeChildPath;
    }
  }

  function menuSelect(indexPath: string) {
    if (wholeMenus.value.length === 0 || isRemaining(indexPath)) return;
    emitter.emit("changLayoutRoute", indexPath);
  }

  /** 判断路径是否参与菜单 */
  function isRemaining(path: string) {
    return remainingPaths.includes(path);
  }

  return {
    route,
    title,
    device,
    layout,
    logout,
    userProfile,
    routers,
    $storage,
    backTopMenu,
    onPanel,
    getDivStyle,
    changeTitle,
    toggleSideBar,
    menuSelect,
    handleResize,
    resolvePath,
    isCollapse,
    pureApp,
    username,
    userAvatar,
    avatarsStyle,
    tooltipEffect
  };
}
