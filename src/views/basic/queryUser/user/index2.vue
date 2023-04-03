<template>
  <el-card>
    <!-- params 传参的形式，面包屑导航有点问题，先不管，暂时使用 query 形式传参 -->
    <div>用户信息 列表页面</div>
    <div>{{ id }} - 详情页内容在此（params传参）</div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane
        v-for="(_, tab) in tabsMap"
        :key="tabsMap[tab].name"
        :name="tabsMap[tab].name"
        :label="tabsMap[tab].label"
      />
      <!-- <component :is="tabsMap[activeName].component" :uid="id" /> -->
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useDetail } from '../infoHook'
import basicInfo from './basicInfo.vue'
import gameRecord from './gameRecord.vue'
import diamondRecord from './diamondRecord.vue'
import loginRecord from './loginRecord.vue'
import chatRecord from './chatRecord.vue'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'UserInformation'
})

const { initToDetail, id } = useDetail()

initToDetail('params')
// initToDetail('query')

const activeName = ref('basicInfo')

const tabsMap = {
  basicInfo: {
    name: 'basicInfo',
    label: '用户信息',
    component: basicInfo
  },
  gameRecord: {
    name: 'gameRecord',
    label: '游戏记录',
    component: gameRecord
  },
  diamondRecord: {
    name: 'diamondRecord',
    label: '钻石记录',
    component: diamondRecord
  },
  loginRecord: {
    name: 'loginRecord',
    label: '登录记录',
    component: loginRecord
  },
  chatRecord: {
    name: 'chatRecord',
    label: '聊天记录',
    component: chatRecord
  }
}
</script>

<style scoped></style>
