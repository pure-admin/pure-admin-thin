import type { CSSProperties, VNodeChild } from "vue";
import {
  createTypes,
  toValidableType,
  type VueTypesInterface,
  type VueTypeValidableDef
} from "vue-types";

export type VueNode = VNodeChild | JSX.Element;

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
};

const newPropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}) as PropTypes;

// Bắt đầu từ vue-types v5.0, phương thức Extend() đã bị bỏ và được thay đổi thành phương thức ES6+ được đề xuất chính thức https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html #phương thức -extend
export default class propTypes extends newPropTypes {
  // a native-like validator that supports the `.validable` method
  static get style() {
    return toValidableType("style", {
      type: [String, Object]
    });
  }

  static get VNodeChild() {
    return toValidableType("VNodeChild", {
      type: undefined
    });
  }
}
