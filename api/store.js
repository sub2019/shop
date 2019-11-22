import request from './../utils/request.js'

/**
 *
 * 产品相关接口
 *
 */


/**
 * 获取分类列表
 *
 */
export function getCategoryList (id) {
  return request.get('category', {})
}

/**
 * 获取产品列表
 * @param { data }  [参数]
 *
 */
export function getProductslist (data) {
  return request.get('products', data)
}

/**
 * 获取热门推荐产品
 */
export function getProductHot (page, limit) {
  return request.get("product/hot", {
    page: page === undefined ? 1: page,
    limit: limit === undefined ? 4:limit
  })
}

/**
 * 获取收藏列表
 * @param { object } data
 */
export function getCollectUserList (data) {
  return request.get('collect/user', data)
}

/**
 * 删除收藏产品
 * @param { int } id
 * @param { string } category product=普通产品, product_seckill=秒杀产品
 */
export function collectDel (id, category) {
  return request.get('collect/del', { id: id, category: category === undefined ? 'product': category })
}

