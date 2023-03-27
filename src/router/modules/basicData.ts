import { $t } from '@/plugins/i18n'

// 最简代码，也就是这些字段必须有
export default {
  path: '/basic',
  redirect: '/basic/liveData',
  meta: {
    title: $t('menus.basicData'),
    icon: 'lineChartLine'
  },
  children: [
    {
      path: '/basic/liveData',
      name: 'LiveData',
      component: () => import('@/views/basicData/LiveData.vue'),
      meta: {
        title: $t('menus.liveData'),
        roles: ['admin']
      }
    },
    {
      path: '/basic/liveData2',
      name: 'LiveData2',
      component: () => import('@/views/basicData/LiveData.vue'),
      meta: {
        title: '测试2',
        roles: ['admin1']
      }
    },
    {
      path: '/basic/userData',
      name: 'UserData',
      component: () => import('@/views/basicData/queryUser/index.vue'),
      meta: {
        title: $t('menus.userData')
      }
    },
    {
      path: '/basic/queryUser',
      name: 'QueryUser',
      component: () => import('@/views/basicData/queryUser/queryUser.vue'),
      meta: {
        title: $t('menus.searchUser')
      }
    },
    {
      path: '/basic/gameData',
      name: 'GameData',
      component: () => import('@/views/basicData/GameData.vue'),
      meta: {
        title: $t('menus.gameData')
      }
    },
    {
      path: '/basic/clubData',
      name: 'ClubData',
      component: () => import('@/views/basicData/queryClub/index.vue'),
      meta: {
        title: $t('menus.clubData')
      }
    },
    {
      path: '/basic/queryClub',
      name: 'QueryData',
      component: () => import('@/views/basicData/queryClub/queryClub.vue'),
      meta: {
        title: $t('menus.searchClub')
      }
    }
  ]
}
