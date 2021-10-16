import { App } from "vue";
import { createI18n } from "vue-i18n";
import { localesConfigs } from "./config";
import { storageLocal } from "/@/utils/storage";

export const i18n = createI18n({
  locale: storageLocal.getItem("responsive-locale")?.locale ?? "zh",
  fallbackLocale: "en",
  messages: localesConfigs
});

export function usI18n(app: App) {
  app.use(i18n);
}
