import {
  type RouterHistory,
  type RouteRecordRaw,
  type RouteComponent,
  createWebHistory,
  createWebHashHistory
} from "vue-router";
import { router } from "./index";
import { isProxy, toRaw } from "vue";
import { useTimeoutFn } from "@vueuse/core";
import {
  isString,
  cloneDeep,
  isAllEmpty,
  intersection,
  storageLocal,
  isIncludeAllChildren
} from "@pureadmin/utils";
import { getConfig } from "@/config";
import { buildHierarchyTree } from "@/utils/tree";
import { userKey, type DataInfo } from "@/utils/auth";
import { type menuType, routerArrays } from "@/layout/types";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { usePermissionStoreHook } from "@/store/modules/permission";
const IFrame = () => import("@/layout/frame.vue");
// https://cn.vitejs.dev/guide/features.html#glob-import
const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");

// Định nghĩa các hàm xử lý định tuyến động

// Lấy danh sách định tuyến từ backend
import { getAsyncRoutes } from "@/api/routes";

function handRank(routeInfo: any) {
  const { name, path, parentId, meta } = routeInfo;
  return isAllEmpty(parentId)
    ? isAllEmpty(meta?.rank) ||
      (meta?.rank === 0 && name !== "Home" && path !== "/")
      ? true
      : false
    : false;
}

/** Sắp xếp định tuyến theo thứ tự tăng dần dựa trên meta.rank trong route */
function ascending(arr: any[]) {
  arr.forEach((v, index) => {
    // Khi không có rank, tự động tạo theo thứ tự, đảm bảo trang chủ luôn là trang đầu tiên
    if (handRank(v)) v.meta.rank = index + 2;
  });
  return arr.sort(
    (a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
      return a?.meta.rank - b?.meta.rank;
    }
  );
}

/** Lọc các menu có meta.showLink === false */
function filterTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter(
    (v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false
  );
  newTree.forEach(
    (v: { children }) => v.children && (v.children = filterTree(v.children))
  );
  return newTree;
}

/** Lọc các menu con có độ dài === 0, các mục không có menu sẽ bị loại bỏ */
function filterChildrenTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter((v: any) => v?.children?.length !== 0);
  newTree.forEach(
    (v: { children }) => v.children && (v.children = filterTree(v.children))
  );
  return newTree;
}

/** Kiểm tra xem hai mảng có phần tử chung hay không */
function isOneOfArray(a: Array<string>, b: Array<string>) {
  return Array.isArray(a) && Array.isArray(b)
    ? intersection(a, b).length > 0
      ? true
      : false
    : true;
}

/** Lấy danh sách các vai trò roles của người dùng từ localStorage và lọc các menu không có quyền */
function filterNoPermissionTree(data: RouteComponent[]) {
  const currentRoles =
    storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [];
  const newTree = cloneDeep(data).filter((v: any) =>
    isOneOfArray(v.meta?.roles, currentRoles)
  );
  newTree.forEach(
    (v: any) => v.children && (v.children = filterNoPermissionTree(v.children))
  );
  return filterChildrenTree(newTree);
}

/** Lấy danh sách đường dẫn cha dựa trên `key` đã chỉ định, mặc định `key` là `path` */
function getParentPaths(value: string, routes: RouteRecordRaw[], key = "path") {
  // Duyệt sâu tìm kiếm
  function dfs(routes: RouteRecordRaw[], value: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // Trả về danh sách path cha
      if (item[key] === value) return parents;
      // Nếu không có children hoặc children rỗng thì không đệ quy
      if (!item.children || !item.children.length) continue;
      // Khi tìm thấy path thì đưa path hiện tại vào stack
      parents.push(item.path);

      if (dfs(item.children, value, parents).length) return parents;
      // Khi tìm kiếm sâu không tìm thấy, bỏ path hiện tại ra khỏi stack
      parents.pop();
    }
    // Khi không tìm thấy thì trả về mảng rỗng
    return [];
  }

  return dfs(routes, value, []);
}

/** Tìm thông tin định tuyến theo `path` đã chỉ định */
function findRouteByPath(path: string, routes: RouteRecordRaw[]) {
  let res = routes.find((item: { path: string }) => item.path == path);
  if (res) {
    return isProxy(res) ? toRaw(res) : res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (
        routes[i].children instanceof Array &&
        routes[i].children.length > 0
      ) {
        res = findRouteByPath(path, routes[i].children);
        if (res) {
          return isProxy(res) ? toRaw(res) : res;
        }
      }
    }
    return null;
  }
}

