import { siphonI18n } from "./index";

// element-plus国际化
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

// 项目内自定义国际化
const zhModules = import.meta.globEager("./zh-CN/**/*.ts");
const enModules = import.meta.globEager("./en/**/*.ts");

export const localesConfigs = {
  zh: {
    ...siphonI18n(zhModules, "zh-CN"),
    ...zhLocale
  },
  en: {
    ...siphonI18n(enModules, "en"),
    ...enLocale
  }
};
