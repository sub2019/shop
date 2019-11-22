import { getOrderDetail, orderPay, orderAgain, orderTake, orderDel} from '../../api/order.js';
import { getUserInfo } from '../../api/user.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '订单详情',
      'color': true,
      'class': '0'
      // 'class': '2' 顶部为灰色
    },
    order_id:'',
    evaluate:0,
    cartInfo:[],//购物车产品
    orderInfo: {},//订单详情
    isGoodsReturn:false,//是否为退款订单
    status:{},//订单底部按钮状态
    isClose:false,
    payMode: [
      { name: "微信支付", icon: "icon-weixinzhifu", value: 'weixin', title: '微信快捷支付' },
      { name: "余额支付", icon: "icon-yuezhifu", value: 'yue', title: '可用余额:', number: 0 },
    ],
    pay_close: false,
    pay_order_id: '',
    totalPrice: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.order_id) this.setData({ order_id: options.order_id});
    if (options.isReturen){
      this.setData({ 'parameter.class': '2', isGoodsReturn:true });
      this.selectComponent('#navbar').setClass();
    }
  },

  /**
   * 支付组件,支付事件回调
   *
   */
  onChangeFun: function (e) {
    let opt = e.detail;
    let action = opt.action || null;
    let value = opt.value != undefined ? opt.value : null;
    (action && this[action]) && this[action](value);
  },

  /**
   * 关闭支付组件
   *
   */
  pay_close: function () {
    this.setData({ pay_close: false });
  },
  /**
   * 打开支付组件
   *
   */
  pay_open: function () {
    this.setData({
      pay_close: true,
      pay_order_id: this.data.orderInfo.order_id,
      totalPrice: this.data.orderInfo.pay_price
    });
  },
  /**
   * 支付成功回调
   *
   */
  pay_complete: function () {
    this.setData({pay_close: false, pay_order_id: '' });
    this.getOrderInfo();
  },
  /**
   * 支付失败回调
   *
   */
  pay_fail: function () {
    this.setData({ pay_close: false, pay_order_id: '' });
  },
  /**
   * 登录授权回调(getUserInfo接口, getOrderDetail接口)
   *
   */
  onLoadFun:function(){
    this.getOrderInfo();
    this.getUserInfo();
  },
  /**
   * 获取用户信息(getUserInfo接口)
   *
   */
  getUserInfo:function(){
    let that = this;
    getUserInfo().then(res=>{
      that.data.payMode[1].number = res.data.now_money;
      that.setData({ payMode: that.data.payMode });
    })
  },
  /**
   * 获取订单详细信息(getOrderDetail接口)
   *
   */
  getOrderInfo:function(){
    var that=this;
    wx.showLoading({ title: "正在加载中" });
    getOrderDetail(this.data.order_id).then(res=>{
      var _type = res.data._status._type;
      wx.hideLoading();
      that.setData({ orderInfo: res.data, cartInfo: res.data.cartInfo, evaluate: _type == 3 ? 3 : 0 });
      that.getOrderStatus();
      console.log('购物车信息', this.data.cartInfo)
    }).catch(err=>{
      wx.hideLoading();
      app.Tips({ title: err }, '/pages/order_list/index');
    });
  },
  /**
   *
   * 剪切订单号
   */
  copy:function(){
    var that=this;
    wx.setClipboardData({data: this.data.orderInfo.order_id});
  },
  /**
   * 打电话
   */
  goTel:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.orderInfo.delivery_id
    })
  },

  /**
   * 设置底部按钮
   *
   */
  getOrderStatus:function(){
    var orderInfo = this.data.orderInfo || {}, _status = orderInfo._status || { _type:0},status={};
    var type = parseInt(_status._type), combination_id = orderInfo.combination_id || 0, delivery_type = orderInfo.delivery_type,
      seckill_id = orderInfo.seckill_id ? parseInt(orderInfo.seckill_id) : 0,
      bargain_id=orderInfo.bargain_id ? parseInt(orderInfo.bargain_id) : 0,
      combination_id = orderInfo.combination_id ? parseInt(orderInfo.combination_id) : 0;
    status={
      type: type == 9 ? -9 : type,
      class_status:0
    };
    console.log('设置底部按钮1',_status._type)
    if (type == 1 && combination_id >0) status.class_status = 1;//查看拼团(暂无拼团页面)
    if (type == 2 && delivery_type == 'express') status.class_status = 2;//查看物流
    if (type == 2) status.class_status = 3;//确认收货
    if (type == 4 || type == 0) status.class_status = 4;//删除订单
    if (!seckill_id && !bargain_id && !combination_id && (type == 3 || type == 4)) status.class_status = 5;//再次购买
    this.setData({ status: status});
    console.log('设置底部按钮2',this.data.status)
  },
  /**
   * 去拼团详情
   *
   */
  goJoinPink:function(){
    // wx.navigateTo({
    //   url: '/pages/activity/goods_combination_status/index?id=' + this.data.orderInfo.pink_id,
    // });
  },
  /**
   * 再此购买(orderAgain接口)
   *
   */
  goOrderConfirm:function(){
    var that=this;
    orderAgain( that.data.orderInfo.order_id ).then(res=>{
      return wx.navigateTo({ url: '/pages/order_confirm/index?cartId=' + res.data.cateId });
    });
  },
  /**
   * 确认收货(orderTake接口, getOrderDetail接口)
   */
  confirmOrder:function(){
    var that=this;
    wx.showModal({
      title: '确认收货',
      content: '为保障权益，请收到货确认无误后，再确认收货',
      success: function (res) {
        if (res.confirm) {
          orderTake(that.data.order_id).then(res=>{
            return app.Tips({ title: '操作成功', icon: 'success' }, function () {
              that.getOrderInfo();
            });
          }).catch(err=>{
            return app.Tips({title:err});
          })
        }
      }
    })
  },
  /**
   *
   * 删除订单(orderDel接口)
   */
  delOrder:function(){
    var that=this;
    orderDel(this.data.order_id).then(res=>{
      return app.Tips({ title: '删除成功', icon: 'success' }, { tab: 3, url: 1 });
    }).catch(err=>{
      return app.Tips({title:err});
    });
  },
  /**
   * 生命周期函数--监听页面显示(getOrderDetail接口)
   */
  onShow: function () {
    if (app.globalData.isLog && this.data.isClose) {
      this.getOrderInfo();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ isClose: true });
  },
})



