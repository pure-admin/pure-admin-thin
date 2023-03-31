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

  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup lang="ts">
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Search from '@iconify-icons/ep/search'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'DiamondRecord'
})

const props = defineProps(['uid'])

const route = useRoute()
// const router = useRouter()
const id = route.query?.id ? route.query?.id : route.params?.id

// page detail data
const form = {
  dateRange: ''
}
const loading = ref(true)
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

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
