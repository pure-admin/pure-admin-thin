import type { iconType } from "./types";
import { h, defineComponent, type Component } from "vue";
import { IconifyIconOnline, IconifyIconOffline, FontIcon } from "../index";

/**
 * Hỗ trợ `iconfont`, `svg` tùy chỉnh và tất cả các biểu tượng trong `iconify`
 * @see Nhấp để xem hướng dẫn biểu tượng trong tài liệu {@link https://pure-admin.github.io/pure-admin-doc/pages/icon/}
 * @param icon Bắt buộc Biểu tượng
 * @param attrs Tùy chọn Các thuộc tính loại iconType
 * @returns Component
 */
export function useRenderIcon(icon: any, attrs?: iconType): Component {
  // iconfont
  const ifReg = /^IF-/;
  // typeof icon === "function" belongs to SVG
  if (ifReg.test(icon)) {
    // iconfont
    const name = icon.split(ifReg)[1];
    const iconName = name.slice(
      0,
      name.indexOf(" ") == -1 ? name.length : name.indexOf(" ")
    );
    const iconType = name.slice(name.indexOf(" ") + 1, name.length);
    return defineComponent({
      name: "FontIcon",
      render() {
        return h(FontIcon, {
          icon: iconName,
          iconType,
          ...attrs
        });
      }
    });
  } else if (typeof icon === "function" || typeof icon?.render === "function") {
    // svg
    return attrs ? h(icon, { ...attrs }) : icon;
  } else if (typeof icon === "object") {
    return defineComponent({
      name: "OfflineIcon",
      render() {
        return h(IconifyIconOffline, {
          icon: icon,
          ...attrs
        });
      }
    });
  } else {
    // Kiểm tra dấu : để xác định biểu tượng trực tuyến hoặc cục bộ, có tồn tại thì là biểu tượng trực tuyến, ngược lại là cục bộ
    return defineComponent({
      name: "Icon",
      render() {
        const IconifyIcon =
          icon && icon.includes(":") ? IconifyIconOnline : IconifyIconOffline;
        return h(IconifyIcon, {
          icon: icon,
          ...attrs
        });
      }
    });
  }
}
