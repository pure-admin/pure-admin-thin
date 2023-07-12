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
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { useUserStoreHook } from "@/store/modules/user";

const noticeTypeMap = useUserStoreHook().dictionaryMap["sysNotice.noticeType"];
const noticeStatusMap = useUserStoreHook().dictionaryMap["sysNotice.status"];

export function useNoticeHook() {
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
    orderColumn: "createTime",
    orderDirection: "descending"
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

  async function handleDelete(row) {
    await deleteSystemNoticeApi([row.noticeId]).then(() => {
      message(`您删除了通知标题为${row.name}的这条数据`, { type: "success" });
      // 刷新列表
      onSearch();
    });
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
          onSearch();
        });
      })
      .catch(() => {
        message("取消删除", {
          type: "info"
        });
        tableRef.getTableRef().clearSelection();
      });
  }

  function handleSortChange(sort) {
    searchFormParams.pageNum = 1;
    searchFormParams.orderColumn = sort.prop;
    searchFormParams.orderDirection = sort.order;
    onSearch();
  }

  function handleSelectionChange(rows) {
    multipleSelection.value = rows.map(item => item.noticeId);
  }

  async function handleAdd(row, done) {
    await addSystemNoticeApi(row as SystemNoticeRequest).then(() => {
      message(`您新增了通知标题为${row.noticeTitle}的这条数据`, {
        type: "success"
      });
      // 关闭弹框
      done();
      // 刷新列表
      onSearch();
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
      onSearch();
    });
  }

  function handleSizeChange(val: number) {
    pagination.currentPage = 1;
    pagination.pageSize = val;
    searchFormParams.pageNum = pagination.currentPage;
    searchFormParams.pageSize = pagination.pageSize;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    searchFormParams.pageNum = pagination.currentPage;
    onSearch();
  }

  async function onSearch() {
    pageLoading.value = true;
    const { data } = await getSystemNoticeListApi(toRaw(searchFormParams));

    dataList.value = data.rows;
    pagination.total = data.total;

    setTimeout(() => {
      pageLoading.value = false;
    }, 500);
  }

  const resetForm = (formEl, tableRef) => {
    if (!formEl) return;
    formEl.resetFields();
    searchFormParams.orderColumn = "";
    searchFormParams.orderDirection = "";

    tableRef.getTableRef().clearSort();
    onSearch();
  };

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
    onSearch();
  });

  return {
    searchFormParams,
    pageLoading,
    columns,
    dataList,
    pagination,
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
