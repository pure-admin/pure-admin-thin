<template>
  <div>游戏记录-{{ id }}-{{ props.uid }}</div>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="牌局记录" name="first">
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
            @click="onSearchUser"
          >
            搜索
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            :icon="useRenderIcon(Search)"
            :loading="loading"
            @click="onSearchUser"
          >
            导出
          </el-button>
        </el-form-item>
      </el-form>

      <pure-table :data="tableData" :columns="tableRecordColumn" border />
    </el-tab-pane>

    <el-tab-pane label="手牌历史" name="second">
      <el-table :data="handsData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <div class="mb-4">
              <p class="t-0 mb-2">State: {{ props.row.state }}</p>
              <p class="t-0 mb-2">City: {{ props.row.city }}</p>
              <p class="t-0 mb-2">Address: {{ props.row.address }}</p>
              <p class="t-0 mb-2">Zip: {{ props.row.zip }}</p>
              <h3 class="mt-3 mb-3">Family</h3>
              <el-table :data="props.row.family">
                <el-table-column label="Name" prop="name" />
                <el-table-column label="State" prop="state" />
                <el-table-column label="City" prop="city" />
                <el-table-column label="Address" prop="address" />
                <el-table-column label="Zip" prop="zip" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Date" prop="date" />
        <el-table-column label="Name" prop="name" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Search from '@iconify-icons/ep/search'

import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import handsData from './gameData'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'GameRecord'
})

const props = defineProps(['uid'])

const route = useRoute()
// const router = useRouter()
const id = route.query?.id ? route.query?.id : route.params?.id

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const tableRecordColumn: TableColumnList = [
  {
    label: '时间',
    prop: 'date'
  },
  {
    label: '级别/玩法',
    prop: 'club_name'
  },
  {
    label: '牌局名称',
    prop: 'club_integral'
  },
  {
    label: '创建者',
    prop: 'club_integral'
  },
  {
    label: '牌局ID',
    prop: 'club_integral'
  },
  {
    label: '战绩',
    prop: 'club_integral'
  },
  {
    label: '服务费贡献',
    prop: 'club_integral'
  },
  {
    label: '保险贡献',
    prop: 'club_integral'
  }
]

const tableData = [
  {
    club_name: 'Tom-club',
    date: '2016-05-03',
    club_integral: '299'
  },
  {
    club_name: 'Tom-club',
    date: '2016-05-03',
    club_integral: '299'
  },
  {
    club_name: 'Tom-club',
    date: '2016-05-03',
    club_integral: '299'
  }
]

const form = {
  dateRange: ''
}
const loading = ref(true)

function onSearchUser() {
  console.log(form.dateRange)
  console.log(form.dateRange[0])
  loading.value = false
  // getUserData({ date: form }).then(res => {
  //   historicalData.value = res.data
  //   loading.value = false
  // })
}

onMounted(() => {
  onSearchUser()
})
</script>

<style scoped></style>
