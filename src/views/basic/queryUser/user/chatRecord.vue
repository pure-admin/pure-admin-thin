<template>
  <div>聊天记录-{{ id }}-{{ props.uid }}</div>
  <el-form
    ref="formRef"
    :inline="true"
    :model="form"
    class="bg-bg_color w-[99/100]"
  >
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
        @click="onSearch"
      >
        搜索
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :icon="useRenderIcon(Search)"
        :loading="loading"
        @click="onSearch"
      >
        导出
      </el-button>
    </el-form-item>
  </el-form>

  <pure-table :data="chatTableData" :columns="columns" border stripe />
</template>

<script setup lang="ts">
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Search from '@iconify-icons/ep/search'
import { useRoute } from 'vue-router'

import { useChatLog } from './userHook'
// import { chatTableData } from './data'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'ChatRecord'
})

const props = defineProps(['uid'])

const route = useRoute()
// const router = useRouter()
const id = route.query?.id ? route.query?.id : route.params?.id

const { columns, form, loading, chatTableData, onSearch } = useChatLog()
</script>

<style scoped></style>
