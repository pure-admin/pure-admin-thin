/** module: 牌局数据 */

import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

/** 搜索用户 - 游戏记录>聊天记录 */
export const getTableData = (data?: object) => {
  console.log('getTableData', data)

  return http.request<any>('post', baseUrlApi('/cms/poker/dataset'), {
    data
  })
}
