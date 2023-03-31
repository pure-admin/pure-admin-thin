<template>
  <div>基础信息-{{ id }}-{{ props.uid }}</div>
  <el-divider />
  <div>
    <div>
      <el-avatar
        class="float-left"
        :size="60"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
    <el-descriptions class="ml-21">
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="钻石">kooriookami</el-descriptions-item>
      <el-descriptions-item label="国家">kooriookami</el-descriptions-item>
      <el-descriptions-item label="绑定手机">18100000000</el-descriptions-item>
      <el-descriptions-item label="绑定邮箱">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <el-button>click1</el-button>
        <el-button>click2</el-button>
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <el-divider />
  <el-descriptions>
    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="绑定手机">18100000000</el-descriptions-item>
    <el-descriptions-item label="绑定邮箱">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address"
      >北京的王府井1215</el-descriptions-item
    >
  </el-descriptions>
  <el-divider />
  <el-descriptions title="俱乐部信息" border />
  <div class="flex justify-between">
    <el-table :data="tableData" border style="width: 47%" table-layout="auto">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <el-table :data="tableData" border style="width: 47%" table-layout="auto">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
  <el-divider />
  <div class="grid grid-cols-4">
    <el-descriptions column="1" title="NLH">
      <el-descriptions-item label="总玩牌局数"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item label="总玩牌手数"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item label="入池率">Suzhou</el-descriptions-item>
      <el-descriptions-item label="入池胜率">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="翻牌前入池率">1215</el-descriptions-item>
      <el-descriptions-item label="3bet率">1215</el-descriptions-item>
      <el-descriptions-item label="激进率">1215</el-descriptions-item>
      <el-descriptions-item label="摊牌率">1215</el-descriptions-item>
      <el-descriptions-item label="百手盈利">1215</el-descriptions-item>
      <el-descriptions-item label="总盈利">1215</el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="1" title="PLO4">
      <el-descriptions-item label="总玩牌局数"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item label="总玩牌手数"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item label="入池率">Suzhou</el-descriptions-item>
      <el-descriptions-item label="入池胜率">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="翻牌前入池率">1215</el-descriptions-item>
      <el-descriptions-item label="3bet率">1215</el-descriptions-item>
      <el-descriptions-item label="激进率">1215</el-descriptions-item>
      <el-descriptions-item label="摊牌率">1215</el-descriptions-item>
      <el-descriptions-item label="百手盈利">1215</el-descriptions-item>
      <el-descriptions-item label="总盈利">1215</el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="1" title="PLO5">
      <el-descriptions-item label="总玩牌局数"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item label="总玩牌手数"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item label="入池率">Suzhou</el-descriptions-item>
      <el-descriptions-item label="入池胜率">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="翻牌前入池率">1215</el-descriptions-item>
      <el-descriptions-item label="3bet率">1215</el-descriptions-item>
      <el-descriptions-item label="激进率">1215</el-descriptions-item>
      <el-descriptions-item label="摊牌率">1215</el-descriptions-item>
      <el-descriptions-item label="百手盈利">1215</el-descriptions-item>
      <el-descriptions-item label="总盈利">1215</el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="1" title="PLO6">
      <el-descriptions-item label="总玩牌局数"
        >kooriookami</el-descriptions-item
      >
      <el-descriptions-item label="总玩牌手数"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item label="入池率">Suzhou</el-descriptions-item>
      <el-descriptions-item label="入池胜率">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="翻牌前入池率">1215</el-descriptions-item>
      <el-descriptions-item label="3bet率">1215</el-descriptions-item>
      <el-descriptions-item label="激进率">1215</el-descriptions-item>
      <el-descriptions-item label="摊牌率">1215</el-descriptions-item>
      <el-descriptions-item label="百手盈利">1215</el-descriptions-item>
      <el-descriptions-item label="总盈利">1215</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'BasicInfo'
})

const props = defineProps(['uid'])

const route = useRoute()
// const router = useRouter()
const id = route.query?.id ? route.query?.id : route.params?.id

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
</script>

<style scoped></style>
