// Khai báo toàn cầu cho loại định tuyến

import type { RouteComponent, RouteLocationNormalized } from "vue-router";
import type { FunctionalComponent } from "vue";

declare global {
  interface ToRouteType extends RouteLocationNormalized {
    meta: CustomizeRouteMeta;
  }

  /**
   * @description Bảng cấu hình `meta` cho định tuyến con đầy đủ
   */
  interface CustomizeRouteMeta {
    /** Tên của menu (hỗ trợ cả quốc tế hóa và không quốc tế hóa, nếu sử dụng cách viết quốc tế hóa, cần thêm vào thư mục `locales` ở thư mục gốc) `Bắt buộc` */
    title: string;
    /** Biểu tượng của menu `Tùy chọn` */
    icon?: string | FunctionalComponent | IconifyIcon;
    /** Biểu tượng bổ sung bên phải của tên menu */
    extraIcon?: string | FunctionalComponent | IconifyIcon;
    /** Hiển thị trong menu hay không (mặc định là `true`) `Tùy chọn` */
    showLink?: boolean;
    /** Hiển thị menu cha hay không `Tùy chọn` */
    showParent?: boolean;
    /** Cài đặt quyền trang `Tùy chọn` */
    roles?: Array<string>;
    /** Cài đặt quyền nút `Tùy chọn` */
    auths?: Array<string>;
    /** Bật/tắt bộ nhớ đệm cho thành phần định tuyến (bật `true`, tắt `false`) `Tùy chọn` */
    keepAlive?: boolean;
    /** Liên kết `iframe` nhúng `Tùy chọn` */
    frameSrc?: string;
    /** Bật/tắt hoạt hình tải lần đầu cho `iframe` (mặc định là `true`) `Tùy chọn` */
    frameLoading?: boolean;
    /** Hoạt hình tải trang (hai chế độ, chế độ thứ hai có ưu tiên hơn, chế độ thứ nhất sử dụng hoạt hình `transitions` có sẵn trong Vue, chế độ thứ hai sử dụng hoạt hình `animate.css`, nền tảng khuyến khích sử dụng chế độ thứ hai với `animate.css` đã được tích hợp sẵn, chỉ cần viết tên hoạt hình tương ứng) `Tùy chọn` */
    transition?: {
      /**
       * @description Hiệu ứng hoạt hình cho định tuyến hiện tại
       * @see {@link https://next.router.vuejs.org/guide/advanced/transitions.html#transitions}
       * @see animate.css {@link https://animate.style}
       */
      name?: string;
      /** Hiệu ứng khi vào */
      enterTransition?: string;
      /** Hiệu ứng khi ra đi */
      leaveTransition?: string;
    };
    /** Không cho phép thêm tên menu hiện tại hoặc thông tin tùy chỉnh vào tab (mặc định là `false`) */
    hiddenTag?: boolean;
    /** Cố định hiển thị tên menu hiện tại trên tab và không thể đóng (mặc định là `false`) */
    fixedTag?: boolean;
    /** Số lượng tối đa của độ sâu định tuyến có thể mở `Tùy chọn` */
    dynamicLevel?: number;
    /** Kích hoạt một menu cụ thể
     * (chủ yếu dùng cho định tuyến truyền tham số qua `query` hoặc `params`, khi chúng không hiển thị trong menu với `showLink: false`, không có bất kỳ menu nào được làm nổi bật,
     * thay vào đó chỉ cần đặt `activePath` để chỉ định menu cần kích hoạt, `activePath` là `path` của menu cần kích hoạt)
     */
    activePath?: string;
  }

  /**
   * @description Bảng cấu hình định tuyến con đầy đủ
   */
  interface RouteChildrenConfigsTable {
    /** Địa chỉ định tuyến con `Bắt buộc` */
    path: string;
    /** Tên định tuyến (đảm bảo duy nhất, tên phải trùng với `name` của thành phần hiện tại) `Bắt buộc` */
    name?: string;
    /** Điều hướng lại định tuyến `Tùy chọn` */
    redirect?: string;
    /** Thành phần tải theo yêu cầu `Tùy chọn` */
    component?: RouteComponent;
    meta?: CustomizeRouteMeta;
    /** Các mục cấu hình định tuyến con */
    children?: Array<RouteChildrenConfigsTable>;
  }

  /**
   * @description Bảng cấu hình toàn bộ định tuyến (bao gồm cả định tuyến con đầy đủ)
   */
  interface RouteConfigsTable {
    /** Địa chỉ định tuyến `Bắt buộc` */
    path: string;
    /** Tên định tuyến (duy trì duy nhất) `Tùy chọn` */
    name?: string;
    /** Thành phần `Layout` `Tùy chọn` */
    component?: RouteComponent;
    /** Điều hướng lại định tuyến `Tùy chọn` */
    redirect?: string;
    meta?: {
      /** Tên menu (hỗ trợ cả quốc tế hóa và không quốc tế hóa, nếu sử dụng cách viết quốc tế hóa, cần thêm vào thư mục `locales` ở thư mục gốc) `Bắt buộc` */
      title: string;
      /** Biểu tượng của menu `Tùy chọn` */
      icon?: string | FunctionalComponent | IconifyIcon;
      /** Hiển thị trong menu hay không (mặc định là `true`) `Tùy chọn` */
      showLink?: boolean;
      /** Sắp xếp thứ tự menu, giá trị càng cao sắp xếp càng sau (chỉ áp dụng cho định tuyến cấp đầu) `Tùy chọn` */
      rank?: number;
    };
    /** Các mục cấu hình định tuyến con */
    children?: Array<RouteChildrenConfigsTable>;
  }
}

// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
declare module "vue-router" {
  interface RouteMeta extends CustomizeRouteMeta {}
}
