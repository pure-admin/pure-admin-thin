import type { Directive } from "vue";
import type { CopyEl, OptimizeOptions, RippleOptions } from "@/directives";

declare module "vue" {
  export interface ComponentCustomProperties {
    /** Chỉ thị `Loading` cho hoạt ảnh tải, chi tiết xem tại: https://element-plus.org/en-US/component/loading.html
    vLoading: Directive<Element, boolean>;
    /** Chỉ thị quyền nút */
    vAuth: Directive<HTMLElement, string | Array<string>>;
    /** Chỉ thị sao chép văn bản (mặc định nhấp đúp để sao chép) */
    vCopy: Directive<CopyEl, string>;
    /** Chỉ thị nhấn giữ */
    vLongpress: Directive<HTMLElement, Function>;
    /** Chỉ thị chống rung, tiết lưu */
    vOptimize: Directive<HTMLElement, OptimizeOptions>;
    /**
     * Chỉ thị `v-ripple`, cách sử dụng như sau:
     * 1. `v-ripple` để kích hoạt tính năng `ripple` cơ bản
     * 2. `v-ripple="{ class: 'text-red' }"` để tùy chỉnh màu `ripple`, hỗ trợ `tailwindcss`, màu hiệu lực là `color`
     * 3. `v-ripple.center` để lan tỏa từ trung tâm
     */
    vRipple: Directive<HTMLElement, RippleOptions>;
  }
}

export {};
