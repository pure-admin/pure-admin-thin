<script setup lang="ts">
import { ref } from "vue";
import { useDept } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import datePicker from "@/views/components/date-picker.vue";
import * as Job from "@/api/system/job";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";

defineOptions({
  name: "Dept"
});

const handleSelectionChange = val => {
  multipleSelection.value = val;
  if (val != null && val.length > 0) {
    value2.value = false;
  } else {
    value2.value = true;
  }
};

async function deleteAll() {
  ElMessageBox.confirm(
    `确认要<strong>删除所选的</strong><strong style='color:var(--el-color-primary)'>${multipleSelection.value.length}</strong>个岗位吗?`,
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
      Job.del(multipleSelection.value.map(dept => dept.id)).then(() => {
        message("已删除所选的岗位", {
          type: "success"
        });
        onSearch();
      });
    })
    .catch(() => {
      onSearch();
    });
}
const exportClick = async () => {
  const response: Blob = await Job.download(null);
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(response); // 创建媒体流 url ，详细了解可自己查 URL.createObjectURL（推荐 MDN ）

  a.href = url;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.parentNode.removeChild(a);
  window.URL.revokeObjectURL(url); // 删除创建的媒体流 url 对象
  message("导出成功", {
    type: "success"
  });
};
const formRef = ref();
const tableRef = ref();
const value2 = ref(true);
const {
  form,
  loading,
  columns,
  dataList,
  multipleSelection,
  pagination,
  onSearch,
  resetForm,
  openDialog,
  handleDelete,
  handleSizeChange,
  handleCurrentChange
} = useDept();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="岗位名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入岗位名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.enabled"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="启用" :value="true" />
          <el-option label="停用" :value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="createTime">
        <datePicker v-model="form.createTime" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('search')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="岗位列表"
      :columns="columns"
      :tableRef="tableRef?.getTableRef()"
      @refresh="onSearch"
    >
      <template #add>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          新增岗位
        </el-button>
      </template>
      <template #delete>
        <el-button
          type="danger"
          :disabled="value2"
          :icon="useRenderIcon(Delete)"
          @click="deleteAll()"
        >
          删除岗位
        </el-button>
      </template>
      <template #export>
        <el-button
          type="success"
          :icon="useRenderIcon('solar:upload-bold')"
          @click="exportClick()"
        >
          导出数据
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          adaptive
          :adaptiveConfig="{ offsetBottom: 32 }"
          align-whole="center"
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          default-expand-all
          :loading="loading"
          :size="size"
          :columns="dynamicColumns"
          :data="dataList"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('编辑', row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`是否确认删除岗位名称为${row.name}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style lang="scss" scoped>
.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
