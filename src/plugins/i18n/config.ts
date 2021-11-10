// element-plus国际化
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

// 导航菜单配置
export const menusConfig = {
  zh: {
    message: {
      hshome: "首页",
      hserror: "错误页面",
      hsfourZeroFour: "404",
      hsfourZeroOne: "401",
      permission: "权限管理",
      permissionPage: "页面权限",
      permissionButton: "按钮权限",
      externalLink: "外链"
    }
  },
  en: {
    message: {
      hshome: "Home",
      hserror: "Error Page",
      hsfourZeroFour: "404",
      hsfourZeroOne: "401",
      permission: "Permission Manage",
      permissionPage: "Page Permission",
      permissionButton: "Button Permission",
      externalLink: "External Link"
    }
  }
};

// 按钮配置
export const buttonConfig = {
  zh: {
    message: {
      hsLoginOut: "退出系统",
      hsfullscreen: "全屏",
      hsexitfullscreen: "退出全屏",
      hsrefreshRoute: "刷新路由",
      hslogin: "登陆",
      hsadd: "新增",
      hsmark: "标记/取消",
      hssave: "保存",
      hssearch: "搜索",
      hsexpendAll: "全部展开",
      hscollapseAll: "全部折叠",
      hssystemSet: "打开项目配置",
      hsdelete: "删除",
      hsreload: "重新加载",
      hscloseCurrentTab: "关闭当前标签页",
      hscloseLeftTabs: "关闭左侧标签页",
      hscloseRightTabs: "关闭右侧标签页",
      hscloseOtherTabs: "关闭其他标签页",
      hscloseAllTabs: "关闭全部标签页"
    }
  },
  en: {
    message: {
      hsLoginOut: "loginOut",
      hsfullscreen: "fullScreen",
      hsexitfullscreen: "exitFullscreen",
      hsrefreshRoute: "refreshRoute",
      hslogin: "login",
      hsadd: "Add",
      hsmark: "Mark/Cancel",
      hssave: "Save",
      hssearch: "Search",
      hsexpendAll: "Expand All",
      hscollapseAll: "Collapse All",
      hssystemSet: "Open ProjectConfig",
      hsdelete: "Delete",
      hsreload: "Reload",
      hscloseCurrentTab: "Close CurrentTab",
      hscloseLeftTabs: "Close LeftTabs",
      hscloseRightTabs: "Close RightTabs",
      hscloseOtherTabs: "Close OtherTabs",
      hscloseAllTabs: "Close AllTabs"
    }
  }
};

// 配置
// export const xxxx = {
//   zh: {
//     message: {},
//   },
//   en: {
//     message: {},
//   },
// };

const localesList = [menusConfig, buttonConfig];

export const localesConfigs = {
  zh: {
    message: Object.assign({}, ...localesList.map(v => v.zh.message)),
    ...zhLocale
  },
  en: {
    message: Object.assign({}, ...localesList.map(v => v.en.message)),
    ...enLocale
  }
};
