import App from "./App.vue"; // Nhập component App.vue chính của ứng dụng
import router from "./router"; // Nhập định tuyến của Vue Router
import { setupStore } from "@/store"; // Sử dụng hàm setupStore từ module store
import { useI18n } from "@/plugins/i18n"; // Sử dụng plugin i18n cho quản lý ngôn ngữ
import { getPlatformConfig } from "./config"; // Lấy cấu hình nền tảng từ module config
import { MotionPlugin } from "@vueuse/motion"; // Sử dụng plugin motion từ VueUse
import { useEcharts } from "@/plugins/echarts"; // Sử dụng plugin Echarts
import { createApp, type Directive } from "vue"; // Tạo ứng dụng Vue mới
import { useVxeTable } from "@/plugins/vxeTable"; // Sử dụng plugin VxeTable
import { useElementPlus } from "@/plugins/elementPlus"; // Sử dụng plugin Element Plus
import { injectResponsiveStorage } from "@/utils/responsive"; // Sử dụng hàm injectResponsiveStorage từ util responsive

import Table from "@pureadmin/table"; // Nhập component Table từ thư viện @pureadmin/table
import PureDescriptions from "@pureadmin/descriptions"; // Nhập component PureDescriptions từ thư viện @pureadmin/descriptions

// Nhập các file style để reset, import index.scss và tailwind.css
import "./style/reset.scss";
import "./style/index.scss";
import "./style/tailwind.css";
import "element-plus/dist/index.css"; // Import CSS của Element Plus
import "./assets/iconfont/iconfont.js"; // Nhập icon font
import "./assets/iconfont/iconfont.css"; // Import CSS của icon font
import "./oidc/oidc";

const app = createApp(App); // Tạo một ứng dụng Vue mới với component App.vue

// Định nghĩa các custom directive
import * as directives from "@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// Đăng ký toàn cục thư viện iconify/vue
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

// Đăng ký toàn cục component cho quyền truy cập cấp nút
import { Auth } from "@/components/ReAuth";
app.component("Auth", Auth);

// Đăng ký toàn cục Vue Tippy
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import VueTippy from "vue-tippy";
app.use(VueTippy);

// Lấy cấu hình nền tảng và khởi tạo ứng dụng
getPlatformConfig(app).then(async config => {
  setupStore(app); // Thiết lập store Vuex
  app.use(router); // Sử dụng router Vue
  await router.isReady(); // Chờ router sẵn sàng
  injectResponsiveStorage(app, config); // Inject cấu hình đáp ứng vào ứng dụng
  app
    .use(MotionPlugin) // Sử dụng MotionPlugin từ VueUse
    .use(useI18n) // Sử dụng plugin i18n
    .use(useElementPlus) // Sử dụng plugin Element Plus
    .use(Table) // Sử dụng component Table
    .use(useVxeTable) // Sử dụng plugin VxeTable
    .use(PureDescriptions) // Sử dụng component PureDescriptions
    .use(useEcharts); // Sử dụng plugin Echarts
  app.mount("#app"); // Gắn ứng dụng vào phần tử có id là "app"
});
