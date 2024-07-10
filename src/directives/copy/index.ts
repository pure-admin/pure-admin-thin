import { message } from "@/utils/message";
import { useEventListener } from "@vueuse/core";
import { copyTextToClipboard } from "@pureadmin/utils";
import type { Directive, DirectiveBinding } from "vue";

export interface CopyEl extends HTMLElement {
  copyValue: string;
}

/** Chỉ thị sao chép văn bản (mặc định là sao chép khi double click) */
export const copy: Directive = {
  mounted(el: CopyEl, binding: DirectiveBinding<string>) {
    const { value } = binding;
    if (value) {
      el.copyValue = value;
      const arg = binding.arg ?? "dblclick";
      // Đăng ký sử dụng addEventListener khi mounted và tự động gỡ bỏ addEventListener khi unmounted
      useEventListener(el, arg, () => {
        const success = copyTextToClipboard(el.copyValue);
        success
          ? message("Sao chép thành công", { type: "success" })
          : message("Sao chép thất bại", { type: "error" });
      });
    } else {
      throw new Error(
        '[Directive: copy]: cần giá trị! Ví dụ: v-copy="modelValue"'
      );
    }
  },
  updated(el: CopyEl, binding: DirectiveBinding) {
    el.copyValue = binding.value;
  }
};
