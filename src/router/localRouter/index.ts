// import basicData from './basicData'
import financeData from './financeData'
/** rank 排序， // 菜单排序，值越高排的越后（只针对顶级路由）
 * home：0
 * error：98
 * permission： 89
 * login：101
 * logout：102
 *
 * basic：6
 * finance: 7
 */

// TODO: 恢复baseData 为异步路由
const basicData = []
const localFullRouter = [basicData, financeData]

export default localFullRouter
