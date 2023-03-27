// 模拟后端动态生成 有权限的路由路径
import { MockMethod } from 'vite-plugin-mock'

const permissionPath = {
  page: [
    '/permission',
    '/permission/page/index',
    '/permission/button/index',

    // '/basic',
    // '/basic/queryClub/index',
    // '/basic/queryClub/queryClub',

    '/finance',
    '/finance/diamondData'
  ],
  btn: ['btn-edit', 'edit-create']
}
export default [
  {
    url: '/getAsyncPath',
    method: 'get',
    response: () => {
      return {
        success: true,
        data: permissionPath
      }
    }
  }
] as MockMethod[]
