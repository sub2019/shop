import { express } from '../../api/order.js';
import { getProductHot } from '../../api/store.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '物流信息'
    },
    orderId:'',
    product: { productInfo:{}},
    orderInfo: {},
    expressList:[],
  },

  /**
   * 授权回调
   */
  onLoadFun:function(){
    this.getExpress();
    this.get_host_product();
  },
  /**
   * 复制单号
   */
  copyOrderId:function(){
    wx.setClipboardData({ data: this.data.orderInfo.delivery_id });
  },
  /**
   * 获取物流信息
   */
  getExpress:function(){
    var that=this;
    express(that.data.orderId).then(function(res){
      var result = res.data.express.result || {};
      that.setData({
        product: res.data.order.cartInfo[0] || {},
        orderInfo: res.data.order,
        expressList: result.list || []
      });
    });
  },
  /**
   * 获取我的推荐
   */
  get_host_product: function () {
    var that = this;
    var data = { offset: 1, limit: 4 }
    getProductHot().then(function (res) {
      that.setData({ host_product: res.data });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.orderId) return app.Tips({title:'缺少订单号'});
    this.setData({ orderId: options.orderId });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})



// const data = {
//   "order": {
//     "cartInfo": [
//       {
//         "id": "86134646",
//         "checked": false,
//         "product_id": "614678913456",
//         "productInfo": {
//             "attrInfo": {
//                 "image": "https://ltx.qmit.cn/images/cart1.jpg",
//                 "suk": "大件",
//                 "price": "4.00"
//             },
//             "image": "https://ltx.qmit.cn/images/cart1.jpg",
//             "store_name": "蓝牙音箱桌面车载低音炮u盘重低音迷你音响"
//         },
//         "truePrice": "200.00",
//         "cart_num": 1,
//         "is_reply": "0"
//       }
//     ],
//     "delivery_name": "上海远东批发有限公司",
//     "delivery_id": "13465491564"
//   },
//   "express": {
//     "result": {
//       "list": [
//         {
//           "time": "2019/10/14",
//           "status": "待收货"
//         },
//         {
//           "time": "2019/10/13",
//           "status": "派送中"
//         },
//         {
//           "time": "2019/10/12",
//           "status": "运输中"
//         },
//         {
//           "time": "2019/10/11",
//           "status": "已发货"
//         }
//       ]
//     }
//   }
// }