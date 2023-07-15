import dayjs from "dayjs";
import descriptionForm from "../description.vue";
import { message } from "@/utils/message";
import { addDialog, closeDialog } from "@/components/ReDialog";
import { ElMessageBox, Sort } from "element-plus";
import { OperationLogsQuery, getOperationLogListApi } from "@/api/system/log";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { deleteOperationLogApi } from "@/api/system/log";
import { CommonUtils } from "@/utils/common";

const operationLogStatusMap =
  useUserStoreHook().dictionaryMap["sysOperationLog.status"];
const businessTypeMap =
  useUserStoreHook().dictionaryMap["sysOperationLog.businessType"];

export function useOperationLogHook() {
  const defaultSort: Sort = {
    prop: "operationTime",
    order: "descending"
  };

  const pagination: PaginationProps = {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  };

  const timeRange = ref([]);

  const searchFormParams = reactive<OperationLogsQuery>({
    beginTime: undefined,
    endTime: undefined,
    businessType: undefined,
    requestModule: undefined,
    status: undefined,
    username: undefined,
    timeRangeColumn: defaultSort.prop
  });

  const dataList = ref([]);
  const pageLoading = ref(true);
  const multipleSelection = ref([]);

  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "操作编号",
      prop: "operationId",
      minWidth: 100
    },
    {
      label: "业务模块",
      prop: "requestModule",
      minWidth: 120
    },
    {
      label: "操作类型",
      prop: "businessType",
      minWidth: 120,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={businessTypeMap[row.businessType].cssTag}
          effect="plain"
        >
          {businessTypeMap[row.businessType].label}
        </el-tag>
      )
    },
    {
      label: "请求方式",
      prop: "requestMethod",
      minWidth: 120
    },
    {
      label: "操作人员",
      prop: "username",
      minWidth: 120
    },
    {
      label: "登录地址",
      prop: "operatorIp",
      minWidth: 120
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 120,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={operationLogStatusMap[row.status].cssTag}
          effect="plain"
        >
          {operationLogStatusMap[row.status].label}
        </el-tag>
      )
    },
    {
      label: "状态名",
      prop: "statusStr",
      minWidth: 120,
      hide: true
    },
    {
      label: "操作时间",
      minWidth: 160,
      prop: "operationTime",
      sortable: "custom",
      formatter: ({ operationTime }) =>
        dayjs(operationTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
      slot: "operation"
    }
  ];

  async function onSearch() {
    // 点击搜索的时候 需要重置分页
    pagination.currentPage = 1;
    getOperationLogList();
  }

  function resetForm(formEl, tableRef) {
    if (!formEl) return;
    // 清空查询参数
    formEl.resetFields();
    // 清空排序
    searchFormParams.orderColumn = undefined;
    searchFormParams.orderDirection = undefined;
    // 清空时间查询  TODO  这块有点繁琐  有可以优化的地方吗？
    // Form组件的resetFields方法无法清除datepicker里面的数据。
    timeRange.value = [];
    searchFormParams.beginTime = undefined;
    searchFormParams.endTime = undefined;
    tableRef.getTableRef().clearSort();
    // 重置分页并查询
    onSearch();
  }

  async function getOperationLogList(sort: Sort = defaultSort) {
    pageLoading.value = true;
    if (sort != null) {
      CommonUtils.fillSortParams(searchFormParams, sort);
    }
    CommonUtils.fillPaginationParams(searchFormParams, pagination);
    CommonUtils.fillTimeRangeParams(searchFormParams, timeRange.value);

    const { data } = await getOperationLogListApi(toRaw(searchFormParams));
    dataList.value = data.rows;
    pagination.total = data.total;

    setTimeout(() => {
      pageLoading.value = false;
    }, 500);
  }

  async function handleDelete(row) {
    await deleteOperationLogApi([row.operationId]).then(() => {
      message(`您删除了操作编号为${row.operationId}的这条数据`, {
        type: "success"
      });
      // 刷新列表
      getOperationLogList();
    });
  }

  async function handleBulkDelete(tableRef) {
    if (multipleSelection.value.length === 0) {
      message("请选择需要删除的数据", { type: "warning" });
      return;
    }

    ElMessageBox.confirm(
      `确认要<strong>删除</strong>编号为<strong style='color:var(--el-color-primary)'>[ ${multipleSelection.value} ]</strong>的日志吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(async () => {
        await deleteOperationLogApi(multipleSelection.value).then(() => {
          message(`您删除了日志编号为[ ${multipleSelection.value} ]的数据`, {
            type: "success"
          });
          // 刷新列表
          getOperationLogList();
        });
      })
      .catch(() => {
        message("取消删除", {
          type: "info"
        });
        // 清空checkbox选择的数据
        tableRef.getTableRef().clearSelection();
      });
  }

  function openDialog(row) {
    addDialog({
      title: "日志详情",
      width: "60%",
      draggable: true,
      fullscreenIcon: false,
      closeOnClickModal: true,
      contentRenderer: () => h(descriptionForm, toRaw(row)),
      footerButtons: [
        {
          label: "关闭",
          text: true,
          size: "large",
          bg: true,
          btnClick: ({ dialog: { options, index } }) => {
            closeDialog(options, index);
          }
        }
      ]
    });
  }

  onMounted(() => {
    getOperationLogList();
  });

  return {
    searchFormParams,
    pageLoading,
    columns,
    dataList,
    pagination,
    defaultSort,
    timeRange,
    multipleSelection,
    onSearch,
    // exportExcel,
    getOperationLogList,
    resetForm,
    openDialog,
    handleDelete,
    handleBulkDelete
  };
}
