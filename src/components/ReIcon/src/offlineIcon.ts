import { addIcon } from '@iconify/vue/dist/offline'

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
import homeSmileLine from '@iconify-icons/ri/home-smile-line'
import InformationLine from '@iconify-icons/ri/information-line'
import signalWifiErrorLine from '@iconify-icons/ri/signal-wifi-error-line'
import lineChartLine from '@iconify-icons/ri/line-chart-line'
import barChart2Line from '@iconify-icons/ri/bar-chart-2-line'
import volumeUpLine from '@iconify-icons/ri/volume-up-line'
import userFollowLine from '@iconify-icons/ri/user-follow-line'
import arrowUpCircleLine from '@iconify-icons/ri/arrow-up-circle-line'
import settings4Line from '@iconify-icons/ri/settings-4-line'

addIcon('homeSmileLine', homeSmileLine)
addIcon('informationLine', InformationLine)
addIcon('signalWifiErrorLine', signalWifiErrorLine)
addIcon('lineChartLine', lineChartLine)
addIcon('barChart2Line', barChart2Line)
addIcon('volumeUpLine', volumeUpLine)
addIcon('userFollowLine', userFollowLine)
addIcon('arrowUpCircleLine', arrowUpCircleLine)
addIcon('settings4Line', settings4Line)
