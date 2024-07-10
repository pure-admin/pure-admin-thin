import type { VNode } from "vue";
import { isFunction } from "@pureadmin/utils";
import { type MessageHandler, ElMessage } from "element-plus";

type messageStyle = "el" | "antd";
type messageTypes = "info" | "success" | "warning" | "error";

interface MessageParams {
  /** Loại thông báo, có thể là `info`, `success`, `warning`, `error`. Mặc định là `info` */
  type?: messageTypes;
  /** Biểu tượng tùy chỉnh, thuộc tính này sẽ ghi đè biểu tượng của `type` */
  icon?: any;
  /** Có sử dụng `message` như là một đoạn mã HTML hay không, mặc định là `false` */
  dangerouslyUseHTMLString?: boolean;
  /** Kiểu giao diện của thông báo, có thể là `el` hoặc `antd`, mặc định là `antd` */
  customClass?: messageStyle;
  /** Thời gian hiển thị, tính bằng mili giây. Đặt là `0` thì không tự động đóng, `element-plus` mặc định là `3000`, nền tảng đã đổi thành mặc định `2000` */
  duration?: number;
  /** Hiển thị nút đóng, mặc định là `false` */
  showClose?: boolean;
  /** Văn bản có căn giữa hay không, mặc định là `false` */
  center?: boolean;
  /** Độ lệch của `Message` so với đỉnh cửa sổ, mặc định là `20` */
  offset?: number;
  /** Thiết lập phần tử gốc của thành phần, mặc định là `document.body` */
  appendTo?: string | HTMLElement;
  /** Gộp các thông báo cùng nội dung giống nhau, không hỗ trợ loại `VNode`, mặc định là `false` */
  grouping?: boolean;
  /** Callback khi đóng thông báo, tham số là instance `message` đã đóng */
  onClose?: Function | null;
}

/** Sử dụng rất đơn giản, xem tệp src/views/components/message/index.vue để biết thêm chi tiết */

/**
 * Hàm thông báo `Message`
 */
const message = (
  message: string | VNode | (() => VNode),
  params?: MessageParams
): MessageHandler => {
  if (!params) {
    return ElMessage({
      message,
      customClass: "pure-message"
    });
  } else {
    const {
      icon,
      type = "info",
      dangerouslyUseHTMLString = false,
      customClass = "antd",
      duration = 2000,
      showClose = false,
      center = false,
      offset = 20,
      appendTo = document.body,
      grouping = false,
      onClose
    } = params;

    return ElMessage({
      message,
      type,
      icon,
      dangerouslyUseHTMLString,
      duration,
      showClose,
      center,
      offset,
      appendTo,
      grouping,
      // Tìm kiếm toàn cầu pure-message để biết vị trí lớp này
      customClass: customClass === "antd" ? "pure-message" : "",
      onClose: () => (isFunction(onClose) ? onClose() : null)
    });
  }
};

/**
 * Đóng tất cả các thông báo `Message`
 */
const closeAllMessage = (): void => ElMessage.closeAll();

export { message, closeAllMessage };
