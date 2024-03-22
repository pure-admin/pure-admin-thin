<script setup lang="ts">
import { ref } from "vue";
import { useRole, useDetail } from "./hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Refresh from "@iconify-icons/ep/refresh";

defineOptions({
  name: "OnlineUser"
});

const { toDetail } = useDetail();
const formRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  changeList,
  onSearch,
  resetForm,
  handleOffline,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  downloadCode,
  syncCode
} = useRole();
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="表名" prop="tableName">
        <el-input
          v-model="form.tableName"
          placeholder="请输入表名"
          clearable
          class="!w-[180px]"
        />
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
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="代码生成" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="success"
          :icon="useRenderIcon(Refresh)"
          :disabled="changeList.length <= 0"
          @click="syncCode"
        >
          同步
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          adaptive
          :adaptiveConfig="{ offsetBottom: 45 }"
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          default-expand-all
          stripe
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <div :style="{ width: '100%', 'margin-left': '-15px' }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                @click="
                  toDetail({
                    id: row.tableName,
                    name: 'TabQueryDetail',
                    path: 'query-detail',
                    title: '预览'
                  })
                "
              >
                预览
              </el-button>
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                @click="downloadCode(row.tableName)"
              >
                下载
              </el-button>
              <el-button
                class="reset-margin"
                link
                type="primary"
                :size="size"
                @click="
                  toDetail({
                    id: row.tableName,
                    name: 'TabQueryPreview',
                    path: 'preview',
                    title: '配置'
                  })
                "
              >
                配置
              </el-button>
              <el-button class="reset-margin" link type="primary" :size="size">
                生成
              </el-button>
            </div>
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