// const orderInfo = {
//   "status_pic": "https://ltx.qmit.cn/images/meishi2.jpg", // 产品图
//   "_status": {
//     "_msg": "待收货",  // 订单状态
//     "_payType": "微信", // 支付方式
//     "_type": "0" // 底部按钮状态
//   },
//   "add_time_y": "2019/10/10",
//   "add_time_h": "14:32",
//   "real_name": "黑发",
//   "user_phone": "18827521902",
//   "user_address": "湖北省武汉市洪山区珞珈山创意城1802",  // 地址
//   "order_id": "5646516", // 订单ID
//   "paid": false,   // 是否付款
//   "mark": "尽快发货, 颜色要天蓝色, 到货前给我打电话", // 用户信息备注
//   "status": 1,
//   "delivery_type": "express",  // 运送方式 express(快递) send(物流) fictitious(虚构)
//   "delivery_name": "上海远东批发有限公司", // 快递公司
//   "delivery_id": "13465491564",  // 派件号|手机号
//   "total_price": "12.00",  // 总价
//   "coupon_id": "6584654",    // 优惠卷ID
//   "coupon_price": "5.00",  // 优惠卷金额|抵扣金额
//   "use_integral": "120",     // 积分
//   "deduction_price": "2.00", // 积分抵扣金额
//   "pay_postage": "5.00", // 运费
//   "pay_price": "15.00",  // 应付金额
//   "cartInfo": [], // 购物车产品
//   "seckill_id": "0", // 秒杀 0(未开启) 1(开启)
//   "bargain_id": "0", // 砍价
//   "combination_id": "0", // 拼团
//   "cartInfo": [
//     {
//       "id": "86134646",
//       "checked": false,
//       "product_id": "614678913456",
//       "productInfo": {
//           "attrInfo": {
//               "image": "https://ltx.qmit.cn/images/cart1.jpg",
//               "suk": "大件"
//           },
//           "image": "",
//           "store_name": "蓝牙音箱桌面车载低音炮u盘重低音迷你音响",
//           "price": "4.00" // 单价
//       },
//       "truePrice": "200.00",
//       "cart_num": "1",// 商品数量
//       "is_reply": "0" // 评价 0(未评价) 1(已评价)
//     },
//     {
//       "id": "544616546",
//       "checked": false,
//       "product_id": "79898165787",
//       "productInfo": {
//           "attrInfo": {
//               "image": "https://ltx.qmit.cn/images/cart2.jpg",
//               "suk": "大件",
//               "price": "6.00"
//           },
//           "image": "",
//           "store_name": "原装华为重低音小音响无线蓝牙便携式运动大音量家用手机迷你音箱"
//       },
//       "truePrice": "226.00",
//       "cart_num": "1",
//       "is_reply": "1"
//     }
//   ]
// }