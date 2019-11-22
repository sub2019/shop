import { getProductHot } from '../../api/store.js';
import { getUserInfo, userActivity } from '../../api/user.js';

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    host_product:[],
    isClose:false,
    recharge_switch:1, // 0隐藏充值按钮,和累计充值; 1显示
  },

  /**
   * 登录回调
  */
  onLoadFun:function(){
    this.getUserInfo();
    this.get_host_product();
    this.get_activity();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 获取用户详情
   */
  getUserInfo:function(){
    var that=this;
    getUserInfo().then(res=>{
      that.setData({
        userInfo: res.data,
        recharge_switch: res.data.recharge_switch
      });
    });
  },
  /**
   * 获取活动可参与否
   */
  get_activity:function(){
    var that=this;
    userActivity().then(res=>{
      that.setData({ activity: res.data });
    })
  },
  /**
   * 获取我的推荐
   */
  get_host_product:function(){
    var that=this;
    getProductHot().then(res=>{
      that.setData({ host_product: res.data });
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.isLog && this.data.isClose) {
      this.getUserInfo();
      this.get_host_product();
      this.get_activity();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ isClose: true });
  },
})