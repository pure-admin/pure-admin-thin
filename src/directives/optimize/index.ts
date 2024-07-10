import {
  isArray,
  throttle,
  debounce,
  isObject,
  isFunction
} from "@pureadmin/utils";
import { useEventListener } from "@vueuse/core";
import type { Directive, DirectiveBinding } from "vue";

export interface OptimizeOptions {
  /** Tên sự kiện */
  event: string;
  /** Phương thức gọi sự kiện */
  fn: (...params: any) => any;
  /** Có thực thi ngay lập tức hay không */
  immediate?: boolean;
  /** Thời gian chậm hành động hoặc giảm tốc (giảm tốc mặc định: `200` mili giây, giảm tốc mặc định: `1000` mili giây) */
  timeout?: number;
  /** Tham số truyền vào */
  params?: any;
}

/** Chỉ thị giảm tốc (v-optimize hoặc v-optimize:giảm tốc), giảm tốc (v-optimize:giảm tốc) */
export const optimize: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<OptimizeOptions>) {
    const { value } = binding;
    const optimizeType = binding.arg ?? "debounce";
    const type = ["debounce", "throttle"].find(t => t === optimizeType);
    if (type) {
      if (value && value.event && isFunction(value.fn)) {
        let params = value?.params;
        if (params) {
          if (isArray(params) || isObject(params)) {
            params = isObject(params) ? Array.of(params) : params;
          } else {
            throw new Error(
              "[Chỉ thị: optimize]: `params` phải là một mảng hoặc đối tượng"
            );
          }
        }
        // Đăng ký sử dụng addEventListener khi mounted và tự động gỡ bỏ addEventListener khi unmounted
        useEventListener(
          el,
          value.event,
          type === "debounce"
            ? debounce(
                params ? () => value.fn(...params) : value.fn,
                value?.timeout ?? 200,
                value?.immediate ?? false
              )
            : throttle(
                params ? () => value.fn(...params) : value.fn,
                value?.timeout ?? 1000
              )
        );
      } else {
        throw new Error(
          "[Chỉ thị: optimize]: `event` và `fn` là bắt buộc, và `fn` phải là một hàm"
        );
      }
    } else {
      throw new Error(
        "[Chỉ thị: optimize]: chỉ hỗ trợ `debounce` và `throttle`"
      );
    }
  }
};
