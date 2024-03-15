import { http } from "@/utils/http";
import type { PureHttpRequestConfig } from "@/utils/http/types.d";
import type { AxiosRequestConfig } from "axios";
import type { ApiAbstract } from "@/utils/http/ApiAbstract";

export const baseUrlApi = (url: string) => `/api/${url}`;
export const baseUrlAuth = (url: string) => `/auth/${url}`;
export const baseUrlAvatar = (url: string) => `/avatar/${url}`;

/** 单独抽离的CRUD工具函数 */
class crud {
  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<ApiAbstract<P>> {
    return http.get<T, ApiAbstract<P>>(baseUrlApi(url), params, config);
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<ApiAbstract<P>> {
    return http.post<T, ApiAbstract<P>>(baseUrlApi(url), params, config);
  }

  /** 单独抽离的put工具函数 */
  public put<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<ApiAbstract<P>> {
    return http.put<T, ApiAbstract<P>>(baseUrlApi(url), params, config);
  }

  /** 单独抽离的delete工具函数 */
  public delete<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<ApiAbstract<P>> {
    return http.delete<T, ApiAbstract<P>>(baseUrlApi(url), params, config);
  }

  /** 单独抽离的delete工具函数 */
  public download<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: PureHttpRequestConfig
  ): Promise<P> {
    return http.get<T, P>(baseUrlApi(url + "/download"), params, config);
  }
}

export const CRUD = new crud();
