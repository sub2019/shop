// 手机注册逻辑没写, 图片上传逻辑没写
import { getUserInfo, userEdit} from '../../api/user.js';
import { setFormId, switchH5Login } from '../../api/api.js';
import authLogin from '../../utils/autuLogin.js';
import util from '../../utils/util.js';


const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    loginType: 'h5',//app.globalData.loginType
    userIndex: 0,
    switchUserInfo: [],
  },
  /**
   * 小程序设置
   */
  Setting: function () {
    wx.openSetting({
      success: function (res) {
        console.log(res.authSetting)
      }
    });
  },

  /**
   * 选择账号(h5)
   */
  switchAccounts: function (e) {
    let index = e.currentTarget.dataset.index, userInfo = this.data.switchUserInfo[index] , that = this;
    that.setData({ userIndex: index });
    if (that.data.switchUserInfo.length <= 1) return true;
    console.log(1111111111111)
    if (userInfo === undefined) return app.Tips({title:'切换的账号不存在'});
    if (userInfo.user_type === 'h5'){
      wx.showLoading({ title: '正在切换中' });
      switchH5Login().then(res => {
        wx.hideLoading();
        app.globalData.token = res.data.token;
        app.globalData.expires_time = res.data.time;
        app.globalData.loginType = 'h5';
        app.globalData.userInfo = res.data.userInfo;
        that.getUserInfo();
      }).catch(err => {
        wx.hideLoading();
        return app.Tips({ title: err });
      })
    }else{
      wx.showLoading({ title: '正在切换中' });
      authLogin('routine').then(res => {
        that.getUserInfo();
        wx.hideLoading();
      }).catch(err=>{
        wx.hideLoading();
        return app.Tips({ title: err });
      });
    }
  },
  /**
   * 授权回调
   */
  onLoadFun:function(){
    this.getUserInfo();
  },

  /**
   * 退出登录(h5)
   *
   */
  outLogin:function(){
    if (this.data.loginType == 'h5'){
      app.globalData.token = '';
      app.globalData.isLog = false;
      app.globalData.userInfo = {};
      app.globalData.expiresTime = 0;
      wx.showLoading({
        title: '正在退出登录',
      });
      return wx.switchTab({
        url: '/pages/index/index',
        success: function () {
          wx.hideLoading();
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getPhoneNumber:function(e){
    var detail = e.detail, cache_key = wx.getStorageSync('cache_key'),that=this;
    if (detail.errMsg =='getPhoneNumber:ok'){
      if (!cache_key){
        app.globalData.token='';
        app.globalData.isLog=false;
        return false;
      }
    }else{
      app.Tips({ title:'取消授权'});
    }
  },

  /**
   * 获取用户详情
   */
  getUserInfo:function(){
    var that=this;
    getUserInfo().then(res=>{
      console.log('获取用户详情:', res)
      that.setData({ userInfo: res.data, switchUserInfo: res.data.switchUserInfo || [] });
      for(let i=0;i<that.data.switchUserInfo.length;i++){
        if (that.data.switchUserInfo[i].uid === that.data.userInfo.uid){
          that.setData({userIndex:i});
        }
      }
    });
  },

  /**
   * 上传文件
   *
   */
  uploadpic: function () {
    var that = this;
    util.uploadImageOne('upload/image', function (res){
      var userInfo = that.data.switchUserInfo[that.data.userIndex];
      console.log('图片上传后用户信息')
      if (userInfo !== undefined){
        userInfo.avatar = res.data.url;
      }
      that.data.switchUserInfo[that.data.userIndex] = userInfo;
      that.setData({ switchUserInfo: that.data.switchUserInfo });
    });
  },

  /**
   * 提交修改(返回编辑后的信息,接口逻辑未写)
   */
  formSubmit:function(e){
    var that = this, value = e.detail.value, formId = e.detail.formId,userInfo = that.data.switchUserInfo[that.data.userIndex];
    if (!value.nickname) return app.Tips({title:'用户姓名不能为空'});
    value.avatar = userInfo.avatar;
    setFormId(formId);
    userEdit(value).then(res=>{
      return app.Tips({ title: res.msg, icon: 'success' }, { tab: 3, url: 1 });
    }).catch(msg=>{
      return app.Tips({ title: msg || '保存失败，您并没有修改' }, { tab: 3, url: 1 });
    });
  },
})

// const switchUserInfo = [
//   {
//     "uid": 463646546,
//     "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fxiauVW5Ruze5YCbjcLsHw2dFcAXT394e5HFPm00rJdA8tgYgaiber93P8wiayTzZIiaR9kavmIXeAOasfat4dJb1Q/132",
//     "nickname": "黑发",
//     "phone": 18857521905,
//     "user_type": ""
//   }
// ]
//

// {
//                 "uid": 894198764622,
//                 "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fxiauVW5Ruze5YCbjcLsHw2dFcAXT394e5HFPm00rJdA8tgYgaiber93P8wiayTzZIiaR9kavmIXeAOasfat4dJb1Q/132",
//                 "nickname": "黑发",
//                 "phone": 18857521905
//             },
//             {
//                 "uid": 894198764624,
//                 "avatar": "https://wx.qlogo.cn/mmopen/vi_32/fxiauVW5Ruze5YCbjcLsHw2dFcAXT394e5HFPm00rJdA8tgYgaiber93P8wiayTzZIiaR9kavmIXeAOasfat4dJb1Q/132",
//                 "nickname": "平安",
//                 "phone": 18857521111
//             }