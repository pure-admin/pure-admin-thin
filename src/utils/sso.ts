import { removeToken, setToken, type DataInfo } from "./auth";
import { subBefore, getQueryMap } from "@pureadmin/utils";

/**
 * Đăng nhập đơn giản bằng SSO phía frontend, tuỳ chỉnh theo yêu cầu thực tế của doanh nghiệp, sau khi nền tảng khởi động, bạn có thể kiểm tra thử nghiệm địa phương bằng cách truy cập vào liên kết sau: http://localhost:8848/#/permission/page/index?username=sso&roles=admin&accessToken=eyJhbGciOiJIUzUxMiJ9.admin
 * Chú ý:
 * Kiểm tra xem có phải đăng nhập đơn giản không, nếu không phải thì trả về mà không thực hiện bất kỳ xử lý logic nào, dưới đây là xử lý logic sau khi đăng nhập đơn giản
 * 1. Xóa thông tin cũ trên thiết bị địa phương;
 * 2. Lấy thông tin tham số quan trọng từ URL, sau đó lưu trữ bằng setToken vào thiết bị địa phương;
 * 3. Xóa các tham số không cần thiết để hiển thị trong URL;
 * 4. Sử dụng window.location.replace để chuyển hướng đến trang chính xác.
 */
(function () {
  // Lấy các tham số từ URL
  const params = getQueryMap(location.href) as DataInfo<Date>;
  const must = ["username", "roles", "accessToken"];
  const mustLength = must.length;
  if (Object.keys(params).length !== mustLength) return;

  // Nếu các tham số URL đủ điều kiện trong must, đánh dấu là đăng nhập đơn giản, tránh vòng lặp vô hạn khi làm mới trang không phải đăng nhập đơn giản
  let sso = [];
  let start = 0;

  while (start < mustLength) {
    if (Object.keys(params).includes(must[start]) && sso.length <= mustLength) {
      sso.push(must[start]);
    } else {
      sso = [];
    }
    start++;
  }

  if (sso.length === mustLength) {
    // Đánh dấu là đăng nhập đơn giản

    // Xóa thông tin cũ trên thiết bị client
    removeToken();

    // Lưu trữ thông tin mới vào thiết bị client
    setToken(params);

    // Xóa các tham số không cần thiết để hiển thị trong URL
    delete params.roles;
    delete params.accessToken;

    const newUrl = `${location.origin}${location.pathname}${subBefore(
      location.hash,
      "?"
    )}?${JSON.stringify(params)
      .replace(/["{}]/g, "")
      .replace(/:/g, "=")
      .replace(/,/g, "&")}`;

    // Thay thế mục lịch sử
    window.location.replace(newUrl);
  } else {
    return;
  }
})();
