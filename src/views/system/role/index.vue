<script setup lang="ts">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import Edit from "@iconify-icons/ep/edit";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Download from "@iconify-icons/ep/download";

defineOptions({
  name: "SystemRole"
});

const formRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  disabledDelete,
  disabledEdit,
  disabledEditFrom,
  onSearch,
  resetForm,
  openDialog,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange
} = useRole();
</script>

<template>
  <div class="main">
    <!-- 搜索状态栏 -->
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="角色名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入角色名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择状态"
          clearable
          class="!w-[180px]"
        >
          <el-option label="已启用" value="1" />
          <el-option label="已停用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('ri:search-line')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button
          type="info"
          :icon="useRenderIcon(Refresh)"
          @click="resetForm(formRef)"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <PureTableBar
      title="角色管理（仅演示，操作后不生效）"
      :columns="columns"
      @refresh="onSearch"
    >
      <!-- 表头按钮 -->
      <template #buttons>
        <el-button
          type="success"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          新增
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(Edit)"
          :disabled="disabledEdit"
          @click="openDialog('修改', disabledEditFrom)"
        >
          修改
        </el-button>
        <el-button
          type="danger"
          :icon="useRenderIcon(Delete)"
          :disabled="disabledDelete"
          @click="openDialog()"
        >
          删除
        </el-button>
        <el-button
          type="warning"
          :icon="useRenderIcon(Download)"
          @click="openDialog()"
        >
          导出
        </el-button>
      </template>
      <!-- 表格内容 -->
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          stripe
          :adaptiveConfig="{ offsetBottom: 108 }"
          :data="dataList"
          row-key="id"
          :columns="dynamicColumns"
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
          <!-- 表格数据操作按钮 -->
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(Edit)"
              @click="openDialog('修改', row)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`是否确认删除角色名称为${row.name}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="danger"
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

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
