import { ElCol } from "element-plus";
import { h, defineComponent } from "vue";

// Bao bọc thành phần ElCol của element-plus
export default defineComponent({
  name: "ReCol",
  props: {
    value: {
      type: Number,
      default: 24
    }
  },
  render() {
    const attrs = this.$attrs;
    const val = this.value;
    return h(
      ElCol,
      {
        xs: val,
        sm: val,
        md: val,
        lg: val,
        xl: val,
        ...attrs
      },
      { default: () => this.$slots.default() }
    );
  }
});
