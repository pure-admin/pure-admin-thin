import "xe-utils";
import "./index.scss";
import { App } from "vue";

import {
  // 核心
  VXETable,
  // 表格功能
  Icon,
  Filter,
  Edit,
  Menu,
  Export,
  Keyboard,
  Validator,
  // 可选组件
  Column,
  Colgroup,
  Grid,
  Tooltip,
  Toolbar,
  Pager,
  Form,
  FormItem,
  FormGather,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Switch,
  Input,
  Select,
  Optgroup,
  Option,
  Textarea,
  Button,
  Modal,
  List,
  Pulldown,
  // 表格
  Table
} from "vxe-table";

// 全局默认参数
VXETable.setup({
  size: "medium",
  version: 0,
  zIndex: 1002,
  table: {
    // 自动监听父元素的变化去重新计算表格
    autoResize: true,
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: true
  },
  input: {
    clearable: true
  }
});

export function useTable(app: App) {
  app
    .use(Icon)
    .use(Filter)
    .use(Edit)
    .use(Menu)
    .use(Export)
    .use(Keyboard)
    .use(Validator)
    // 可选组件
    .use(Column)
    .use(Colgroup)
    .use(Grid)
    .use(Tooltip)
    .use(Toolbar)
    .use(Pager)
    .use(Form)
    .use(FormItem)
    .use(FormGather)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Radio)
    .use(RadioGroup)
    .use(RadioButton)
    .use(Switch)
    .use(Input)
    .use(Select)
    .use(Optgroup)
    .use(Option)
    .use(Textarea)
    .use(Button)
    .use(Modal)
    .use(List)
    .use(Pulldown)
    // 安装表格
    .use(Table);
}
