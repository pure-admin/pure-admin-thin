interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;
  higherDeptOptions: Record<string, unknown>[];
  parentId: number;
  username: string;
  nickName: string;
  password: string;
  phone: string | number;
  email: string;
  gender: string | number;
  enabled: boolean;
  dept?: {
    id?: number;
    name?: string;
  };
  remark: string;
  roleOptionsId: number[];
  roleOptions: Record<string, number>[];
  jobOptionsId: number[];
  jobOptions: Record<string, number>[];
}
interface FormProps {
  formInline: FormItemProps;
}

interface RoleFormItemProps {
  username: string;
  nickName: string;
  /** 角色列表 */
  roleOptions: any[];
  /** 选中的角色列表 */
  ids: Record<number, unknown>[];
}
interface RoleFormProps {
  formInline: RoleFormItemProps;
}

export type { FormItemProps, FormProps, RoleFormItemProps, RoleFormProps };
