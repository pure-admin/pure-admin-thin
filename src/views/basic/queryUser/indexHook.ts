import { ref, reactive, onMounted } from 'vue'

import { getCurrentDayData, getHistoricalData } from '@/api/basic'

export function useUser() {
  const currentDayColumns: TableColumnList = [
    {
      label: '渠道',
      prop: 'channel'
    },
    {
      label: '在线用户数量',
      prop: 'active_count'
    },
    {
      label: '在玩用户数量',
      prop: 'play_count'
    },
    {
      label: '当日注册',
      prop: 'register_count'
    },
    {
      label: 'NLH在玩',
      prop: 'nlh_player'
    },
    {
      label: 'PLO4',
      prop: 'nlh_player'
    },
    {
      label: 'PLO4',
      prop: 'nlh_player'
    },
    {
      label: 'PLO4',
      prop: 'nlh_player'
    }
  ]
  const historicalColumns: TableColumnList = [
    {
      label: '渠道',
      prop: 'channel'
    },
    {
      label: '在线用户数量',
      prop: 'active_count'
    },
    {
      label: '在玩用户数量',
      prop: 'play_count'
    },
    {
      label: '当日注册',
      prop: 'register_count'
    }
  ]

  const form = reactive({
    dateRange: ''
  })

  const currentDayData = ref([])
  const historicalData = ref([])
  const loading = ref(true)

  function onSearchToday() {
    getCurrentDayData().then(res => {
      currentDayData.value = res.data
    })
  }
  function onSearchHistory() {
    console.log('onSearchHistory1', form.dateRange)
    console.log('onSearchHistory2', form.dateRange[0])
    getHistoricalData({
      start_date: form.dateRange[0],
      end_date: form.dateRange[1]
    }).then(res => {
      historicalData.value = res.data
      loading.value = false
    })
  }

  // const resetHistoryForm = formEl => {
  //   if (!formEl) return
  //   formEl.resetFields()
  //   onSearchHistory()
  // }

  onMounted(() => {
    onSearchToday()
    onSearchHistory()
  })

  return {
    form,
    currentDayData,
    historicalData,
    currentDayColumns,
    historicalColumns,
    loading,
    onSearchHistory
    // resetHistoryForm
  }
}
