export interface DialogProps {
  /**
   * 标题
   */
  title: string;
  /**
   * 显隐
   */
  modelValue: boolean;

  /**
   * 初始化全屏状态
   */
  initFullScreen?: boolean | undefined;

  /**
   * 展示全屏按钮
   */
  showFullScreen?: boolean;

  /**
   * 全屏
   */
  fullScreen?: boolean | undefined;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  /**
   * 使用el-scrollbar包裹对话框body
   */
  useBodyScrolling?: boolean;
  /**
   * 固定对话框body高度
   */
  fixedBodyHeight?: boolean;

  draggable?: boolean;

  hiddenFooter?: boolean;
}

export type DialogEmits = {
  "update:modelValue": [val: boolean];
  "update:fullScreen": [val: boolean];
  confirm: [];
  cancel: [];
};
