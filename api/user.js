import request from './../utils/request.js'

/**
 *
 * 用户相关接口
 *
 */

/**
 * 小程序用户登录
 * @param data object 小程序的用户登录信息
 */
export function login (data) {
  return request.post('wechat/mp_auth', data, { noAuth: true });
}

/**
 * 获取用户中心菜单
 *
 */
export function getMenuList () {
  return request.get('menu/user')
}

/**
 * 获取用户信息
 *
 */
export function getUserInfo () {
  return request.get('user')
}

/**
 * 修改用户信息,返回修改后的信息
 * @param object
 */
export function userEdit (data) {
  return request.post('user/edit', data)
}

/**
 * 获取用户地址列表
 * @param { object } data
 */
export function getAddressList (data) {
  return request.get('address/list', data)
}

/**
 * 设置默认地址
 * @param { int } id
 */
export function setAddressDefault (id) {
  return request.post('/address/default/set', {id: id})
}

/**
 * 删除地址
 * @param { int } id
 */
export function delAddress (id) {
  return request.post('address/del', {id: id})
}

/**
 * 获取编辑地址
 * @param { int } id
 */
export function getAddressDetail (id) {
  return request.get('address/detail/' + id)
}

/**
 * 修改地址
 * @param object data
 */
export function editAddress (data) {
  return request.post('address/edit', data)
}

/**
 * 获取默认地址
 */
export function getAddressDefault () {
  return request.get('address/default')
}

/**
 * 获取某个等级的任务(会员升级要求)
 * @param { int } id 任务ID
 */
export function userLevelTask (id) {
  return request.get('user/level/task/' + id)
}

/**
 * 检测用户是否可以成为会员
 */
export function userLevelDetection () {
  return request.get('user/level/detection')
}

/**
 * 会员等级列表
 */
export function userLevelGrade () {
  return request.get('user/level/grade')
}

/**
 * 获取活动状态
 */
export function userActivity () {
  return request.get('user/activity')
}

/**
 * 资金明细(types|0=全部, 1=消费, 2=充值, 3=返佣, 4=提现)
 */
export function getCommissionInfo (q, types) {
  return request.get('user/commission/' + types, q)
}

/**
 * 小程序充值
 */
export function rechargeRoutine (data) {
  return request.post('recharge/routine', data)
}

/**
 * 推广佣金明细
 * @param int type
 * @param object  data
 */
export function spreadCommission (type, data) {
  return request.get('spread/commission/' + type, data)
}

/**
 * 推广佣金/提现总和
 * @param { int } type
 */
export function spreadCount (type) {
  return request.get('spread/count/' + type)
}

/**
 * 获取分销海报
 */
export function spreadBanner () {
  return request.get('spread/banner', {type: 1})
}

/**
 * 设置用户海报分享
 */
export function userShare () {
  return request.get('user/share')
}

/**
 * 获取一级和二级推广用户
 * @param { object } data
 */
export function spreadPeople (data) {
  return request.post('spread/people', data)
}

/**
 * 推广订单
 */
export function spreadOrder (data) {
  return request.post('spread/order', data)
}

/**
 * 申请提现
 * @param { object } data
 */
export function extractCash (data) {
  return request.post('extract/cash', data)
}

/**
 * 提现银行/提现最低金额
 */
export function extractBank (data) {
  return request.post('extract/bank', data)
}

