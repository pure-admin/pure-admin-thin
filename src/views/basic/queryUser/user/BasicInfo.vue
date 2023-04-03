<template>
  <div>基础信息-{{ id }}-{{ props.uid }}</div>
  <el-divider />
  <div class="grid grid-cols-12">
    <div class="col-span-1 flex flex-col items-center justify-center">
      <el-avatar :size="60" :src="pageData.base_info['icon']" />
      <el-button size="small" class="icon-avatar-change">修改</el-button>
    </div>

    <el-descriptions class="col-span-10">
      <el-descriptions-item label="用户名">{{
        pageData.base_info['user_name']
      }}</el-descriptions-item>
      <el-descriptions-item label="钻石">{{
        pageData.base_info.diamond
      }}</el-descriptions-item>
      <el-descriptions-item label="国家">{{
        pageData.base_info.country
      }}</el-descriptions-item>
      <el-descriptions-item label="绑定手机">{{
        pageData.base_info.user_phone
      }}</el-descriptions-item>
      <el-descriptions-item label="绑定邮箱">{{
        pageData.base_info.user_email
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
        >{{ pageData.base_info[item.prop] }}111</el-descriptions-item
      >
    </el-descriptions>

    <el-descriptions :column="1">
      <el-descriptions-item
        v-for="(item, i) in registerInfoMap"
        :key="i"
        :label="item.label"
        >{{ pageData.base_info[item.prop] }}</el-descriptions-item
      >
    </el-descriptions>
  </div>
  <el-divider />
  <el-descriptions title="俱乐部信息" border />
  <div class="grid grid-cols-2 gap-4">
    <pure-table
      :data="pageData.create_club_list"
      :columns="created_club_columns"
      border
    />

    <pure-table
      :data="pageData.join_club_list"
      :columns="joined_club_columns"
      border
    />
  </div>

  <el-divider />

  <div class="grid grid-cols-4">
    <el-descriptions :column="1" title="NLH">
      <el-descriptions-item
        v-for="(item, i) in gameMap"
        :key="i"
        :label="item.label"
        >{{ pageData.game_info.omaha[item.prop] }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions :column="1" title="PLO4">
      <el-descriptions-item
        v-for="(item, i) in gameMap"
        :key="i"
        :label="item.label"
        >{{ pageData.game_info.texas[item.prop] }}</el-descriptions-item
      >
    </el-descriptions>
    <el-descriptions :column="1" title="PLO5">
      <el-descriptions-item
        v-for="(item, i) in gameMap"
        :key="i"
        :label="item.label"
        >{{ pageData.game_info.plo_five[item.prop] }}</el-descriptions-item
      >
    </el-descriptions>
    <el-descriptions :column="1" title="PLO6">
      <el-descriptions-item
        v-for="(item, i) in gameMap"
        :key="i"
        :label="item.label"
        >{{ pageData.game_info.plo_six[item.prop] }}</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { getUserInfo } from '@/api/basic'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'BasicInfo'
})

const props = defineProps(['uid'])

const route = useRoute()
// const router = useRouter()
const id = route.query?.id ? route.query?.id : route.params?.id

const pageData = ref({
  base_info: {},
  create_club_list: [],
  game_info: {
    omaha: {},
    texas: {},
    plo_five: {},
    plo_six: {}
  },
  join_club_list: []
})

// const base_info: any = ref({})
// const create_club_list: any = ref([])
// const join_club_list: any = ref([])
// let game_info: {
//   omaha: IGameInfo
// } = reactive({ omaha: {} })
// const { base_info, create_club_list, game_info, join_club_list } = pageData

// getUserInfo({ uid: 20475 }).then(res => {
//   console.log('res.data', res.data)
//   // pageData = res.data
// })

function onSearch() {
  console.log('onSearch')
  // loading.value = true
  getUserInfo({ uid: 20475 }).then(res => {
    const { data } = res
    console.log('data-basic', data)
    pageData.value = data
    // pageData.base_info = data.base_info
    // pageData.create_club_list = data.create_club_list
    // pageData.join_club_list = data.join_club_list
    // pageData.game_info = data.game_info
    // const { base_info, create_club_list, join_club_list, game_info } =
    //   toRef(pageData)
    // console.log('game_info', game_info)
    // console.log('game_info', game_info.omaha)
    // const { omaha } = game_info
    // console.log('uid', game_info.omaha.uid)
    // setTimeout(() => {
    //   loading.value = false
    // }, 500)
  })
}

const created_club_columns: TableColumnList = [
  {
    label: '俱乐部名称（创建）',
    prop: 'name'
  },
  {
    label: '创建时间',
    prop: 'date'
  },
  {
    label: '俱乐部分积分',
    prop: 'jifen'
  }
]
const joined_club_columns: TableColumnList = [
  {
    label: '俱乐部名称（创建）',
    prop: 'name'
  },
  {
    label: '创建时间',
    prop: 'date'
  },
  {
    label: '俱乐部分积分',
    prop: 'jifen'
  }
]

const loginInfoMap = [
  { label: '登录渠道', prop: 'channel' },
  { label: '登录版本', prop: 'last_login_version' },
  { label: '最近登录IP', prop: 'last_login_ip' },
  { label: '最近登录IP位置', prop: 'last_login_country' },
  { label: '最近登录时间', prop: 'enter_time' },
  { label: '最近登录IP设备', prop: 'last_login_device' }
]

const registerInfoMap = [
  { label: '注册渠道', prop: 'register_channel' },
  { label: '注册版本', prop: '' }, // 先空着
  { label: '注册时间', prop: 'reg_time' },
  { label: '注册IP', prop: 'reg_ip' },
  { label: '注册设备', prop: '' } // 先空着
]

const gameMap = [
  { label: '总玩牌手数', prop: 'totalhands' },
  { label: '总玩牌局数', prop: 'play' },
  { label: '入池率', prop: 'r_in' },
  { label: '入池胜率', prop: 'r_win' },
  { label: '翻牌前入池率', prop: 'r_fc' },
  { label: '3bet率', prop: 'r_ds' },
  { label: '激进度', prop: 'r_jin' },
  { label: '摊牌度', prop: 'r_sd' },
  { label: '百手盈利', prop: 'r_100hands' },
  { label: '盈利', prop: 'totalwin' }
]

onMounted(() => {
  onSearch()
})
</script>

<style scoped lang="scss">
.icon-avatar-change {
  margin-top: -8px;
}
</style>
