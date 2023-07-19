import dayjs from "dayjs";
import { message } from "@/utils/message";
import {
  OnlineUserQuery,
  getOnlineUserListApi,
  logoutOnlineUserApi
} from "@/api/system/monitor";
import { reactive, ref, onMounted, toRaw } from "vue";
import { PaginationProps } from "@pureadmin/table";
import { CommonUtils } from "@/utils/common";

export function useHook() {
  const pagination: PaginationProps = {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  };

  const timeRange = ref([]);

  const searchFormParams = reactive<OnlineUserQuery>({
    ipAddress: undefined,
    username: undefined
  });

  // 该分页使用前端分页   所以需要一个原始数组来保存原有数据
  let originalDataList = [];
  const dataList = ref([]);
  const pageLoading = ref(true);

  const columns: TableColumnList = [
    {
      label: "会话编号",
      prop: "tokenId",
      minWidth: 100
    },
    {
      label: "用户名",
      prop: "username",
      minWidth: 120
    },
    {
      label: "所属部门",
      prop: "deptName",
      minWidth: 120
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
      label: "登录时间",
      minWidth: 160,
      prop: "loginTime",
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

    pageLoading.value = true;

    const { data } = await getOnlineUserListApi(
      toRaw(searchFormParams)
    ).finally(() => {
      pageLoading.value = false;
    });

    originalDataList = data.rows;
    pagination.total = data.rows.length;

    getList();
  }

  function resetForm(formEl, tableRef) {
    if (!formEl) return;
    // 清空查询参数
    formEl.resetFields();
    tableRef.getTableRef().clearSort();
    pagination.currentPage = 1;
    // 重置分页并查询
    onSearch();
  }

  async function getList() {
    dataList.value = CommonUtils.paginateList(originalDataList, pagination);
  }

  async function handleLogout(row) {
    await logoutOnlineUserApi(row.tokenId).then(() => {
      message(`您强制登出了用户:${row.username}`, {
        type: "success"
      });
      // 刷新列表
      onSearch();
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
    timeRange,
    onSearch,
    getList,
    resetForm,
    handleLogout
  };
}
