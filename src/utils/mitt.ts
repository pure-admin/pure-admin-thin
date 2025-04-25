import type { Emitter } from "mitt";
import mitt from "mitt";

/** 全局公共事件需要在此处添加类型 */
type Events = {
  openPanel: string;
  tagOnClick: string;
  logoChange: boolean;
  tagViewsChange: string;
  changLayoutRoute: string;
  tagViewsShowModel: string;
};

export const emitter: Emitter<Events> = mitt<Events>();
