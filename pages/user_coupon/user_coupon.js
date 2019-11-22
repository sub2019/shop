// pages/coupon-list/index.js

import { getUserCoupons } from '../../api/api.js';



const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponsList: [],
    loading:false,
  },

  /**
   * 授权回调
  */
  onLoadFun:function(){
    this.getUseCoupons();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 获取领取优惠券列表
   * 0全部 1未使用 2已使用
  */
  getUseCoupons:function(){
    var that = this;
    getUserCoupons(0).then(res=>{
      that.setData({ loading: true, couponsList: res.data });
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})


// const couponsList = [
//   {
//     "_type": 0, // 0是已经领取
//     "coupon_price": 20,
//     "coupon_title": "新手优惠卷",
//     "_add_time": "2019/10/11",
//     "_end_time": "2019/10/30",
//     "_msg": "已使用"
//   },
//   {
//    " _type": 1, // 0是已经领取
//     "coupon_price": 30,
//     "coupon_title": "满300.00可用",
//     "_add_time": "2019/10/11",
//     "_end_time": "2019/10/30",
//     "_msg": "可使用"
//   },
// ]