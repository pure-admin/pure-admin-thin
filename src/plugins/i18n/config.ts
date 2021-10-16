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
      hsfourZeroOne: "401"
    }
  },
  en: {
    message: {
      hshome: "Home",
      hserror: "Error Page",
      hsfourZeroFour: "404",
      hsfourZeroOne: "401"
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
      hsregister: "注册",
      hsexpendAll: "全部展开",
      hscollapseAll: "全部折叠",
      hssystemSet: "系统设置",
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
      hsregister: "register",
      hsexpendAll: "Expand All",
      hscollapseAll: "Collapse All",
      hssystemSet: "System Set",
      hsreload: "Reload",
      hscloseCurrentTab: "Close CurrentTab",
      hscloseLeftTabs: "Close LeftTabs",
      hscloseRightTabs: "Close RightTabs",
      hscloseOtherTabs: "Close OtherTabs",
      hscloseAllTabs: "Close AllTabs"
    }
  }
};

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
