import { ref, reactive, toRaw, onMounted } from 'vue'
// import { type PaginationProps } from '@pureadmin/table'
// import { useRoute } from 'vue-router'

import {
  // getGameRecord,
  // getGameHandsRecord,
  getDiamondLog,
  getLoginLog,
  getChatLog
} from '@/api/basic'

/** router query 参数 */
// const route = useRoute()
// const router = useRouter()
// const id = route.query?.id ? route.query?.id : route.params?.id

/** 筛选日期区间 */
const form = reactive({
  dateRange: ''
})

/** 分页信息 */
const paginationParams = reactive({
  per_page: 20,
  page: 1,
  total: 10
})
// const pagination = reactive<PaginationProps>({
//   total: 0,
//   per_page: 10,
//   page: 1,
//   background: true
// })

/** loading */
const loading = ref(true)

/** 游戏记录 */
export function useGameLog() {
  function onSearch() {}

  return {
    form,
    paginationParams,
    onSearch
  }
}

/** 钻石记录 */
export function useDiamondLog() {
  const columns = [
    { label: '类型', prop: 'source' },
    { label: '日期', prop: 'ctime' },
    { label: '数量', prop: 'amount' },
    { label: '余额', prop: 'remain' }
  ]

  const diamondTableData = ref([])

  function onSearch() {
    /** 查询参数 */
    const start_time = form.dateRange ? form?.dateRange[0] : undefined
    const end_time = form.dateRange ? form?.dateRange[1] : undefined
    const queryParams = {
      uid: '20473',
      start_time,
      end_time,
      ...toRaw(paginationParams)
    }
    console.log('queryParams:', queryParams)

    getDiamondLog(queryParams).then(res => {
      const { data } = res
      console.log('getDiamondLog=>', res)
      diamondTableData.value = data.list
      paginationParams.total = data.count
      loading.value = false
    })
  }

  onMounted(() => {
    onSearch()
  })

  return {
    columns,
    form,
    loading,
    paginationParams,
    diamondTableData,
    onSearch
  }
}

/** 登录记录 */
export function useLoginLog() {
  const columns = [
    { label: '登录时间', prop: 'utime' },
    { label: '登录渠道', prop: 'channel' },
    { label: '登录IP', prop: 'ip' },
    { label: 'IP位置', prop: 'country' },
    { label: '设备码', prop: 'device' }
  ]

  const loginTableData = ref([])

  function onSearch() {
    /** 查询参数 */
    const start_time = form.dateRange ? form?.dateRange[0] : undefined
    const end_time = form.dateRange ? form?.dateRange[1] : undefined
    const queryParams = {
      uid: '20095',
      start_time,
      end_time,
      ...toRaw(paginationParams)
    }
    console.log('queryParams:', queryParams)

    getLoginLog(queryParams).then(res => {
      const { data } = res
      console.log('getLoginLog=>', res)
      loginTableData.value = data.list
      paginationParams.total = data.count
      loading.value = false
    })
  }

  onMounted(() => {
    onSearch()
  })

  return {
    columns,
    form,
    loading,
    loginTableData,
    paginationParams,
    onSearch
  }
}

/** 聊天记录 */
export function useChatLog() {
  const columns = [
    { label: '创建者', prop: 'creator' },
    { label: '牌局名称', prop: 'table_name' },
    { label: '发送时间', prop: 'send_time' },
    { label: '内容', prop: 'content' }
  ]

  const chatTableData = ref([])

  function onSearch() {
    /** 查询参数 */
    const start_time = form.dateRange ? form?.dateRange[0] : undefined
    const end_time = form.dateRange ? form?.dateRange[1] : undefined
    const queryParams = {
      uid: '20475',
      start_time,
      end_time,
      ...toRaw(paginationParams)
    }
    console.log('queryParams:', queryParams)

    getChatLog(queryParams).then(res => {
      console.log('getChatLog=>', res)
      loading.value = false
    })
  }

  onMounted(() => {
    onSearch()
  })

  return {
    columns,
    form,
    loading,
    paginationParams,
    chatTableData,
    onSearch
  }
}