function addPathMatch() {
  if (!router.hasRoute("pathMatch")) {
    router.addRoute({
      path: "/:pathMatch(.*)",
      name: "pathMatch",
      redirect: "/error/404"
    });
  }
}

/** Xử lý định tuyến động (các route từ backend) */
function handleAsyncRoutes(routeList) {
  if (routeList.length === 0) {
    usePermissionStoreHook().handleWholeMenus(routeList);
  } else {
    formatFlatteningRoutes(addAsyncRoutes(routeList)).map(
      (v: RouteRecordRaw) => {
        // Tránh thêm định tuyến trùng lặp
        if (
          router.options.routes[0].children.findIndex(
            value => value.path === v.path
          ) !== -1
        ) {
          return;
        } else {
          // Lưu ý sau khi thêm định tuyến vào routes cần sử dụng addRoute để định tuyến mới có thể hoạt động bình thường
          router.options.routes[0].children.push(v);
          // Sắp xếp các định tuyến cuối cùng
          ascending(router.options.routes[0].children);
          if (!router.hasRoute(v?.name)) router.addRoute(v);
          const flattenRouters: any = router
            .getRoutes()
            .find(n => n.path === "/");
          router.addRoute(flattenRouters);
        }
      }
    );
    usePermissionStoreHook().handleWholeMenus(routeList);
  }
  if (!useMultiTagsStoreHook().getMultiTagsCache) {
    useMultiTagsStoreHook().handleTags("equal", [
      ...routerArrays,
      ...usePermissionStoreHook().flatteningRoutes.filter(
        v => v?.meta?.fixedTag
      )
    ]);
  }
  addPathMatch();
}

/** Khởi tạo định tuyến (`new Promise` để tránh vòng lặp vô hạn trong yêu cầu không đồng bộ) */
function initRouter() {
  if (getConfig()?.CachingAsyncRoutes) {
    // Bật cache định tuyến động vào localStorage
    const key = "async-routes";
    const asyncRouteList = storageLocal().getItem(key) as any;
    if (asyncRouteList && asyncRouteList?.length > 0) {
      return new Promise(resolve => {
        handleAsyncRoutes(asyncRouteList);
        resolve(router);
      });
    } else {
      return new Promise(resolve => {
        getAsyncRoutes().then(({ data }) => {
          handleAsyncRoutes(cloneDeep(data));
          storageLocal().setItem(key, data);
          resolve(router);
        });
      });
    }
  } else {
    return new Promise(resolve => {
      getAsyncRoutes().then(({ data }) => {
        handleAsyncRoutes(cloneDeep(data));
        resolve(router);
      });
    });
  }
}

/**
 * Chuyển đổi mảng định tuyến nhiều cấp thành mảng một cấp
 * @param routesList Mảng định tuyến đầu vào
 * @returns Trả về mảng định tuyến đã được xử lý
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = buildHierarchyTree(routesList);
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

/**
 * Xử lý mảng định tuyến một cấp thành mảng nhiều cấp (Tất cả định tuyến từ cấp 3 trở lên đều được chuyển thành cấp 2, keep-alive chỉ hỗ trợ đến cấp 2)
 * https://github.com/pure-admin/vue-pure-admin/issues/67
 * @param routesList Mảng định tuyến menu đã được xử lý
 * @returns Trả về mảng định tuyến được chuyển đổi lại thành định dạng quy định
 */
function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  const newRoutesList: RouteRecordRaw[] = [];
  routesList.forEach((v: RouteRecordRaw) => {
    if (v.path === "/") {
      newRoutesList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: []
      });
    } else {
      newRoutesList[0]?.children.push({ ...v });
    }
  });
  return newRoutesList;
}

/** Xử lý định tuyến cache (Thêm, xóa, làm mới) */
function handleAliveRoute({ name }: ToRouteType, mode?: string) {
  switch (mode) {
    case "add":
      usePermissionStoreHook().cacheOperate({
        mode: "add",
        name
      });
      break;
    case "delete":
      usePermissionStoreHook().cacheOperate({
        mode: "delete",
        name
      });
      break;
    case "refresh":
      usePermissionStoreHook().cacheOperate({
        mode: "refresh",
        name
      });
      break;
    default:
      usePermissionStoreHook().cacheOperate({
        mode: "delete",
        name
      });
      useTimeoutFn(() => {
        usePermissionStoreHook().cacheOperate({
          mode: "add",
          name
        });
      }, 100);
  }
}

