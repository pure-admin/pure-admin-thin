import type { VNode, Component } from "vue";
import type { iconType } from "@/components/ReIcon/src/types.ts";

export interface OptionsType {
  /** Nhãn */
  label?: string | (() => VNode | Component);
  /**
   * @description Biểu tượng, được render bằng hàm `useRenderIcon` được tích hợp trong nền tảng
   * @see {@link Xem thêm tại https://pure-admin.github.io/pure-admin-doc/pages/icon/#%E9%80%9A%E7%94%A8%E5%9B%BE%E6%A0%87-userendericon-hooks }
   */
  icon?: string | Component;
  /** Thuộc tính và style của biểu tượng */
  iconAttrs?: iconType;
  /** Giá trị */
  value?: any;
  /** Đã bị vô hiệu hóa hay chưa */
  disabled?: boolean;
  /** Chú thích tooltip */
  tip?: string;
}
