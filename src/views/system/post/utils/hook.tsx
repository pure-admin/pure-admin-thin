import dayjs from "dayjs";
import { message } from "@/utils/message";
import { ElMessageBox, Sort } from "element-plus";
import { reactive, ref, onMounted, toRaw, computed } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { CommonUtils } from "@/utils/common";
import { PaginationProps } from "@pureadmin/table";
import {
  PostListCommand,
  getPostListApi,
  exportPostExcelApi,
  deletePostApi
} from "@/api/system/post";

const statusMap = useUserStoreHook().dictionaryMap["common.status"];

export function usePostHook() {
  const defaultSort: Sort = {
    prop: "createTime",
    order: "descending"
  };

  const pagination: PaginationProps = {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  };

  const timeRange = computed<[string, string] | null>({
    get() {
      if (searchFormParams.beginTime && searchFormParams.endTime) {
        return [searchFormParams.beginTime, searchFormParams.endTime];
      } else {
        return null;
      }
    },
    set(v) {
      if (v?.length === 2) {
        searchFormParams.beginTime = v[0];
        searchFormParams.endTime = v[1];
      } else {
        searchFormParams.beginTime = undefined;
        searchFormParams.endTime = undefined;
      }
    }
  });

  const searchFormParams = reactive<PostListCommand>({
    postCode: "",
    postName: "",
    status: undefined
  });

  const dataList = ref([]);
  const pageLoading = ref(true);
  const multipleSelection = ref([]);
  const sortState = ref<Sort>(defaultSort);

  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "岗位编号",
      prop: "postId",
      minWidth: 100
    },
    {
      label: "岗位编码",
      prop: "postCode",
      minWidth: 120
    },
    {
      label: "岗位名称",
      prop: "postName",
      minWidth: 120
    },
    {
      label: "岗位排序",
      prop: "postSort",
      minWidth: 120
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 120,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={statusMap[row.status].cssTag}
          effect="plain"
        >
          {statusMap[row.status].label}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      minWidth: 160,
      prop: "createTime",
      sortable: "custom",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
      slot: "operation"
    }
  ];

  function onSortChanged(sort: Sort) {
    sortState.value = sort;
    onSearch();
  }

  async function onSearch() {
    // 点击搜索的时候 需要重置分页
    pagination.currentPage = 1;
    getPostList();
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
    searchFormParams.beginTime = undefined;
    searchFormParams.endTime = undefined;
    tableRef.getTableRef().clearSort();
    // 重置分页并查询
    onSearch();
  }

  async function getPostList(sort: Sort = defaultSort) {
    pageLoading.value = true;
    if (sort != null) {
      CommonUtils.fillSortParams(searchFormParams, sort);
    }
    CommonUtils.fillPaginationParams(searchFormParams, pagination);

    const { data } = await getPostListApi(toRaw(searchFormParams)).finally(
      () => {
        pageLoading.value = false;
      }
    );
    dataList.value = data.rows;
    pagination.total = data.total;
  }

  async function exportAllExcel() {
    if (sortState.value != null) {
      CommonUtils.fillSortParams(searchFormParams, sortState.value);
    }
    CommonUtils.fillPaginationParams(searchFormParams, pagination);
    CommonUtils.fillTimeRangeParams(searchFormParams, timeRange.value);

    exportPostExcelApi(toRaw(searchFormParams), "岗位数据.xls");
  }

  async function handleDelete(row) {
    await deletePostApi([row.logId]).then(() => {
      message(`您删除了操作编号为${row.logId}的这条数据`, {
        type: "success"
      });
      // 刷新列表
      getPostList();
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
        await deletePostApi(multipleSelection.value).then(() => {
          message(`您删除了日志编号为[ ${multipleSelection.value} ]的数据`, {
            type: "success"
          });
          // 刷新列表
          getPostList();
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

  onMounted(getPostList);

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
    onSortChanged,
    exportAllExcel,
    // exportExcel,
    getPostList,
    resetForm,
    handleDelete,
    handleBulkDelete
  };
}
