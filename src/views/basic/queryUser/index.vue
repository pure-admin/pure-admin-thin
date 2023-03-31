<script setup lang="ts">
import { ref } from 'vue'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Search from '@iconify-icons/ep/search'
// import Refresh from '@iconify-icons/ep/refresh'
import { useUser } from './indexHook'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'UserData'
})

const formRef = ref()
const {
  form,
  currentDayData,
  historicalData,
  currentDayColumns,
  historicalColumns,
  loading,
  onSearchHistory
} = useUser()
</script>

<template>
  <el-card shadow="never" class="card1">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 今日数据 </span>
      </div>
    </template>
    <pure-table :data="currentDayData" :columns="currentDayColumns" border />
    <el-divider />
    <p class="card-header font-bold pb-5">历史数据</p>
    <div class="w-[81%]">
      <el-form
        ref="formRef"
        :inline="true"
        :model="form"
        class="bg-bg_color w-[99/100]"
      >
        <el-form-item prop="date">
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="YYYY/MM/DD"
            value-format="x"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="useRenderIcon(Search)"
            :loading="loading"
            @click="onSearchHistory"
          >
            搜索
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <pure-table :data="historicalData" :columns="historicalColumns" border />
  </el-card>
</template>
