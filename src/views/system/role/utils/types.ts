// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  id: number;
  /** 角色名称 */
  name: string;
  /** 角色编号 */
  level: number;
  /** 数据范围 */
  dataScope: string;
  /** 备注 */
  description: string;
  /** 备注 */
  depts: any[];
  deptIds: number[];
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
