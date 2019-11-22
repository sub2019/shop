import request from '../utils/request.js'
/**
 * 订单相关接口库
 *
 */

/**
 * 获取购物车列表
 */
export function getCartList () {
  return request.post("cart/list")
}

/**
 * 获取订单列表
 * @param object data
 */
export function getOrderList (data) {
  return request.get('order/list', data)
}

/**
 * 获取订单统计数据
 */
export function orderData () {
  return request.get('order/data')
}

/**
 * 订单取消
 * @param { string } id
 */
export function orderCancel (id) {
  return request.post('order/cancel', {id: id})
}

/**
 * 支付订单
 * @param { object } data
 */
export function orderPay (data) {
  return request.post('order/pay', data)
}

/**
 * 删除已完成订单
 * @param { string } uni
 */
export function orderDel (uni) {
  return request.post('order/del', {uni: uni})
}

/**
 * 订单详情
 * @param string uni
 */
export function getOrderDetail (uni) {
  return request.get('order/detail/' + uni)
}

/**
 * 订单收货
 * @param { string } uni
 */
export function orderTake (uni) {
  return request.post('order/take', {uni: uni})
}

/**
 * 再次购买
 */
export function orderAgain (uni) {
  return request.post('order/again', {uni: uni})
}

/**
 * 获取物流详情
 */
export function express (uni) {
  return request.post('order/express/' + uni)
}

/**
 * 订单产品信息
 * @param string unique
 */
export function orderProduct (unique) {
  return request.post('order/product', {unique: unique})
}

/**
 * 订单评价
 * @param { object } data
 */
export function orderComment (data) {
  return request.post('order/comment', data)
}

/**
 * 订单确认获取订单详情
 * @param { string } cartId
 */
export function orderConfirm (cartId) {
  return request.post('order/confirm', {cartId: cartId})
}