/** Lọc các định tuyến động trả về từ backend, tạo lại định dạng chuẩn của định tuyến */
function addAsyncRoutes(arrRoutes: Array<RouteRecordRaw>) {
  if (!arrRoutes || !arrRoutes.length) return;
  const modulesRoutesKeys = Object.keys(modulesRoutes);
  arrRoutes.forEach((v: RouteRecordRaw) => {
    // Thêm thuộc tính meta, đánh dấu đây là định tuyến trả về từ backend
    v.meta.backstage = true;
    // Nếu có children và parent không có redirect, mặc định lấy path của children đầu tiên; Nếu có children và parent có redirect, lấy redirect của parent, sẽ ghi đè giá trị mặc định
    if (v?.children && v.children.length && !v.redirect)
      v.redirect = v.children[0].path;
    // Nếu có children và parent không có name, mặc định lấy name của children đầu tiên; Nếu có children và parent có name, lấy name của parent, sẽ ghi đè giá trị mặc định (Chú ý: Trong thử nghiệm, name của parent không được trùng với name của children, nếu trùng sẽ dẫn đến không có redirect (chuyển hướng 404), vì vậy ở đây sẽ tự động thêm `Parent` vào cuối name của parent để tránh trùng)
    if (v?.children && v.children.length && !v.name)
      v.name = (v.children[0].name as string) + "Parent";
    if (v.meta?.frameSrc) {
      v.component = IFrame;
    } else {
      // Thích nghi với component và đường dẫn component không trả về từ backend (nếu backend trả về đường dẫn component, thì path có thể viết bất kỳ, nếu không trả về, đường dẫn component sẽ giống path)
      const index = v?.component
        ? modulesRoutesKeys.findIndex(ev => ev.includes(v.component as any))
        : modulesRoutesKeys.findIndex(ev => ev.includes(v.path));
      v.component = modulesRoutes[modulesRoutesKeys[index]];
    }
    if (v?.children && v.children.length) {
      addAsyncRoutes(v.children);
    }
  });
  return arrRoutes;
}

/** Lấy chế độ lịch sử định tuyến https://next.router.vuejs.org/zh/guide/essentials/history-mode.html */
function getHistoryMode(routerHistory): RouterHistory {
  // Nếu len = 1 chỉ có lịch sử, len = 2 có tham số base trong lịch sử https://next.router.vuejs.org/zh/api/#%E5%8F%82%E6%95%B0-1
  const historyMode = routerHistory.split(",");
  const leftMode = historyMode[0];
  const rightMode = historyMode[1];
  // Không có tham số
  if (historyMode.length === 1) {
    if (leftMode === "hash") {
      return createWebHashHistory("");
    } else if (leftMode === "h5") {
      return createWebHistory("");
    }
  } // Có tham số
  else if (historyMode.length === 2) {
    if (leftMode === "hash") {
      return createWebHashHistory(rightMode);
    } else if (leftMode === "h5") {
      return createWebHistory(rightMode);
    }
  }
}

/** Lấy quyền của nút ở trang hiện tại */
function getAuths(): Array<string> {
  return router.currentRoute.value.meta.auths as Array<string>;
}

/** Kiểm tra quyền của nút */
function hasAuth(value: string | Array<string>): boolean {
  if (!value) return false;
  /** Lấy tất cả các giá trị `code` tuỳ chỉnh từ trường `meta` của route hiện tại */
  const metaAuths = getAuths();
  if (!metaAuths) return false;
  const isAuths = isString(value)
    ? metaAuths.includes(value)
    : isIncludeAllChildren(value, metaAuths);
  return isAuths ? true : false;
}

function handleTopMenu(route) {
  if (route?.children && route.children.length > 1) {
    if (route.redirect) {
      return route.children.filter(cur => cur.path === route.redirect)[0];
    } else {
      return route.children[0];
    }
  } else {
    return route;
  }
}

/** Lấy menu đầu tiên (menu cấp đỉnh) từ tất cả các menu */
function getTopMenu(tag = false): menuType {
  const topMenu = handleTopMenu(
    usePermissionStoreHook().wholeMenus[0]?.children[0]
  );
  tag && useMultiTagsStoreHook().handleTags("push", topMenu);
  return topMenu;
}

export {
  hasAuth,
  getAuths,
  ascending,
  filterTree,
  initRouter,
  getTopMenu,
  addPathMatch,
  isOneOfArray,
  getHistoryMode,
  addAsyncRoutes,
  getParentPaths,
  findRouteByPath,
  handleAliveRoute,
  formatTwoStageRoutes,
  formatFlatteningRoutes,
  filterNoPermissionTree
};
