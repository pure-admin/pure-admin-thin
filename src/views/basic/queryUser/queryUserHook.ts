import { ref, reactive, onMounted } from 'vue'

import { getUserData } from '@/api/basic'

export function useUser() {
  const historicalColumns: TableColumnList = [
    {
      label: '用户名',
      prop: 'user_name'
    },
    {
      label: '所属俱乐部',
      prop: 'club_name'
    },
    {
      label: '注册渠道',
      prop: 'register_channel'
    },
    {
      label: '绑定手机/邮箱',
      prop: 'mobile'
    },
    {
      label: '注册IP及归属地',
      prop: 'reg_ip'
    },
    {
      label: '最后登录',
      prop: 'last_login_date'
    },
    {
      label: '最后登录IP及归属地',
      prop: 'last_area'
    }
  ]

  const form = reactive({
    username: '',
    mobile: '',
    email: '',
    dateRange: ''
  })

  const historicalData = ref([])
  const loading = ref(true)

  function onSearchUser() {
    console.log(form.dateRange)
    console.log(form.dateRange[0])
    getUserData({ date: form }).then(res => {
      historicalData.value = res.data
      loading.value = false
    })
  }

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
    onSearchUser
    // resetHistoryForm
  }
}
