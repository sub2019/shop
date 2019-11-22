import request from './../utils/request.js';
/**
 * 公共接口, 优惠卷接口, 行业咨询接口, 手机号码注册
 *
 */

/**
 * 保存表单id(form_id)
 * @param string formId
 */
export function setFormId(formId) {
  return request.post("wechat/set_form_id", { formId: formId })
}

/**
 * 获取登录授权弹窗的logo图片地址
 *
 */
export function getLogo () {
  return request.get('wechat/get_logo', {}, { noAuth: true } )
}


/**
 * 退出登录
 *
 */
export function logout () {
  return request.get('logout')
}

/**
 * 我的优惠卷
 * @param {int } types 0全部 1未使用 2已使用
 */
export function getUserCoupons (types) {
  return request.get('coupons/user/' + types)
}

/**
 * 领取优惠卷
 * @param {int} couponID
 */
export function setCouponReceive (couponId) {
  return request.post('coupon/receive', { couponId: couponId })
}

/**
 * 获取当前金额能使用的优惠卷
 * @param { string } price
 */
export function getCouponsOrderPrice (price) {
  return request.get('coupons/order/' + price )
}
