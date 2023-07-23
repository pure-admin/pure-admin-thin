import dayjs from "dayjs";
import { message } from "@/utils/message";
import {
  deleteRoleApi,
  getRoleListApi,
  RoleDTO,
  RoleQuery
} from "@/api/system/role";
import { getMenuListApi, MenuDTO } from "@/api/system/menu";
import { ElMessage, ElMessageBox } from "element-plus";
import { usePublicHooks } from "../../hooks";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, toRaw } from "vue";
import { toTree } from "@/utils/tree";

export function useRole() {
  const form = reactive<RoleQuery>({
    roleKey: "",
    roleName: "",
    status: undefined
  });
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "角色编号",
      prop: "roleId",
      minWidth: 100
    },
    {
      label: "角色名称",
      prop: "roleName",
      minWidth: 120
    },
    {
      label: "角色标识",
      prop: "roleKey",
      minWidth: 150
    },
    {
      label: "状态",
      minWidth: 130,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="已启用"
          inactive-text="已停用"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "备注",
      prop: "remark",
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

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 0 ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.name
      }</strong>吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message(`已${row.status === 0 ? "停用" : "启用"}${row.name}`, {
            type: "success"
          });
        }, 300);
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  async function handleDelete(row: RoleDTO) {
    try {
      loading.value = true;
      await deleteRoleApi(row.roleId);
      message(`您删除了角色名称为${row.roleName}的这条数据`, { type: "info" });
      onSearch();
    } catch (e) {
      console.error(e);
      message((e as Error)?.message || "删除失败", { type: "error" });
    } finally {
      loading.value = false;
    }
  }

  async function onSearch() {
    try {
      loading.value = true;
      const { data } = await getRoleListApi(toRaw(form));
      console.log("role list", data);
      dataList.value = data.rows;
      pagination.total = data.total;
    } catch (e) {
      console.error(e);
      ElMessage.error((e as Error)?.message || "加载失败");
    } finally {
      loading.value = false;
    }
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  const menuTree = ref<MenuDTO[]>([]);
  /** 菜单权限 */
  async function getMenuTree() {
    if (menuTree.value?.length) {
      return menuTree.value;
    }
    const { data } = await getMenuListApi({ isButton: false });
    console.log("menu data", data);
    menuTree.value = toTree(data, "id", "parentId");
    return menuTree.value;
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(onSearch);

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    menuTree,
    getMenuTree,
    handleDelete
  };
}
