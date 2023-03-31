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

interface OHistoricalData {
  play_account: number
  register_account: number
  active_account: number
  channel: string
}

export type HistoricalData = {
  success: boolean
  data: Array<OHistoricalData>
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
