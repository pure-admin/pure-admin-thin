import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

export type UserResult = {
  success: boolean
  data: {
    /** 用户名 */
    username: string
    /** 当前登陆用户的角色 */
    roles: Array<string>
    /** `token` */
    accessToken: string
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date
  }
}

// 不同渠道下的各维度数据
interface dailyData {
  active_count: number
  play_count: number
  register_count: number
  channel: string
  nlh_player: number
  plo4_player: number
  plo5_player: number
  plo6_player: number
}

export type CurrentDayData = {
  success: boolean
  data: Array<dailyData>
}

interface IHistoricalData {
  user_name: string
  register_account: number
  active_account: number
  channel: string
}

export type HistoricalData = {
  count: number
  data: {
    list: Array<IHistoricalData>
  }
}

/** 当日用户数据 */
// export const getCurrentDayData = (data?: object) => {
//   return http.request<CurrentDayData>('post', '/getCurrentDayData', { data })
// }

export const getCurrentDayData = (data?: object) => {
  return http.request<any>('post', baseUrlApi('/cms/user/dataset/today'), {
    data
  })
}

/** 历史用户数据 */
export const getHistoricalData = (data?: object) => {
  console.log('api', data)
  return http.request<HistoricalData>(
    'post',
    baseUrlApi('/cms/user/dataset/history'),
    {
      data
    }
  )
}

/** 搜索用户 */
export const getUserData = (data?: object) => {
  return http.request<HistoricalData>('post', baseUrlApi('/cms/user/list'), {
    data
  })
}

// export type IGameInfo = {
//   uid?: string
//   play: string //总玩牌局数
//   totalhands: string //总手数
//   r_in: string //入池率
//   r_win: string //入池胜率
//   r_fc: string //翻牌前
//   r_ds: string //3bet率
//   r_jin: string //激进度
//   r_sd: string //摊牌率
//   r_100hands: string //百手盈利
//   totalwin: string //总盈利
// }
export interface IGameInfo {
  uid: number
  cb: string
  rDs: string
  rD3b: string
  rFbt: number
  rFc: string
  rRuwin: string
  rSd: string
  rSf: string
  r100hands: number
  rSdw: string
  rRuTimes: number
  '3b': string
  play: number
  rCh: string
  rJin: string
  totalwin: string
  rRu: string
  totalbuyin: number
  utime: string
  bmaxlose: number
  hmaxwin: number
  rWin: string
  maxcard: string
  bmaxwin: number
  totalhands: number
  rIn: string
}

export interface GameInfo {
  ploFive: IGameInfo
  ploSix: IGameInfo
  omaha: IGameInfo
  texas: IGameInfo
}

export type IUserInfo = {
  data: {
    base_info: {}
    game_info: GameInfo
    join_club_list?: any[]
    create_club_list?: any[]
  }
}
export interface BaseInfo {
  lastName: string
  uid: number
  registerChannel: string
  user_phone: string
  street: string
  postalCode: string
  enterCount: number
  gbgCheck: string
  isHideFlag: number
  city: string
  firstName: string
  houseNumber: string
  enterTime: number
  playTime: number
  user_name: string
  channel: string
  scrapAmount: number
  diamond: number
  regTime: number
  birthday: number
  remarks: string
  nationality: string
  usersig: string
  nickname: string
  createGroupLimit: number
  icon: string
  regIp: string
  identityCard: string
  country: string
  gender: number
  userCategory: number
  user_email: string
}

type Result = {
  code: number
  data?: {
    /** 列表数据 */
    base_info: BaseInfo
    create_club_list: Array<any>
    join_club_list: Array<any>
    game_info: GameInfo
  }
}
/** 搜索用户 基本信息 */
export const getUserInfo = (data?: object) => {
  console.log('_', data)
  return http.request<Result>('post', baseUrlApi('/cms/user/info'), {
    data
  })
}
