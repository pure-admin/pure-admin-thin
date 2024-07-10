import { useEventListener } from "@vueuse/core";

/** Kiểm tra xem có phải là thẻ `img` */
function isImgElement(element) {
  return typeof HTMLImageElement !== "undefined"
    ? element instanceof HTMLImageElement
    : element.tagName.toLowerCase() === "img";
}

// Import và gọi từ src/main.ts import { addPreventDefault } from "@/utils/preventDefault"; addPreventDefault();
export const addPreventDefault = () => {
  // Ngăn chặn mở bảng công cụ phát triển của trình duyệt bằng phím tắt F12
  useEventListener(
    window.document,
    "keydown",
    ev => ev.key === "F12" && ev.preventDefault()
  );
  // Ngăn chặn menu chuột phải mặc định của trình duyệt (không ảnh hưởng đến sự kiện chuột phải tùy chỉnh)
  useEventListener(window.document, "contextmenu", ev => ev.preventDefault());
  // Ngăn chặn các phần tử trang được chọn
  useEventListener(window.document, "selectstart", ev => ev.preventDefault());
  // Trình duyệt thường cho phép kéo và thả hình ảnh mặc định và có thể mở trong tab hoặc cửa sổ mới, hoặc kéo nó vào ứng dụng khác. Ở đây, chúng tôi vô hiệu hóa nó để mặc định hình ảnh không thể kéo và thả
  useEventListener(
    window.document,
    "dragstart",
    ev => isImgElement(ev?.target) && ev.preventDefault()
  );
};
