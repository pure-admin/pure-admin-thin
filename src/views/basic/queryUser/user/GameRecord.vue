<template>
  <div>游戏记录-{{ id }}-{{ props.uid }}</div>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
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
            value-format="x"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="useRenderIcon(Search)"
            :loading="loading"
            @click="onSearch({ type: 'table' })"
          >
            搜索
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            :icon="useRenderIcon(Search)"
            :loading="loading"
            @click="onSearch({ type: 'table' })"
          >
            导出
          </el-button>
        </el-form-item>
      </el-form>

      <pure-table :data="pageData" :columns="tableRecordColumn" border />
    </el-tab-pane>

    <el-tab-pane label="手牌历史" name="second">
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
            @click="onSearch({ type: 'hands' })"
          >
            搜索
          </el-button>
        </el-form-item>
      </el-form>

      <pure-table :data="handsData" :columns="columns">
        <template #expand="{ row }">
          <div class="m-4">
            <p class="mb-2">State: {{ row.state }}</p>
            <p class="mb-2">City: {{ row.city }}</p>
            <p class="mb-2">Address: {{ row.address }}</p>
            <p class="mb-4">Zip: {{ row.zip }}</p>
            <h3 class="mt-3 mb-3">Family</h3>
            <pure-table :data="row.family" :columns="childColumns" border />
          </div>
        </template>
      </pure-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Search from '@iconify-icons/ep/search'

import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { TabPaneName } from 'element-plus'
import { handsData } from './data'

import { getGameRecord, getGameHandsRecord } from '@/api/basic'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'GameRecord'
})

const props = defineProps(['uid'])

const route = useRoute()
// const router = useRouter()
const id = route.query?.id ? route.query?.id : route.params?.id

const activeName = ref('first')
// const activeName = ref('second')

const handleClick = (name: TabPaneName) => {
  console.log(123, name)
  const type = name === 'first' ? 'table' : 'hands'
  onSearch({ type })
}

const tableRecordColumn: TableColumnList = [
  {
    label: '开始时间',
    prop: 'start_date',
    formatter: ({ start_date }) =>
      dayjs(start_date * 1000).format('YYYY-MM-DD HH:MM:ss')
  },
  {
    label: '结束时间',
    prop: 'end_date',
    formatter: ({ end_date }) =>
      dayjs(end_date * 1000).format('YYYY-MM-DD HH:MM:ss')
  },
  {
    label: '级别',
    prop: 'blind'
  },
  {
    label: '玩法',
    prop: 'game_type_name'
  },
  {
    label: '牌局名称',
    prop: 'table_name'
  },
  {
    label: '创建者',
    prop: 'creator'
  },
  {
    label: '牌局ID',
    prop: 'round_id'
  },
  {
    label: '战绩',
    prop: 'earnings'
  },
  {
    label: '服务费贡献',
    prop: 'service_fee'
  },
  {
    label: '保险贡献',
    prop: 'insurance'
  }
]

const columns: TableColumnList = [
  {
    type: 'expand',
    slot: 'expand'
  },
  {
    label: '日期',
    prop: 'date'
  },
  {
    label: '姓名',
    prop: 'name'
  }
]

const childColumns: TableColumnList = [
  {
    label: 'Name',
    prop: 'name'
  },
  {
    label: 'State',
    prop: 'state'
  },
  {
    label: 'City',
    prop: 'city'
  },
  {
    label: 'Address',
    prop: 'address'
  },
  {
    label: 'Zip',
    prop: 'zip'
  }
]

const form = ref({
  dateRange: ''
})
const pageData = ref([])
const record_count = ref(0)
const loading = ref(true)

const pageParams = ref({
  page: 1, //页码
  per_page: 20 // 每页条数
})

function onSearch(query) {
  // type: 1: tabl-record , 2: hands
  const { type = 'table' } = query
  console.log(form.value.dateRange)
  console.log(form.value.dateRange[0])
  loading.value = false
  const start_time = form.value.dateRange[0]
  const end_time = form.value.dateRange[1]
  const query_params = {
    uid: 20453,
    start_time,
    end_time,
    ...pageParams.value
  }
  console.log('query_params ==>', query_params)
  console.log('pageParams ==>', pageParams.value)
  if (type === 'table') {
    searchTable(query_params)
  } else if (type === 'hands') {
    searchHands(query_params)
  }
}

function searchTable(params) {
  getGameRecord({ ...params }).then(res => {
    pageData.value = res.data.list
    record_count.value = res.data.count
    loading.value = false
  })
}

function searchHands(params) {
  getGameHandsRecord({ ...params }).then(res => {
    console.log('getGameHandsRecord:', res)
    pageData.value = res.data.list
    record_count.value = res.data.count
    loading.value = false
  })
}

onMounted(() => {
  onSearch({ type: 'table' })
})
</script>

<style scoped></style>
