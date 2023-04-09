<template>
  <div>基础信息-{{ uid }}-{{ props.uid }}</div>
  <el-divider />
  <div class="grid grid-cols-12">
    <div class="col-span-1 flex flex-col items-center justify-center">
      <el-avatar :size="60" :src="base_info['icon']" />
      <el-button size="small" class="icon-avatar-change">修改</el-button>
    </div>

    <el-descriptions class="col-span-10">
      <el-descriptions-item label="用户名">{{
        base_info['user_name']
      }}</el-descriptions-item>
      <el-descriptions-item label="钻石">{{
        base_info.diamond
      }}</el-descriptions-item>
      <el-descriptions-item label="国家">{{
        base_info.country
      }}</el-descriptions-item>
      <el-descriptions-item label="绑定手机">{{
        base_info.user_phone
      }}</el-descriptions-item>
      <el-descriptions-item label="绑定邮箱">{{
        base_info.user_email
      }}</el-descriptions-item>
      <el-descriptions-item>
        <el-button>封号</el-button>
        <el-button>清除登录限制</el-button>
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <el-divider />

  <div class="grid grid-cols-2">
    <el-descriptions :column="1">
      <el-descriptions-item
        v-for="(item, i) in loginInfoMap"
        :key="i"
        :label="item.label"
        >{{ base_info[item.prop] }}</el-descriptions-item
      >
    </el-descriptions>

    <el-descriptions :column="1">
      <el-descriptions-item
        v-for="(item, i) in registerInfoMap"
        :key="i"
        :label="item.label"
        >{{ base_info[item.prop] }}</el-descriptions-item
      >
    </el-descriptions>
  </div>
  <el-divider />
  <el-descriptions title="俱乐部信息" border />
  <div class="grid grid-cols-2 gap-4">
    <pure-table
      :data="create_club_list"
      :columns="created_club_columns"
      border
    />

    <pure-table :data="join_club_list" :columns="joined_club_columns" border />
  </div>

  <el-divider />

  <div class="grid grid-cols-4">
    <el-descriptions :column="1" title="NLH">
      <el-descriptions-item
        v-for="(item, i) in gameMap"
        :key="i"
        :label="item.label"
        >{{ game_info.omaha[item.prop] }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions :column="1" title="PLO4">
      <el-descriptions-item
        v-for="(item, i) in gameMap"
        :key="i"
        :label="item.label"
        >{{ game_info.texas[item.prop] }}</el-descriptions-item
      >
    </el-descriptions>
    <el-descriptions :column="1" title="PLO5">
      <el-descriptions-item
        v-for="(item, i) in gameMap"
        :key="i"
        :label="item.label"
        >{{ game_info.plo_five[item.prop] }}</el-descriptions-item
      >
    </el-descriptions>
    <el-descriptions :column="1" title="PLO6">
      <el-descriptions-item
        v-for="(item, i) in gameMap"
        :key="i"
        :label="item.label"
        >{{ game_info.plo_six[item.prop] }}</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { getUserInfo } from '@/api/basic'
import {
  created_club_columns,
  joined_club_columns,
  loginInfoMap,
  registerInfoMap,
  gameMap,
  useBasic
} from './basicInfoHook'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'BasicInfo'
})

const props = defineProps(['uid'])

const route = useRoute()
// const router = useRouter()
const uid = route.query?.id ? route.query?.id : route.params?.id

let { base_info, create_club_list, game_info, join_club_list } = useBasic()
// const { base_info, create_club_list, game_info, join_club_list } = pageData
function onSearch() {
  console.log('onSearch')
  // loading.value = true
  getUserInfo({ uid }).then(res => {
    const { data } = res
    // const { base_info, create_club_list, game_info, join_club_list } = res.data

    base_info = data.base_info
    create_club_list = data.create_club_list
    game_info = data.game_info
    join_club_list = data.join_club_list
  })
}

onMounted(() => {
  onSearch()
})
</script>

<style scoped lang="scss">
.icon-avatar-change {
  margin-top: -8px;
}
</style>
