// pages/promoter-order/index.js

import { spreadOrder } from '../../api/user.js';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    limit: 8,
    status: false,
    recordList: [],
    recordCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getRecordOrderList();
  },
  getRecordOrderList: function () {
    var that = this;
    var page = that.data.page;
    var limit = that.data.limit;
    var status = that.data.status;
    var recordList = that.data.recordList;
    var recordListNew = [];
    if (status == true) return;
    spreadOrder({ page: page, limit: limit }).then(res=>{
      var len = res.data.list ? res.data.list.length : 0;
      var recordListData = res.data.list;
      recordListNew = recordList.concat(recordListData);
      that.setData({ recordCount: res.data.count || 0, status: limit > len, page: limit + page, recordList: recordListNew });
    });
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
//   "count": 3,
//   "list": [
//     {
//       "time": "2019/10/10",
//       "count": 2,
//       "child": [
//         {
//           "avatar": "https://ltx.qmit.cn/images/meishi2.jpg",
//           "nickname": "老虎",
//           "number": 15,
//           "order_id": 4654564,
//           "time": "2019/10/04"
//         },
//         {
//           "avatar": "https://ltx.qmit.cn/images/xiezi1.jpg",
//           "nickname": "老虎",
//           "number": 12,
//           "order_id": 4654564,
//           "time": "2019/10/04"
//         }
//       ]
//     },
//     {
//       "time": "2019/10/10",
//       "count": 1,
//       "child": [
//         {
//           "avatar": "https://ltx.qmit.cn/images/meishi.jpg",
//           "nickname": "番茄",
//           "number": 11,
//           "order_id": 124654,
//           "time": "2019/10/01"
//         }
//       ]
//     }
//   ]
// }