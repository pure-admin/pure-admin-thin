import { toRefs, reactive } from 'vue'
/** 俱乐部信息-创建 表格column */
export const created_club_columns: TableColumnList = [
  { label: '俱乐部名称（创建）', prop: 'name' },
  { label: '创建时间', prop: 'date' },
  { label: '俱乐部分积分', prop: 'jifen' }
]

/** 俱乐部信息-加入 表格column */
export const joined_club_columns: TableColumnList = [
  { label: '俱乐部名称（创建）', prop: 'name' },
  { label: '创建时间', prop: 'date' },
  { label: '俱乐部分积分', prop: 'jifen' }
]

/** 基本信息 - 登录相关 */
export const loginInfoMap = [
  { label: '登录渠道', prop: 'channel' },
  { label: '登录版本', prop: 'last_login_version' },
  { label: '最近登录IP', prop: 'last_login_ip' },
  { label: '最近登录IP位置', prop: 'last_login_country' },
  { label: '最近登录时间', prop: 'enter_time' },
  { label: '最近登录IP设备', prop: 'last_login_device' }
]

/** 基本信息 - 注册相关 */
export const registerInfoMap = [
  { label: '注册渠道', prop: 'register_channel' },
  { label: '注册版本', prop: '' }, // 先空着
  { label: '注册时间', prop: 'reg_time' },
  { label: '注册IP', prop: 'reg_ip' },
  { label: '注册设备', prop: '' } // 先空着
]

/** 数据信息 - 游戏维度 */
export const gameMap = [
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
export function useBasic() {
  const pageData = reactive({
    base_info: {
      diamond: '',
      country: '',
      user_phone: '',
      user_email: ''
    },
    create_club_list: [],
    game_info: {
      omaha: {},
      texas: {},
      plo_five: {},
      plo_six: {}
    },
    join_club_list: []
  })

  return {
    ...toRefs(pageData)
  }
}
