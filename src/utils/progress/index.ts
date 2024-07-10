import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  // Animation mode
  easing: "ease",
  // Tăng tốc độ của thanh tiến trình
  speed: 500,
  // Có hiển thị ico đang tải hay không
  showSpinner: false,
  // khoảng thời gian tự động tăng
  trickleSpeed: 200,
  // Tỷ lệ phần trăm tối thiểu khi khởi tạo
  minimum: 0.3
});

export default NProgress;
