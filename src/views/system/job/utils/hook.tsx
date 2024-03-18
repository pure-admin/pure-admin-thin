import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import * as Job from "@/api/system/job";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import type { FormItemProps } from "../utils/types";
import { cloneDeep, isAllEmpty } from "@pureadmin/utils";
import { usePublicHooks } from "../../hooks";
import { ElMessageBox } from "element-plus";

export function useDept() {
  const form = reactive({
    name: "",
    enabled: null,
    createTime: ""
  });

  const formRef = ref();
  const dataList = reactive([]);
  const loading = ref(true);
  const multipleSelection = ref([]);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    total: 10,
    pageSize: 2,
    pageSizes: [10, 20, 50],
    currentPage: 1,
    align: "left",
    background: true
  });
  /** 表格索引 */
  const indexMethod = (index: number) => {
    return index + 1;
  };

  const columns: TableColumnList = [
    {
      type: "selection"
    },
    {
      type: "index",
      index: indexMethod
    },
    {
      label: "岗位名称",
      prop: "name",
      width: 180,
      align: "left"
    },
    {
      label: "排序",
      prop: "jobSort",
      minWidth: 70
    },
    {
      label: "状态",
      prop: "enabled",
      minWidth: 100,
      cellRenderer: scope => (
        <el-switch
          v-model={scope.row.enabled}
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.row.index]?.loading}
          style={switchStyle.value}
          inline-prompt
          active-value={true}
          inactive-value={false}
          active-text="启用"
          inactive-text="停用"
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "创建时间",
      minWidth: 200,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 160,
      slot: "operation"
    }
  ];

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const queryType = new Job.JobQueryCriteria();
    if (!isAllEmpty(form.name)) {
      queryType.name = form.name;
    }
    if (!isAllEmpty(form.enabled)) {
      queryType.enabled = form.enabled;
    }
    if (!isAllEmpty(form.createTime)) {
      queryType.createTime = form.createTime;
    }
    queryType.page = pagination.currentPage - 1;
    queryType.size = pagination.pageSize;
    const depts = (await Job.get(queryType)).data;
    pagination.total = depts.totalElements;
    let newData = depts.content;
    dataList.splice(0, dataList.length); // 清空数组
    newData.forEach(x => {
      dataList.push(x);
    });
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}岗位`,
      props: {
        formInline: {
          higherDeptOptions: cloneDeep(dataList),
          id: row?.id ?? 0,
          name: row?.name ?? "",
          jobSort: row?.jobSort ?? 0,
          principal: row?.principal ?? "",
          phone: row?.phone ?? "",
          email: row?.email ?? "",
          sort: row?.sort ?? 0,
          version: row?.version ?? 0,
          enabled: row?.enabled ?? false,
          remark: row?.remark ?? ""
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
          message(`您${title}了岗位名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              Job.add({
                name: curData.name,
                enabled: curData.enabled,
                version: curData.version,
                jobSort: curData.jobSort
              }).finally(() => chores());
            } else if (title === "编辑") {
              Job.edit({
                id: curData.id,
                name: curData.name,
                enabled: curData.enabled,
                version: curData.version,
                jobSort: curData.jobSort
              }).finally(() => chores());
            }
          }
        });
      }
    });
  }

  function handleDelete(row) {
    Job.del([row.id]).then(() => {
      message(`您删除了岗位名称为${row.name}的这条数据`, { type: "success" });
    });
    onSearch();
  }

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        !row.enabled ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.name
      }</strong>用户吗?`,
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
          Job.edit({
            id: row.id,
            name: row.name,
            enabled: row.enabled,
            version: row.version,
            jobSort: row.jobSort
          });
          message("已成功修改岗位状态", {
            type: "success"
          });
        }, 300);
      })
      .catch(() => {
        row.enabled ? (row.enabled = false) : (row.enabled = true);
      });
  }
  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }
  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    multipleSelection,
    pagination,
    /** 搜索 */
    onSearch,
    /** 重置 */
    resetForm,
    /** 新增、编辑岗位 */
    openDialog,
    /** 删除岗位 */
    handleDelete,
    handleSizeChange,
    handleCurrentChange
  };
}
