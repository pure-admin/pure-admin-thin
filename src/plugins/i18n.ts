// Internationalization compatibility for multiple component libraries and local projects
import { type I18n, createI18n } from "vue-i18n";
import type { App, WritableComputedRef } from "vue";
import { responsiveStorageNameSpace } from "@/config";
import { storageLocal, isObject } from "@pureadmin/utils";

// Element Plus internationalization
import enLocale from "element-plus/es/locale/lang/en";
import zhLocale from "element-plus/es/locale/lang/vi";

const siphonI18n = (function () {
  // Initialize internationalization configuration only once
  let cache = Object.fromEntries(
    Object.entries(
      import.meta.glob("../../locales/*.y(a)?ml", { eager: true })
    ).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  );
  return (prefix = "vi") => {
    return cache[prefix];
  };
})();

export const localesConfigs = {
  vi: {
    ...siphonI18n("vi"),
    ...zhLocale
  },
  en: {
    ...siphonI18n("en"),
    ...enLocale
  }
};

/** Get keys of all nested objects in an object and concatenate them with dots */
function getObjectKeys(obj) {
  const stack = [];
  const keys: Set<string> = new Set();

  stack.push({ obj, key: "" });

  while (stack.length > 0) {
    const { obj, key } = stack.pop();

    for (const k in obj) {
      const newKey = key ? `${key}.${k}` : k;

      if (obj[k] && isObject(obj[k])) {
        stack.push({ obj: obj[k], key: newKey });
      } else {
        keys.add(newKey);
      }
    }
  }

  return keys;
}

/** Cache expanded keys */
const keysCache: Map<string, Set<string>> = new Map();
const flatI18n = (prefix = "vi") => {
  let cache = keysCache.get(prefix);
  if (!cache) {
    cache = getObjectKeys(siphonI18n(prefix));
    keysCache.set(prefix, cache);
  }
  return cache;
};

/**
 * Internationalization transformation utility function
 * @param message message to transform
 * @returns transformed message
 */
export function transformI18n(message: any = "") {
  if (!message) {
    return "";
  }

  // Handle dynamic route titles stored in format {zh:"",en:""}
  if (typeof message === "object") {
    const locale: string | WritableComputedRef<string> | any =
      i18n.global.locale;
    return message[locale?.value];
  }

  const key = message.match(/(\S*)\./)?.input;

  if (key && flatI18n("vi").has(key)) {
    return i18n.global.t.call(i18n.global.locale, message);
  } else if (!key && Object.hasOwn(siphonI18n("vi"), message)) {
    // Compatible with non-nested internationalization format
    return i18n.global.t.call(i18n.global.locale, message);
  } else {
    return message;
  }
}

/** This function is only for internationalization intelligent prompts with i18n Ally plugin (only affects prompts), can be removed if internationalization is not needed */
export const $t = (key: string) => key;

export const i18n: I18n = createI18n({
  legacy: false,
  locale:
    storageLocal().getItem<StorageConfigs>(
      `${responsiveStorageNameSpace()}locale`
    )?.locale ?? "vi",
  fallbackLocale: "en",
  messages: localesConfigs
});

export function useI18n(app: App) {
  app.use(i18n);
}
