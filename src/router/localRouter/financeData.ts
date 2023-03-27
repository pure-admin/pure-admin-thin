export default {
  path: '/finance',
  redirect: '/finance/diamondData',
  meta: {
    title: 'menus.financeData',
    icon: 'barChart2Line',
    rank: 7
  },
  children: [
    {
      path: '/finance/diamondData',
      name: 'DiamondData',
      meta: {
        title: 'menus.diamondData',
        showParent: true
      }
    }
  ]
}
