import { h, defineComponent } from "vue";
import { Icon as IconifyIcon, addIcon } from "@iconify/vue/dist/offline";

// element-plus icon
import Check from "@iconify-icons/ep/check";
import HomeFilled from "@iconify-icons/ep/home-filled";
import Lollipop from "@iconify-icons/ep/lollipop";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import Close from "@iconify-icons/ep/close";
import CloseBold from "@iconify-icons/ep/close-bold";
import Bell from "@iconify-icons/ep/bell";
import Search from "@iconify-icons/ep/search";
addIcon("check", Check);
addIcon("home-filled", HomeFilled);
addIcon("lollipop", Lollipop);
addIcon("refresh-right", RefreshRight);
addIcon("close", Close);
addIcon("close-bold", CloseBold);
addIcon("bell", Bell);
addIcon("search", Search);

// remixicon
import ArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line";
import ArrowLeftSLine from "@iconify-icons/ri/arrow-left-s-line";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import InformationLine from "@iconify-icons/ri/information-line";
import ArrowUpLine from "@iconify-icons/ri/arrow-up-line";
import ArrowDownLine from "@iconify-icons/ri/arrow-down-line";
import Bookmark2Line from "@iconify-icons/ri/bookmark-2-line";
import User from "@iconify-icons/ri/user-3-fill";
import Lock from "@iconify-icons/ri/lock-fill";
import MenuUnfold from "@iconify-icons/ri/menu-unfold-fill";
import MenuFold from "@iconify-icons/ri/menu-fold-fill";
import Setting from "@iconify-icons/ri/settings-3-line";
import ArrowDown from "@iconify-icons/ri/arrow-down-s-line";
import CloseLeftTags from "@iconify-icons/ri/text-direction-r";
import CloseRightTags from "@iconify-icons/ri/text-direction-l";
import CloseOtherTags from "@iconify-icons/ri/text-spacing";
import CloseAllTags from "@iconify-icons/ri/subtract-line";
import Fullscreen from "@iconify-icons/ri/fullscreen-fill";
import ExitFullscreen from "@iconify-icons/ri/fullscreen-exit-fill";
addIcon("arrow-right-s-line", ArrowRightSLine);
addIcon("arrow-left-s-line", ArrowLeftSLine);
addIcon("logout-circle-r-line", LogoutCircleRLine);
addIcon("information-line", InformationLine);
addIcon("arrow-up-line", ArrowUpLine);
addIcon("arrow-down-line", ArrowDownLine);
addIcon("bookmark-2-line", Bookmark2Line);
addIcon("user", User);
addIcon("lock", Lock);
addIcon("menu-unfold", MenuUnfold);
addIcon("menu-fold", MenuFold);
addIcon("setting", Setting);
addIcon("arrow-down", ArrowDown);
addIcon("close-left-tags", CloseLeftTags);
addIcon("close-right-tags", CloseRightTags);
addIcon("close-other-tags", CloseOtherTags);
addIcon("close-all-tags", CloseAllTags);
addIcon("fullscreen", Fullscreen);
addIcon("exit-fullscreen", ExitFullscreen);

// Iconify Icon在Vue里离线使用（用于内网环境）https://docs.iconify.design/icon-components/vue/offline.html
export default defineComponent({
  name: "IconifyIconOffline",
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: ""
    }
  },
  render() {
    const attrs = this.$attrs;
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        style: attrs?.style
          ? Object.assign(attrs.style, { outline: "none" })
          : { outline: "none" },
        ...attrs
      },
      {
        default: () => []
      }
    );
  }
});
