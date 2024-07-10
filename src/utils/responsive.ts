// Storage phản ứng
import type { App } from "vue";
import Storage from "responsive-storage";
import { routerArrays } from "@/layout/types";
import { responsiveStorageNameSpace } from "@/config";

export const injectResponsiveStorage = (app: App, config: PlatformConfigs) => {
  const nameSpace = responsiveStorageNameSpace();
  const configObj = Object.assign(
    {
      // Quốc tế hóa, mặc định là tiếng Việt vn
      locale: Storage.getData("locale", nameSpace) ?? {
        locale: config.Locale ?? "vi" // Đặt mặc định là "vi" nếu không có dữ liệu
      },
      // Mẫu bố trí và chủ đề
      layout: Storage.getData("layout", nameSpace) ?? {
        layout: config.Layout ?? "vertical", // Bố cục mặc định là "vertical" nếu không có dữ liệu
        theme: config.Theme ?? "light", // Chủ đề mặc định là "light" nếu không có dữ liệu
        darkMode: config.DarkMode ?? false, // Chế độ tối mặc định là false nếu không có dữ liệu
        sidebarStatus: config.SidebarStatus ?? true, // Trạng thái thanh bên mặc định là true nếu không có dữ liệu
        epThemeColor: config.EpThemeColor ?? "#409EFF", // Màu chủ đề EP mặc định là "#409EFF" nếu không có dữ liệu
        themeColor: config.Theme ?? "light", // Màu chủ đề (tương ứng với màu chủ đề trong cấu hình hệ thống, khác với chủ đề là nó sẽ không bị ảnh hưởng bởi việc chuyển đổi phong cách toàn cầu từ sáng sang tối, chỉ thay đổi khi người dùng nhấp vào màu chủ đề)
        overallStyle: config.OverallStyle ?? "light" // Phong cách toàn cầu (Sáng: light, Tối: dark, Tự động: system)
      },
      // Cấu hình hệ thống - Hiển thị giao diện
      configure: Storage.getData("configure", nameSpace) ?? {
        grey: config.Grey ?? false, // Xám mờ mặc định là false nếu không có dữ liệu
        weak: config.Weak ?? false, // Yếu mặc định là false nếu không có dữ liệu
        hideTabs: config.HideTabs ?? false, // Ẩn tab mặc định là false nếu không có dữ liệu
        hideFooter: config.HideFooter ?? true, // Ẩn chân trang mặc định là true nếu không có dữ liệu
        showLogo: config.ShowLogo ?? true, // Hiển thị logo mặc định là true nếu không có dữ liệu
        showModel: config.ShowModel ?? "chrome", // Hiển thị mô hình mặc định là "chrome" nếu không có dữ liệu
        multiTagsCache: config.MultiTagsCache ?? false, // Bộ nhớ cache nhiều thẻ mặc định là false nếu không có dữ liệu
        stretch: config.Stretch ?? false // Kéo dài mặc định là false nếu không có dữ liệu
      }
    },
    config.MultiTagsCache
      ? {
          // Hiển thị thẻ menu cấp độ cao nhất mặc định
          tags: Storage.getData("tags", nameSpace) ?? routerArrays
        }
      : {}
  );

  app.use(Storage, { nameSpace, memory: configObj });
};
