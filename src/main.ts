import App from "./App.vue";
import router from "./router";
import { setupStore } from "/@/store";
import ElementPlus from "element-plus";
import { getServerConfig } from "./config";
import { createApp, Directive } from "vue";
import { MotionPlugin } from "@vueuse/motion";
import { injectResponsiveStorage } from "/@/utils/storage/responsive";

import "uno.css";
import "animate.css";
// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
import "element-plus/dist/index.css";
import "@pureadmin/components/dist/index.css";
import "@pureadmin/components/dist/theme.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

// 自定义指令
import * as directives from "/@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

getServerConfig(app).then(async config => {
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  setupStore(app);
  app.use(MotionPlugin).use(ElementPlus);
  app.mount("#app");
});
