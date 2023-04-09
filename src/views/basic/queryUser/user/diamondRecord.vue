<template>
  <div>钻石记录-{{ id }}-{{ props.uid }}</div>
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
        value-format="x"
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
  </el-form>
  <pure-table :data="diamondTableData" :columns="columns" border stripe />
</template>

<script setup lang="ts">
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Search from '@iconify-icons/ep/search'
import { useRoute } from 'vue-router'

// import { diamondTableData } from './data'
import { useDiamondLog } from './userHook'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'DiamondRecord'
})

const route = useRoute()
// const router = useRouter()
const id = route.query?.id ? route.query?.id : route.params?.id

const props = defineProps(['uid'])
const { columns, form, loading, diamondTableData, onSearch } = useDiamondLog()
</script>

<style scoped></style>
