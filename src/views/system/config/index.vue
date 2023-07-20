<script setup lang="ts">
import { ref } from "vue";
import { useHook } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { useUserStoreHook } from "@/store/modules/user";

/** !!!重要!!! 组件name最好和菜单表中的router_name一致, copy的时候记得更改这个名字*/
defineOptions({
  name: "SystemConfig"
});

const yesOrNoList = useUserStoreHook().dictionaryList["common.yesOrNo"];
const tableRef = ref();

const searchFormRef = ref();
const {
  searchFormParams,
  pageLoading,
  columns,
  dataList,
  pagination,
  onSearch,
  resetForm,
  openDialog,
  handleRefresh,
  getList
} = useHook();
</script>

<template>
  <div class="main">
    <!-- 搜索栏 -->
    <el-form
      ref="searchFormRef"
      :inline="true"
      :model="searchFormParams"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="参数名称：" prop="configName">
        <el-input
          v-model="searchFormParams.configName"
          placeholder="请输入参数名称"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item label="参数键名：" prop="configKey">
        <el-input
          v-model="searchFormParams.configKey"
          placeholder="请输入参数键名"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>

      <el-form-item label="允许修改：" prop="isAllowChange">
        <el-select
          v-model="searchFormParams.isAllowChange"
          placeholder="请选择"
          clearable
          class="!w-[180px]"
        >
          <el-option
            v-for="dict in yesOrNoList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="pageLoading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button
          :icon="useRenderIcon(Refresh)"
          @click="resetForm(searchFormRef, tableRef)"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <!-- table bar 包裹  table -->
    <PureTableBar title="通知列表" :columns="columns" @refresh="onSearch">
      <!-- 表格操作栏 -->
      <template #buttons>
        <el-button
          type="warning"
          :icon="useRenderIcon(AddFill)"
          @click="handleRefresh()"
        >
          刷新缓存
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <!-- TODO sort-change 有其他好的处理方式吗？ -->
        <pure-table
          border
          ref="tableRef"
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="pageLoading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="getList"
          @page-current-change="getList"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog(row)"
            >
              修改
            </el-button>
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

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
