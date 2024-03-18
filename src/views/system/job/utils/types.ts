interface FormItemProps {
  higherDeptOptions: Record<string, unknown>[];
  parentId?: number;
  id: number;
  jobSort: number;
  name: string;
  principal: string;
  phone: string | number;
  email: string;
  sort: number;
  version: number;
  enabled: boolean;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
