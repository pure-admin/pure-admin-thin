// 模拟后端动态生成路由
import { MockMethod } from 'vite-plugin-mock'

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const permissionRouter = {
  path: '/permission',
  meta: {
    title: 'menus.permission',
    icon: 'informationLine',
    rank: 99
  },
  children: [
    {
      path: '/permission/page/index',
      name: 'PermissionPage',
      meta: {
        title: 'menus.permissionPage',
        roles: ['admin', 'common']
      }
    },
    {
      path: '/permission/button/index',
      name: 'PermissionButton',
      meta: {
        title: 'menus.permissionButton',
        roles: ['admin', 'common'],
        auths: ['btn_add', 'btn_edit', 'btn_delete']
      }
    }
  ]
}
// const basic = {
//   path: '/basic',
//   redirect: '/basic/LiveData',
//   meta: {
//     title: 'menus.basicData',
//     icon: 'lineChartLine',
//     rank: 6
//   },
//   children: [
//     {
//       path: '/basic/LiveData',
//       name: 'LiveData',
//       meta: {
//         title: 'menus.liveData'
//       }
//     },
//     {
//       path: '/basic/queryUser/index',
//       name: 'UserData',
//       meta: {
//         title: 'menus.userData'
//       }
//     },
//     {
//       path: '/basic/queryUser/queryUser',
//       name: 'QueryUser',
//       meta: {
//         title: 'menus.searchUser'
//       }
//     },
//     {
//       path: '/basic/GameData',
//       name: 'GameData',
//       meta: {
//         title: 'menus.gameData'
//       }
//     },
//     {
//       path: '/basic/queryClub/index',
//       name: 'ClubData',
//       meta: {
//         title: 'menus.clubData'
//       }
//     },
//     {
//       path: '/basic/queryClub/queryClub',
//       name: 'QueryData',
//       meta: {
//         title: 'menus.searchClub'
//       }
//     }
//   ]
// }

export default [
  {
    url: '/getAsyncRoutes',
    method: 'get',
    response: () => {
      return {
        success: true,
        data: [permissionRouter]
      }
    }
  }
] as MockMethod[]
