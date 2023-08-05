import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageSession } from "@pureadmin/utils";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { removeToken, sessionKey } from "@/utils/auth";
import { DictionaryData, TokenDTO } from "@/api/common/login";
import { storageLocal } from "@pureadmin/utils";

const dictionaryListKey = "ag-dictionary-list";
const dictionaryMapKey = "ag-dictionary-map";

export const useUserStore = defineStore({
  id: "ag-user",
  state: (): userType => ({
    // 用户名
    username:
      storageSession().getItem<TokenDTO>(sessionKey)?.currentUser.userInfo
        .username ?? "",
    // 页面级别权限
    roles: storageSession().getItem<TokenDTO>(sessionKey)?.currentUser.roleKey
      ? [storageSession().getItem<TokenDTO>(sessionKey)?.currentUser.roleKey]
      : [],
    dictionaryList:
      storageLocal().getItem<Map<String, Array<DictionaryData>>>(
        dictionaryListKey
      ) ?? new Map(),
    dictionaryMap:
      storageLocal().getItem<Map<String, Map<String, DictionaryData>>>(
        dictionaryMapKey
      ) ?? new Map(),
    currentUserInfo:
      storageSession().getItem<TokenDTO>(sessionKey)?.currentUser.userInfo ?? {}
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      /** TODO 这里不是应该再进一步存到sessionStorage中吗 */
      this.username = username;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储系统内的字典值 并拆分为Map形式和List形式 */
    SET_DICTIONARY(dictionary: Map<String, Array<DictionaryData>>) {
      /** 由于localStorage不能存储Map对象,所以用Obj来装载数据 */
      const dictionaryMapTmp = {};

      for (const obj in dictionary) {
        dictionaryMapTmp[obj] = dictionary[obj].reduce((map, dict) => {
          map[dict.value] = dict;
          return map;
        }, {});
      }

      /** 将字典分成List形式和Map形式 List便于下拉框展示 Map便于匹配值 */
      this.dictionaryList = dictionary;
      this.dictionaryMap = dictionaryMapTmp;

      storageLocal().setItem<Map<String, Array<DictionaryData>>>(
        dictionaryListKey,
        dictionary
      );

      storageLocal().setItem<Map<String, Map<String, DictionaryData>>>(
        dictionaryMapKey,
        dictionaryMapTmp as Map<String, Map<String, DictionaryData>>
      );
    },

    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
