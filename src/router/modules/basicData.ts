import { $t } from '@/plugins/i18n'

// 最简代码，也就是这些字段必须有
export default {
  path: '/basic',
  redirect: '/basic/liveData',
  meta: {
    title: $t('menus.basicData'),
    icon: 'lineChartLine',
    rank: 6
  },
  children: [
    {
      path: '/basic/liveData',
      name: 'LiveData',
      component: () => import('@/views/basic/LiveData.vue'),
      meta: {
        title: $t('menus.liveData'),
        roles: ['admin']
      }
    },
    {
      path: '/basic/userData',
      name: 'UserData',
      component: () => import('@/views/basic/queryUser/index.vue'),
      meta: {
        title: $t('menus.userData')
      }
    },

    {
      path: '/basic/queryUser',
      name: 'QueryUser',
      component: () => import('@/views/basic/queryUser/queryUser.vue'),
      meta: {
        title: $t('menus.searchUser')
      }
    },
    {
      path: '/basic/queryUser/users/:id',
      name: 'UserInfo',
      component: () => import('@/views/basic/queryUser/user/index.vue'),
      meta: {
        title: '用户信息',
        showLink: false
      }
    },
    {
      path: '/basic/queryUser/users/:id/basicInfo',
      name: 'UserBasicInfo',
      component: () => import('@/views/basic/queryUser/user/basicInfo.vue'),
      meta: {
        title: '基础信息',
        showLink: false
      }
    },
    {
      path: '/basic/gameData',
      name: 'GameData',
      component: () => import('@/views/basic/GameData.vue'),
      meta: {
        title: $t('menus.gameData')
      }
    },
    {
      path: '/basic/clubData',
      name: 'ClubData',
      component: () => import('@/views/basic/queryClub/index.vue'),
      meta: {
        title: $t('menus.clubData')
      }
    },
    {
      path: '/basic/queryClub',
      name: 'QueryData',
      component: () => import('@/views/basic/queryClub/queryClub.vue'),
      meta: {
        title: $t('menus.searchClub')
      }
    }
  ]
}
