import dayjs from "dayjs";
import editForm from "../form.vue";
import { setDisabledForTreeOptions, handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import {
  DeptDTO,
  DeptRequest,
  addDeptApi,
  deleteDeptApi,
  getDeptInfoApi,
  getDeptListApi,
  updateDeptApi
} from "@/api/system/dept";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, h, computed } from "vue";
import { isAllEmpty } from "@pureadmin/utils";

export function useHook() {
  const searchFormParams = reactive({
    deptName: "",
    status: null
  });

  const formRef = ref();

  const originalDataList = ref([]);
  const dataList = computed(() => {
    let filterDataList = [...originalDataList.value];
    if (!isAllEmpty(searchFormParams.deptName)) {
      // 前端搜索部门名称
      filterDataList = filterDataList.filter((item: DeptDTO) =>
        item.deptName.includes(searchFormParams.deptName)
      );
    }
    if (!isAllEmpty(searchFormParams.status)) {
      // 前端搜索状态
      filterDataList = filterDataList.filter(
        (item: DeptDTO) => item.status === searchFormParams.status
      );
    }
    // 处理成树结构
    return [...handleTree(filterDataList)];
  });
  const loading = ref(true);
  const { tagStyle } = usePublicHooks();

  const columns: TableColumnList = [
    {
      label: "部门名称",
      prop: "deptName",
      width: 240,
      align: "left"
    },
    {
      label: "部门编号",
      prop: "id",
      width: 100,
      align: "center"
    },

    {
      label: "部门负责人",
      prop: "leaderName",
      minWidth: 70
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status)}>
          {row.status === 1 ? "启用" : "停用"}
        </el-tag>
      )
    },
    {
      label: "排序",
      prop: "orderNum",
      minWidth: 70
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
      width: 240,
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
    // 这里是返回一维数组结构，前端自行处理成树结构，返回格式要求：唯一id加父节点parentId，parentId取父节点id
    const { data } = await getDeptListApi().finally(() => {
      loading.value = false;
    });
    originalDataList.value = data;
  }

  async function handleAdd(row, done) {
    await addDeptApi(row).then(() => {
      message(`您新增了部门:${row.deptName}`, {
        type: "success"
      });
      // 关闭弹框
      done();
      // 刷新列表
      onSearch();
    });
  }

  async function handleUpdate(row, done) {
    await updateDeptApi(row.id, row).then(() => {
      message(`您更新了部门${row.deptName}`, {
        type: "success"
      });
      // 关闭弹框
      done();
      // 刷新列表
      onSearch();
    });
  }

  async function openDialog(title = "新增", row?: DeptDTO) {
    const { data } = await getDeptListApi();
    const treeList = setDisabledForTreeOptions(handleTree(data), "status");

    if (title === "编辑") {
      row = (await getDeptInfoApi(row.id + "")).data;
    }

    // TODO 为什么声明一个formInline变量,把变量填充进去，  再给props.formInline 结果就不生效
    addDialog({
      title: `${title}部门`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          parentId: row?.parentId ?? 0,
          deptName: row?.deptName ?? "",
          leaderName: row?.leaderName ?? "",
          phone: row?.phone ?? "",
          email: row?.email ?? "",
          orderNum: row?.orderNum ?? 0,
          status: row?.status ?? 1
        },
        higherDeptOptions: [...treeList]
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as DeptRequest;

        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              handleAdd(curData, done);
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              handleUpdate(curData, done);
            }
          }
        });
      }
    });
  }

  async function handleDelete(row) {
    await deleteDeptApi(row.id).then(() => {
      message(`您删除了部门${row.deptName}`, { type: "success" });
      // 刷新列表
      onSearch();
    });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    searchFormParams,
    loading,
    columns,
    dataList,
    onSearch,
    resetForm,
    openDialog,
    handleDelete
  };
}
