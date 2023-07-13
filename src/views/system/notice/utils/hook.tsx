import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getSystemNoticeListApi } from "@/api/system";
import { addDialog } from "@/components/ReDialog";
import { ElMessageBox } from "element-plus";
import { AddNoticeRequest } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import {
  addSystemNoticeApi,
  updateSystemNoticeApi,
  deleteSystemNoticeApi,
  SystemNoticeRequest
} from "@/api/system";
import { reactive, ref, onMounted, h, toRaw, watchEffect } from "vue";
import { useUserStoreHook } from "@/store/modules/user";

const noticeTypeMap = useUserStoreHook().dictionaryMap["sysNotice.noticeType"];
const noticeStatusMap = useUserStoreHook().dictionaryMap["sysNotice.status"];

export function useNoticeHook() {
  const defaultSort = {
    prop: "createTime",
    order: "descending"
  };

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const searchFormParams = reactive({
    noticeTitle: "",
    noticeType: "",
    creatorName: "",
    pageNum: pagination.currentPage,
    pageSize: pagination.pageSize,
    orderColumn: defaultSort.prop,
    orderDirection: defaultSort.order
  });

  watchEffect(() => {
    searchFormParams.pageNum = pagination.currentPage;
    searchFormParams.pageSize = pagination.pageSize;
  });

  const formRef = ref();
  const dataList = ref([]);
  const pageLoading = ref(true);
  const multipleSelection = ref([]);

  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "通知编号",
      prop: "noticeId",
      minWidth: 100
    },
    {
      label: "通知标题",
      prop: "noticeTitle",
      minWidth: 120
    },
    {
      label: "通知类型",
      prop: "noticeType",
      minWidth: 120,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={noticeTypeMap[row.noticeType].cssTag}
          effect="plain"
        >
          {noticeTypeMap[row.noticeType].label}
        </el-tag>
      )
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 120,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={noticeStatusMap[row.status].cssTag}
          effect="plain"
        >
          {noticeStatusMap[row.status].label}
        </el-tag>
      )
    },
    {
      label: "通知详情",
      prop: "noticeContent",
      minWidth: 150
    },
    {
      label: "创建者",
      prop: "creatorName",
      minWidth: 120
    },
    {
      label: "创建时间",
      minWidth: 180,
      prop: "createTime",
      sortable: "custom",
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

  async function onSearch() {
    // 点击搜索的时候 需要重置分页
    pagination.currentPage = 1;
    getNoticeList();
  }

  function resetForm(formEl, tableRef) {
    if (!formEl) return;
    // 清空查询参数
    formEl.resetFields();
    // 清空排序
    searchFormParams.orderColumn = "";
    searchFormParams.orderDirection = "";
    tableRef.getTableRef().clearSort();
    // 重置分页并查询
    onSearch();
  }

  async function getNoticeList() {
    pageLoading.value = true;
    const { data } = await getSystemNoticeListApi(toRaw(searchFormParams));

    dataList.value = data.rows;
    pagination.total = data.total;

    setTimeout(() => {
      pageLoading.value = false;
    }, 500);
  }

  async function handleDelete(row) {
    await deleteSystemNoticeApi([row.noticeId]).then(() => {
      message(`您删除了通知标题为${row.name}的这条数据`, { type: "success" });
      // 刷新列表
      getNoticeList();
    });
  }

  function handleSelectionChange(rows) {
    multipleSelection.value = rows.map(item => item.noticeId);
  }

  async function handleBulkDelete(tableRef) {
    if (multipleSelection.value.length === 0) {
      message("请选择需要删除的数据", { type: "warning" });
      return;
    }

    ElMessageBox.confirm(
      `确认要<strong>删除</strong>编号为<strong style='color:var(--el-color-primary)'>[ ${multipleSelection.value} ]</strong>的通知吗?`,
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
        await deleteSystemNoticeApi(multipleSelection.value).then(() => {
          message(`您删除了通知编号为[ ${multipleSelection.value} ]的条数据`, {
            type: "success"
          });
          // 刷新列表
          getNoticeList();
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

  /**
   * 处理排序
   * @param sort 排序参数
   */
  function handleSortChange(sort) {
    // 排序参数改变建议把分页重置为第一页
    pagination.currentPage = 1;
    // 填充分页参数
    searchFormParams.orderColumn = sort.prop;
    searchFormParams.orderDirection = sort.order;
    getNoticeList();
  }

  async function handleAdd(row, done) {
    await addSystemNoticeApi(row as SystemNoticeRequest).then(() => {
      message(`您新增了通知标题为${row.noticeTitle}的这条数据`, {
        type: "success"
      });
      // 关闭弹框
      done();
      // 刷新列表
      getNoticeList();
    });
  }

  async function handleUpdate(row, done) {
    await updateSystemNoticeApi(row as SystemNoticeRequest).then(() => {
      message(`您新增了通知标题为${row.noticeTitle}的这条数据`, {
        type: "success"
      });
      // 关闭弹框
      done();
      // 刷新列表
      getNoticeList();
    });
  }

  function handleSizeChange(val: number) {
    pagination.currentPage = 1;
    pagination.pageSize = val;
    getNoticeList();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    getNoticeList();
  }

  function openDialog(title = "新增", row?: AddNoticeRequest) {
    addDialog({
      title: `${title}公告`,
      props: {
        formInline: {
          noticeTitle: row?.noticeTitle ?? "",
          noticeType: row?.noticeType ?? "",
          status: row?.status ?? "",
          noticeContent: row?.noticeContent ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const formRuleRef = formRef.value.getFormRuleRef();

        const curData = options.props.formInline as AddNoticeRequest;

        formRuleRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              handleAdd(curData, done);
            } else {
              curData.noticeId = row.noticeId;
              handleUpdate(curData, done);
            }
          }
        });
      }
    });
  }

  onMounted(() => {
    getNoticeList();
  });

  return {
    searchFormParams,
    pageLoading,
    columns,
    dataList,
    pagination,
    defaultSort,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSortChange,
    handleSelectionChange,
    handleBulkDelete
  };
}
