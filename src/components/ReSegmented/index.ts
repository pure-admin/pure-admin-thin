import reSegmented from "./src/index";
import { withInstall } from "@pureadmin/utils";

/** Thành phần điều khiển phân đoạn */
export const ReSegmented = withInstall(reSegmented);

export default ReSegmented;
export type { OptionsType } from "./src/type";
