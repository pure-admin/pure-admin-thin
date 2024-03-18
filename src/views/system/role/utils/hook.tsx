import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import * as Role from "@/api/system/role";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw, type Ref } from "vue";
import { handleTree } from "@/utils/tree";
import * as Dept from "@/api/system/dept";
import * as Menu from "@/api/system/menu";
import { cloneDeep } from "@pureadmin/utils";
import type { ApiAbstract } from "@/utils/http/ApiAbstract";
//import { cloneDeep } from "@pureadmin/utils";

export function useRole(tableRef?: Ref, treeRef?: Ref) {
  const deptList = ref();
  console.log(tableRef, treeRef);
  const form = reactive({
    blurry: "",
    createTime: "",
    size: 10,
    page: 0
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const treeData = ref([]);
  const treeLoading = ref(true);
  const currentRow = ref([]);
  const deptId = ref<Number>();
  const nenus = ref<ApiAbstract<Menu.Menu>>();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    pageSizes: [10, 20, 50, 100],
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "角色名称",
      prop: "name",
      minWidth: 120
    },
    {
      label: "数据权限",
      prop: "dataScope",
      minWidth: 150
    },
    {
      label: "角色级别",
      prop: "level",
      minWidth: 150
    },
    {
      label: "描述",
      prop: "description",
      minWidth: 150
    },
    {
      label: "创建时间",
      minWidth: 180,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];
  // const buttonClass = computed(() => {
  //   return [
  //     "!h-[20px]",
  //     "reset-margin",
  //     "!text-gray-500",
  //     "dark:!text-white",
  //     "dark:hover:!text-primary"
  //   ];
  // });

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
    Role.del([row.id]).finally(() => onSearch());
  }

  function handleSizeChange(val: number) {
    form.size = val - 1;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    form.page = val - 1;
    onSearch();
  }
  function handleCurrentChange1(value: Dept.Dept) {
    deptId.value = value?.id;
    const { data } = nenus.value;
    treeData.value = cloneDeep(handleTree(data, "id", "pid"));
    currentRow.value = value?.menus?.map(item => item.id) ?? [-1];
  }

  async function onSearch() {
    getDeptTree();
    loading.value = true;
    const { data } = await Role.get(
      Object.entries(toRaw(form))
        .filter(([_, value]) => value !== null && value !== "")
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    );
    dataList.value = data.content;
    pagination.total = data.totalElements;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          name: row?.name ?? "",
          description: row?.description ?? "",
          level: row?.level ?? 0,
          dataScope: row?.dataScope ?? "全部",
          dataIds: row?.deptIds ?? [],
          deptIds: row?.depts.map(person => person.id) ?? [],
          depts: cloneDeep(deptList.value)
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了角色名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              const obj = {
                ...curData,
                depts: curData.deptIds.map(person => ({
                  id: Object.values(person)[Object.values(person).length - 1]
                }))
              }; // 复制对象
              delete obj.id; // 删除指定字段
              Role.add(obj).finally(() => chores());
            } else if (title === "编辑") {
              const roleOne = {
                ...curData,
                depts: curData.deptIds.map(person => ({
                  id: Object.values(person)[Object.values(person).length - 1]
                }))
              };
              Role.edit(roleOne).finally(() => chores());
            }
          }
        });
      }
    });
  }

  function getDeptTree() {
    Dept.getDeptTree([]).then(data => {
      if (data.status) {
        deptList.value = handleTree(data.data, "id", "pid");
      }
    });
  }
  function onTreeSelect({ id, menuIds }) {
    if (
      id.value !== null &&
      id.value !== undefined &&
      id.value === deptId.value
    ) {
      Role.menus({
        id: id.value,
        menus: menuIds.map(person => ({
          id: person
        }))
      }).then(() => {
        onSearch();
      });
    }
  }
  onMounted(async () => {
    // 归属部门
    nenus.value = await Menu.menuTree([]);
    const { data } = nenus.value;
    treeData.value = cloneDeep(handleTree(data, "id", "pid"));
    treeLoading.value = false;
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    deptList,
    pagination,
    treeData,
    treeLoading,
    currentRow,
    deptId,
    // buttonClass,
    onTreeSelect,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleCurrentChange1
  };
}
