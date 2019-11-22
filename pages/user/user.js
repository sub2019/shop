const app = getApp();

// import { getMenuList, getUserInfo} from '../../api/user.js';
// import { switchH5Login } from '../../api/api.js';
// import authLogin from '../../utils/autuLogin.js';
// import util from '../../utils/util.js';

import { getMenuList, getUserInfo} from '../../api/user.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    MyMenus: [],
    isGoIndex:false,// 关闭授权弹窗后,是否直接跳转到首页
    iShidden:true,
    switchActive:false,
    loginType: app.globalData.loginType,// 用户类型 routine->普通用户
    orderStatusNum:{},
    canIUse: true
  },

  close:function(){
    this.setData({ switchActive:false});
  },
  /**
   * 授权回调
  */
  onLoadFun:function(e){
    console.log('授权回调触发:', e)
    this.getUserInfo();
    this.getMyMenus();
  },
  /**
   *
   * 设置用户中心菜单
  */
  getMyMenus: function () {
    var that = this;
    if (this.data.MyMenus.length) return;
    // 我的服务列表
    getMenuList().then(res=>{
      that.setData({ MyMenus: res.data.routine_my_menus });
    });
  },
  /**
   * 获取个人用户信息
  */
  getUserInfo:function(){
    var that=this;
    // 再封装的getUserInfo,也就是上面引入的
    getUserInfo().then(res=>{
      that.setData({ userInfo: res.data, loginType: res.data.login_type, orderStatusNum: res.data.orderStatusNum});
    });
  },
  /**
   * 页面跳转(所有页面)
  */
  goPages:function(e){
    if(app.globalData.isLog){
      if (e.currentTarget.dataset.url == '/pages/user_spread_user/user_spread_user' && this.data.userInfo.statu==1) {
        if (!this.data.userInfo.is_promoter) return app.Tips({ title: '您还没有推广权限！！' });
      }
      if (e.currentTarget.dataset.url == '/pages/logon/index') return this.setData({ switchActive:true});
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }else{
      this.setData({ iShidden:false});
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserInfo();
    // this.getMyMenus();
    this.setData({ MyMenus:app.globalData.MyMenus});// 第一次进入前清空服务菜单
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ switchActive: false });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  onShow:function(){
    let that = this;
    if (app.globalData.isLog) this.getUserInfo();
  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },
})




// 模拟数据
// const MyMenus = [
//   {
//     "pic": "/imgs/img/memberCenter.png",
//     "name": "会员中心",
//     "url": "/pages/user_vip/user_vip"
//   },
//   {
//     "pic": "/imgs/img/extension.png",
//     "name": "分销推广",
//     "url": "/pages/user_sgin/user_sgin"
//   },
//   {
//     "pic": "/imgs/img/balance.png",
//     "name": "我的余额",
//     "url": "/pages/user_money/user_money"
//   },
//   {
//     "pic": "/imgs/img/address.png",
//     "name": "地址信息",
//     "url": "/pages/user_address/user_address"
//   },
//   {
//     "pic": "/imgs/img/collection.png",
//     "name": "我的收藏",
//     "url": "/pages/user_goods_collection/user_goods_collection"
//   },
//   {
//     "pic": "/imgs/img/coupon.png",
//     "name": "优惠券",
//     "url": "/pages/user_coupon/user_coupon"
//   },
//   {
//     "pic": "/imgs/img/bargain.png",
//     "name": "砍价记录",
//     "url": "/pages/user_sgin/user_sgin"
//   }
// ]


// const userInfo = {
//   "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fxiauVW5Ruze5YCbjcLsHw2dFcAXT394e5HFPm00rJdA8tgYgaiber93P8wiayTzZIiaR9kavmIXeAOasfat4dJb1Q/132",
//   "nickname": "黑发",
//   "integral": 300, // 积分
//   "phone": 1847577985,
//   "login_type": "routine", // 用户类型 routine->普通用户
//   "orderStatusNum": {},
//   "statu": 1, // 地位
//   "is_promoter": true, // 如果不是发起人没有推广权限
//   "now_money": 2300, // 余额
//   "brokerage_price": 410, // 当前佣金
//   "couponCount": 2, // 优惠卷
//   "vip": false,
//   "vip_icon": "imgs/img/memeber.png",
//   "vip_name": "普通会员",
//   "uid": 8941987646,
//   "spread_spid": 86545646, // 推广人的id
//   "spread_code": 39794564, // 推广人二维码id
//   "cache_key": '', // 缓存秘钥
//   "code": '', // 用户登录凭证码
// }

