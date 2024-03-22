<script setup lang="ts">
import { useRole, useDetail } from "./hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Empty from "../empty.svg?component";
import AddFill from "@iconify-icons/ep/plus";
import Delete from "@iconify-icons/ep/delete";

defineOptions({
  name: "TabQueryPreview"
});
const { initToDetail, getParameter } = useDetail();
initToDetail();
const { columns1, dataList1, onAdd, onDel } = useRole();
</script>

<template>
  <div class="flex">
    <!-- <div>{{ getParameter }}</div> -->
    <el-scrollbar height="540px">
      <code>
        <pre class="w-[400px]"> {{ dataList1 }}</pre>
      </code>
    </el-scrollbar>
    <pure-table
      row-key="id"
      align-whole="center"
      :header-cell-style="{
        background: 'var(--el-fill-color-light)',
        color: 'var(--el-text-color-primary)'
      }"
      :data="dataList1"
      :columns="columns1"
    >
      <template #empty>
        <Empty fill="var(--el-svg-monochrome-grey)" class="m-auto" />
      </template>
      <template #append>
        <el-button
          plain
          class="w-full my-2"
          :icon="useRenderIcon(AddFill)"
          @click="onAdd"
        >
          添加一行数据
        </el-button>
      </template>
      <template #operation="{ row }">
        <el-button
          class="reset-margin"
          link
          type="primary"
          :icon="useRenderIcon(Delete)"
          @click="onDel(row)"
        />
      </template>
    </pure-table>
  </div>
</template>

<style scoped>
:deep(.el-table__inner-wrapper::before) {
  height: 0;
}
</style>
