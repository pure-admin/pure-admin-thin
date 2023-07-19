import dayjs from "dayjs";
import { message } from "@/utils/message";
import { ElMessageBox, Sort } from "element-plus";
import {
  getLoginLogListApi,
  deleteLoginLogApi,
  exportLoginLogExcelApi,
  LoginLogQuery
} from "@/api/system/log";
import { reactive, ref, onMounted, toRaw } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { CommonUtils } from "@/utils/common";
import { PaginationProps } from "@pureadmin/table";

const loginLogStatusMap =
  useUserStoreHook().dictionaryMap["sysLoginLog.status"];

export function useLoginLogHook() {
  const defaultSort: Sort = {
    prop: "loginTime",
    order: "descending"
  };

  const pagination: PaginationProps = {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  };

  const timeRange = ref([]);

  const searchFormParams = reactive<LoginLogQuery>({
    ipAddress: undefined,
    username: undefined,
    status: undefined,
    beginTime: undefined,
    endTime: undefined,
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
      label: "日志编号",
      prop: "logId",
      minWidth: 100
    },
    {
      label: "用户名",
      prop: "username",
      minWidth: 120,
      sortable: "custom"
    },
    {
      label: "IP地址",
      prop: "ipAddress",
      minWidth: 120
    },
    {
      label: "登录地点",
      prop: "loginLocation",
      minWidth: 120
    },
    {
      label: "操作系统",
      prop: "operationSystem",
      minWidth: 120
    },
    {
      label: "浏览器",
      prop: "browser",
      minWidth: 120
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 120,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={loginLogStatusMap[row.status].cssTag}
          effect="plain"
        >
          {loginLogStatusMap[row.status].label}
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
      label: "登录时间",
      minWidth: 160,
      prop: "loginTime",
      sortable: "custom",
      formatter: ({ loginTime }) =>
        dayjs(loginTime).format("YYYY-MM-DD HH:mm:ss")
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
    getLoginLogList();
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

  async function getLoginLogList(sort: Sort = defaultSort) {
    pageLoading.value = true;
    if (sort != null) {
      CommonUtils.fillSortParams(searchFormParams, sort);
    }
    CommonUtils.fillPaginationParams(searchFormParams, pagination);
    CommonUtils.fillTimeRangeParams(searchFormParams, timeRange.value);

    const { data } = await getLoginLogListApi(toRaw(searchFormParams)).finally(
      () => {
        pageLoading.value = false;
      }
    );
    dataList.value = data.rows;
    pagination.total = data.total;
  }

  async function exportAllExcel(sort: Sort = defaultSort) {
    if (sort != null) {
      CommonUtils.fillSortParams(searchFormParams, sort);
    }
    CommonUtils.fillPaginationParams(searchFormParams, pagination);
    CommonUtils.fillTimeRangeParams(searchFormParams, timeRange.value);

    exportLoginLogExcelApi(toRaw(searchFormParams), "登录日志.xls");
  }

  async function handleDelete(row) {
    await deleteLoginLogApi([row.logId]).then(() => {
      message(`您删除了操作编号为${row.logId}的这条数据`, {
        type: "success"
      });
      // 刷新列表
      getLoginLogList();
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
        await deleteLoginLogApi(multipleSelection.value).then(() => {
          message(`您删除了日志编号为[ ${multipleSelection.value} ]的数据`, {
            type: "success"
          });
          // 刷新列表
          getLoginLogList();
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

  onMounted(() => {
    getLoginLogList();
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
    exportAllExcel,
    // exportExcel,
    getLoginLogList,
    resetForm,
    handleDelete,
    handleBulkDelete
  };
}
