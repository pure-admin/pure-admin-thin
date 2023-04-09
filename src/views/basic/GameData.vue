<script setup lang="ts">
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Search from '@iconify-icons/ep/search'

import { ref, onMounted } from 'vue'
import { getTableData } from '@/api/tableData'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'GameData'
})
const headerStyle = {
  background: 'var(--el-table-row-hover-bg-color)',
  color: 'var(--el-text-color-primary)'
}

const gamePlayColumns = [
  { label: '时间', prop: 'date' },
  { label: 'NLH', prop: 'nlh' },
  { label: 'PLO4', prop: 'plo4' },
  { label: 'PLO5', prop: 'plo5' },
  { label: 'PLO6', prop: 'plo6' },
  { label: '总计', prop: 'total' }
]
const blindLevelColumns = {
  nlh: [
    { label: 'NLH盲注', prop: 'blind' },
    { label: '牌桌总数', prop: 'table_count' },
    { label: '上桌总数', prop: 'player_count' }
  ],
  plo4: [
    { label: 'PLO4盲注', prop: 'blind' },
    { label: '牌桌总数', prop: 'table_count' },
    { label: '上桌总数', prop: 'player_count' }
  ],
  plo5: [
    { label: 'PLO5盲注', prop: 'blind' },
    { label: '牌桌总数', prop: 'table_count' },
    { label: '上桌总数', prop: 'player_count' }
  ],
  plo6: [
    { label: 'PLO6盲注', prop: 'blind' },
    { label: '牌桌总数', prop: 'table_count' },
    { label: '上桌总数', prop: 'player_count' }
  ]
}

const gamePlayTableData = ref([])
const blindLevelTableData = ref({
  nlh: [],
  plo4: [],
  plo5: [],
  plo6: []
})

const form = ref({
  dateRange: ''
})
const loading = ref(true)

function onSearch() {
  const params = { page: 2, per_page: 5 }
  getTableData(params).then(res => {
    console.log('getTableData', res)
    loading.value = false
    const { data } = res
    gamePlayTableData.value = data.dates
    blindLevelTableData.value = data.blinds
  })
}

onMounted(() => {
  onSearch()
})
</script>

<template>
  <el-card>
    <h1>牌局数据</h1>
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

    <h3>按玩法</h3>
    <div class="w-3/4">
      <pure-table
        :data="gamePlayTableData"
        :columns="gamePlayColumns"
        :header-cell-style="headerStyle"
        border
        stripe
      />
    </div>

    <el-divider />

    <h3>按级别</h3>
    <div class="grid grid-cols-4 gap-4">
      <pure-table
        :data="blindLevelTableData.nlh"
        :columns="blindLevelColumns.nlh"
        :header-cell-style="headerStyle"
        border
        stripe
      />
      <pure-table
        :data="blindLevelTableData.plo4"
        :columns="blindLevelColumns.plo4"
        :header-cell-style="headerStyle"
        border
        stripe
      />
      <pure-table
        :data="blindLevelTableData.plo5"
        :columns="blindLevelColumns.plo5"
        :header-cell-style="headerStyle"
        border
        stripe
      />
      <pure-table
        :data="blindLevelTableData.plo6"
        :columns="blindLevelColumns.plo6"
        :header-cell-style="headerStyle"
        border
        stripe
      />
    </div>
  </el-card>
</template>
