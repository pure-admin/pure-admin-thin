import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/dev-api/getCurrentDayData',
    method: 'post',
    response: () => {
      return {
        success: true,
        data: [
          {
            active_count: 12398,
            play_count: 123,
            register_count: 222,
            channel: 'PC',
            nlh_player: 98,
            plo4_player: 715,
            plo5_player: 123,
            plo6_player: 123
          },
          {
            active_count: 23,
            play_count: 212,
            register_count: 253,
            channel: 'IOS',
            nlh_player: 254,
            plo4_player: 2213,
            plo5_player: 2123,
            plo6_player: 512
          }
        ]
      }
    }
  },
  {
    url: '/getHistoricalData',
    method: 'post',
    response: () => {
      return {
        success: true,
        data: [
          {
            play_account: 2132,
            register_account: 232,
            active_account: 2123,
            channel: 'PC'
          },
          {
            play_account: 21232,
            register_account: 12313,
            active_account: 67123,
            channel: 'IOS'
          }
        ]
      }
    }
  },
  {
    url: '/snow/getUserData',
    method: 'post',
    response: () => {
      return {
        success: true,
        data: [
          {
            username: 2132,
            club_name: '12123',
            channel: 'PC',
            mobile: 'P123123213123',
            area: 'beijing',
            last_login_date: '2023/12/12',
            last_area: 'beijing'
          }
        ]
      }
    }
  }
] as MockMethod[]
