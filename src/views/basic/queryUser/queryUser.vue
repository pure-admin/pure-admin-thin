<script setup lang="ts">
import { ref } from 'vue'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Search from '@iconify-icons/ep/search'
// import Refresh from '@iconify-icons/ep/refresh'
import { useUser } from './queryUserHook'
import { useDetail } from './infoHook'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'QueryUser'
})

const { toDetail, router } = useDetail()
console.log('router:', router)

const formRef = ref()
const {
  form,
  historicalData,
  historicalColumns,
  loading,
  pagination_pure,
  onSearchUser,
  handleSizeChange,
  handleCurrentChange
  // handleClick
} = useUser()
</script>

<template>
  <el-card shadow="never" class="card1">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 搜索用户 </span>
      </div>
    </template>

    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color w-[99/100]"
    >
      <el-form-item prop="username">
        <el-input
          v-model="form.user_name"
          placeholder="用户名"
          clearable
          class="!w-[160px]"
        />
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input
          v-model="form.user_phone"
          placeholder="手机号码"
          clearable
          class="!w-[160px]"
        />
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="form.user_email"
          placeholder="邮箱"
          clearable
          class="!w-[200px]"
        />
      </el-form-item>
      <el-form-item prop="dateRange">
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
          @click="onSearchUser"
        >
          搜索
        </el-button>
      </el-form-item>
    </el-form>

    <pure-table
      :data="historicalData"
      :columns="historicalColumns"
      :loading="loading"
      :pagination="pagination_pure"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      border
    >
      <template #operation="{ row }">
        <el-button
          link
          type="primary"
          size="small"
          @click="toDetail(row.uid, 'query')"
        >
          {{ row.uid }}
        </el-button>
      </template>
    </pure-table>
  </el-card>
</template>
