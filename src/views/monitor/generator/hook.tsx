import dayjs from "dayjs";
import { message } from "@/utils/message";
import { CRUD } from "@/api/utils";
import { download, sync } from "@/api/generator/generator";
import { reactive, ref, onMounted, toRaw } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import { isString, isEmpty } from "@pureadmin/utils";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import {
  useRouter,
  useRoute,
  type LocationQueryRaw,
  type RouteParamsRaw,
  type RouteRecordName
} from "vue-router";

export function useRole() {
  const form = reactive({
    username: "",
    tableName: "",
    size: 10,
    page: 0
  });
  const dataList = ref([]);
  const changeList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    pageSizes: [10, 20, 50],
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "表名",
      prop: "tableName",
      minWidth: 100
    },
    {
      label: "数据库引擎",
      prop: "engine",
      minWidth: 140
    },
    {
      label: "字符编码集",
      prop: "coding",
      minWidth: 140
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 100
    },
    {
      label: "创建日期",
      prop: "createTime",
      minWidth: 180,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
    }
  ];

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val.length);
    changeList.value = val.map(person => person.tableName);
  }

  function handleOffline(row) {
    message(`${row.username}已被强制下线`, { type: "success" });
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const forms = toRaw(form);
    forms.page = pagination.currentPage - 1;
    forms.size = pagination.pageSize;
    const { data } = await CRUD.get("generator/tables", {
      params: forms
    });
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

  const downloadCode = name => {
    download(name).then(data => {
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(data); // 创建媒体流 url ，详细了解可自己查 URL.createObjectURL（推荐 MDN ）

      // 创建一个 a 标签，并设置其 href 属性和显示样式
      a.href = url;
      a.style.display = "none";
      a.download = name + ".zip";
      document.body.appendChild(a);
      a.click();
      // 点击 a 标签后，移除 a 标签
      a.parentNode.removeChild(a);
      // 释放对象 URL，避免内存泄漏
      window.URL.revokeObjectURL(url); // 删除创建的媒体流 url 对象
      message("导出成功", {
        type: "success"
      });
    });
  };

  const syncCode = () => {
    sync(changeList.value).then(() => {
      message("同步成功", {
        type: "success"
      });
      onSearch();
    });
  };

  onMounted(() => {
    onSearch();
  });

  const dataList1 = ref([]);

  const columns1: TableColumnList = [
    {
      type: "index",
      label: "index",
      hide: true,
      prop: "index"
    },
    {
      label: "字段名称",
      prop: "columnName"
    },
    {
      label: "字段类型",
      prop: "columnType"
    },
    {
      label: "字段描述",
      prop: "remark",
      cellRenderer: ({ row }) => <el-input v-model={row.remark} />
    },
    {
      label: "必填",
      prop: "notNull",
      cellRenderer: ({ row }) => <el-checkbox v-model={row.notNull} />
    },
    {
      label: "列表",
      prop: "listShow",
      cellRenderer: ({ row }) => <el-checkbox v-model={row.listShow} />
    },
    {
      label: "表单",
      prop: "formShow",
      cellRenderer: ({ row }) => <el-checkbox v-model={row.formShow} />
    },
    {
      label: "表单类型",
      prop: "formType",
      cellRenderer: ({ row }) => (
        <el-select
          v-model={row.formType}
          filterable
          clearable
          size="small"
          placeholder="请选择"
        >
          <el-option label="文本框" value="Input" />
          <el-option label="文本域" value="Textarea" />
          <el-option label="单选框" value="Radio" />
          <el-option label="下拉框" value="Select" />
          <el-option label="日期框" value="Date" />
        </el-select>
      )
    },
    {
      label: "查询方式",
      prop: "queryType",
      cellRenderer: ({ row }) => (
        <el-select
          v-model={row.queryType}
          filterable
          clearable
          size="small"
          placeholder="请选择"
        >
          <el-option label="=" value="=" />
          <el-option label="!=" value="!=" />
          <el-option label=">=" value=">=" />
          <el-option label="<=" value="<=" />
          <el-option label="Like" value="Like" />
          <el-option label="NotNull" value="NotNull" />
          <el-option label="BetWeen" value="BetWeen" />
        </el-select>
      )
    },
    {
      label: "日期注解",
      prop: "dateAnnotation",
      cellRenderer: ({ row }) => (
        <el-select
          v-model={row.dateAnnotation}
          filterable
          clearable
          size="small"
          placeholder="请选择"
        >
          <el-option label="自动创建时间" value="CreationTimestamp" />
          <el-option label="自动更新时间" value="UpdateTimestamp" />
        </el-select>
      ),
      minWidth: 110
    },
    {
      label: "关联字典",
      prop: "dictName",
      cellRenderer: ({ row }) => (
        <el-date-picker
          v-model={row.date}
          type="date"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          placeholder="请选择日期"
        />
      ),
      minWidth: 110
    },
    {
      label: "操作",
      fixed: "right",
      width: 90,
      slot: "operation"
    }
  ];

  function onAdd() {
    dataList1.value.push({
      id: dataList1.value.length + 1,
      columnName: "字段名称",
      columnType: "字段类型",
      remark: "字段描述",
      notNull: true,
      listShow: false,
      formShow: true,
      formType: "Textarea",
      sex: 0,
      hobby: "",
      date: ""
    });
  }

  function onDel(row) {
    const index = dataList1.value.indexOf(row);
    if (index !== -1) dataList1.value.splice(index, 1);
  }

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    changeList,
    columns1,
    dataList1,
    onAdd,
    onDel,
    onSearch,
    resetForm,
    handleOffline,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    downloadCode,
    syncCode
  };
}

export function useDetail() {
  const route = useRoute();
  const router = useRouter();
  const getParameter = isEmpty(route.params) ? route.query : route.params;

  function toDetail(
    parameter: RouteRecordName | LocationQueryRaw | RouteParamsRaw | any
  ) {
    // ⚠️ 这里要特别注意下，因为vue-router在解析路由参数的时候会自动转化成字符串类型，比如在使用useRoute().route.query或useRoute().route.params时，得到的参数都是字符串类型
    // 所以在传参的时候，如果参数是数字类型，就需要在此处 toString() 一下，保证传参跟路由参数类型一致都是字符串，这是必不可少的环节！！！
    Object.keys(parameter).forEach(param => {
      if (!isString(parameter[param])) {
        parameter[param] = parameter[param].toString();
      }
    });
    // 保存信息到标签页
    useMultiTagsStoreHook().handleTags("push", {
      path: `/monitor/generator/${parameter.path}`,
      name: parameter.name,
      query: parameter,
      meta: {
        title: {
          zh: `${parameter.id} - ${parameter.title}`,
          en: `No.${parameter.id} - DetailInfo`
        },
        // 如果使用的是非国际化精简版title可以像下面这么写
        // title: `No.${index} - 详情信息`,
        // 最大打开标签数
        dynamicLevel: 3
      }
    });
    // 路由跳转
    router.push({ name: parameter.name, query: parameter });
  }

  // 用于页面刷新，重新获取浏览器地址栏参数并保存到标签页
  const initToDetail = () => {
    if (getParameter) toDetail(getParameter);
  };

  return { toDetail, initToDetail, getParameter, router };
}
