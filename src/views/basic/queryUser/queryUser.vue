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

const formRef = ref()
const { form, historicalData, historicalColumns, loading, onSearchUser } =
  useUser()
</script>

<template>
  <el-card shadow="never" class="card1">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 搜索用户 </span>
      </div>
    </template>
    <div>
      <el-form
        ref="formRef"
        :inline="true"
        :model="form"
        class="bg-bg_color w-[99/100]"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            clearable
            class="!w-[160px]"
          />
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="手机号码"
            clearable
            class="!w-[160px]"
          />
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
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
            value-format="YYYY-MM-DD"
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
    </div>
    <pure-table :data="historicalData" :columns="historicalColumns" border />
    <!-- <el-button>
      <router-link :to="{ name: 'UserInfo', params: { id: 12318 } }"
        >User</router-link
      >
    </el-button> -->
    <div class="flex flex-wrap items-center">
      <p>params传参模式：</p>
      <el-button
        class="m-2"
        v-for="index in 6"
        :key="index"
        @click="toDetail(index, 'params')"
      >
        打开{{ index }}详情页
      </el-button>
    </div>
  </el-card>
</template>
