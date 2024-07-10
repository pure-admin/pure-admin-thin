// Đây là nơi lưu trữ biểu tượng cục bộ, được tải trong tệp src/layout/index.vue để tránh tải lại khi khởi động lần đầu

import { addIcon } from "@iconify/vue/dist/offline";

// Biểu tượng menu cục bộ, máy chủ trả về chuỗi biểu tượng tương ứng trong thuộc tính icon của định tuyến và phía trước sử dụng addIcon để thêm vào đây để hiển thị biểu tượng menu
// @iconify-icons/ep
import Lollipop from "@iconify-icons/ep/lollipop";
import HomeFilled from "@iconify-icons/ep/home-filled";
addIcon("ep:lollipop", Lollipop);
addIcon("ep:home-filled", HomeFilled);

// @iconify-icons/ri
import Search from "@iconify-icons/ri/search-line";
import InformationLine from "@iconify-icons/ri/information-line";
addIcon("ri:search-line", Search);
addIcon("ri:information-line", InformationLine);
