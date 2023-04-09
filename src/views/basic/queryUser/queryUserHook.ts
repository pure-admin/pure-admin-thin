import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import dayjs from 'dayjs'

import { getUserData } from '@/api/basic'

export function useUser() {
  const historicalColumns: TableColumnList = [
    {
      label: 'UID',
      prop: 'uid',
      slot: 'operation'
    },
    {
      label: '用户名',
      prop: 'user_name'
    },
    {
      label: '所属俱乐部',
      prop: 'first_joined_club'
    },
    {
      label: '注册渠道',
      prop: 'register_channel'
    },
    {
      label: '绑定手机/邮箱',
      prop: 'user_email/user_phone'
    },
    {
      label: '注册IP及归属地',
      prop: 'reg_ip'
    },
    {
      label: '最后登录',
      prop: 'enter_time',
      formatter: ({ enter_time }) =>
        dayjs(enter_time * 1000).format('YYYY-MM-DD HH:MM:ss')
    },
    {
      label: '最后登录IP及归属地',
      prop: 'login_ip'
    }
  ]

  const form = reactive({
    user_name: '',
    user_phone: '',
    user_email: '',
    dateRange: ''
  })

  const historicalData = ref([])
  const loading = ref(true)

  const pagination_pure = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    background: true
  })

  const pagination = computed(() => {
    return {
      page: pagination_pure.currentPage,
      per_page: pagination_pure.pageSize
    }
  })

  function onSearchUser() {
    loading.value = true
    console.log('form.dateRange:', form.dateRange)
    console.log('pagination', pagination)
    const start_time = form.dateRange ? Number(form?.dateRange[0]) / 1000 : ''
    const end_time = form.dateRange ? Number(form?.dateRange[1]) / 1000 : ''
    getUserData({
      ...form,
      per_page: pagination_pure.pageSize,
      page: pagination_pure.currentPage,
      start_time,
      end_time
    })
      .then(res => {
        historicalData.value = res.data.list
        loading.value = false
        pagination_pure.total = res.data.count
      })
      .catch(() => {
        loading.value = false
      })
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`)
    nextTick(() => {
      onSearchUser()
    })
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`)
    console.log({ val })
    nextTick(() => {
      onSearchUser()
    })
  }

  // function handleClick(row) {
  //   console.log(
  //     '%crow===>>>: ',
  //     'color: MidnightBlue; background: Aquamarine; font-size: 20px;',
  //     row
  //   )
  // }

  // const resetHistoryForm = formEl => {
  //   if (!formEl) return
  //   formEl.resetFields()
  //   onSearchUser()
  // }

  onMounted(() => {
    onSearchUser()
  })

  return {
    form,
    historicalData,
    historicalColumns,
    loading,
    pagination_pure,
    onSearchUser,
    handleSizeChange,
    handleCurrentChange
    // handleClick
    // resetHistoryForm
  }
}
