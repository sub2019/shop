import Util from '../../utils/util.js';
import { getLogo } from '../../api/api.js';
import { login } from '../../api/user.js';

let app = getApp();

Component({
  properties: {
    iShidden: {
      type: Boolean,
      value: true,
    },
    //是否自动登录
    isAuto: {
      type: Boolean,
      value: true,
    },
    isGoIndex:{
      type: Boolean,
      value:true,
    },
  },
  data: {
    cloneIner: null,
    loading:false,
    errorSum:0,
    errorNum:3
  },
  attached() {
    this.get_logo_url();
    this.setAuthStatus();
  },
  methods: {
    // 点击关闭(随便逛逛)
    close(){
      // getCurrentPages()获取当前页面栈,返回数组
      let pages = getCurrentPages();
      let currPage  = pages[pages.length - 1];
      console.log('顶层页面栈:', currPage)
      if(this.data.isGoIndex){
        wx.switchTab({url:'/pages/home/home'});
      }else{
        this.setData({
          iShidden: true
        });
        // 设置顶级页面栈的iShidden为true
        if (currPage && currPage.data.iShidden != undefined){
          currPage.setData({ iShidden:true});
          console.log('设置顶级页面栈的iShidden')
        }
      }
    },

    // 获取登录授权弹窗上面的logo图片地址
    get_logo_url: function () {
      var that = this;
      if (wx.getStorageSync('logo_url')) return this.setData({ logo_url: wx.getStorageSync('logo_url') });
      getLogo().then(res=>{
        wx.setStorageSync('logo_url', res.data.logo_url);
        that.setData({ logo_url: res.data.logo_url });
        console.log('验证组件里面的setData',that.data)
      });
    },

    //检测登录状态并执行自动登录
    setAuthStatus() {
      var that = this;
      Util.chekWxLogin().then((res)=> {
        console.log('检测登录状态,参数:', res.isLogin, res)
        let pages = getCurrentPages();
        let currPage = pages[pages.length - 1];
        if (currPage && currPage.data.iShidden != undefined) {
          currPage.setData({ iShidden:true});
          console.log('检测登录状态,顶层页面栈')
        }
        if (res.isLogin) {
          if (!Util.checkLogin()) return Promise.reject({ authSetting: true, msg: '用户token失效', userInfo: res.userInfo});
          that.triggerEvent('onLoadFun', app.globalData.userInfo);
        }else{
          // 自动登录
          wx.showLoading({ title: '正在登录中' });
          that.setUserInfo(res.userInfo,true);
        }
      }).catch(res=>{
        if (res.authSetting === false) {
          //没有授权不会自动弹出登录框
          if (that.data.isAuto === false) return;
          //自动弹出授权
          that.setData({ iShidden: false });
        } else if (res.authSetting){
          //授权后登录token失效了
          that.setUserInfo(res.userInfo);
        }
      })
    },

    //点击授权并登录(获取用户基本信息和登录凭证,把登录凭证写入用户信息)
    setUserInfo(userInfo,isLogin) {
      // userInfo参数是open-type="getUserInfo"自动获取的, 相当于e, function (e){}
      console.log('参数1:用户基本信息', userInfo)
      console.log('参数2:是否登录', isLogin)
      let that = this;
      wx.showLoading({ title: '正在登录中' });
      if (isLogin){
        that.getWxUserInfo(userInfo);
      }else{
        console.log('点击登录====================')
        Util.getCodeLogin((res)=>{
            Util.wxgetUserInfo().then(userInfo=>{
              console.log('获取基本用户信息:', userInfo)
              userInfo.code = res.code;
              that.getWxUserInfo(userInfo);
            }).catch(res=>{
              wx.hideLoading();
            });
        });
      }
    },

    // 登录,把token,userInfo,expires_time,is_log写入全局,把cache_key写入本地缓存
    getWxUserInfo: function (userInfo){
      let that = this;
      userInfo.spread_spid = app.globalData.spid;//获取推广人ID
      userInfo.spread_code = app.globalData.code;//获取推广人分享二维码ID
      login(userInfo).then(res => {
        app.globalData.token = res.data.token;
        app.globalData.isLog = true;
        app.globalData.userInfo = res.data.userInfo;
        app.globalData.expiresTime = res.data.expires_time;
        // cache_key缓存秘钥
        if (res.data.cache_key) wx.setStorage({ key: 'cache_key', data: res.data.cache_key });
        //取消登录提示
        wx.hideLoading();
        //关闭授权弹出窗口
        that.setData({ iShidden: true, errorSum: 0 });
        //执行登录完成回调
        that.triggerEvent('onLoadFun', app.globalData.userInfo);
      }).catch((err) => {
        wx.hideLoading();
        that.data.errorSum++;
        that.setData({ errorSum: that.data.errorSum });
        if (that.data.errorSum >= that.data.errorNum) {
          Util.Tips({ title: err });
        } else {
          that.setUserInfo(userInfo);
        }
      });
    }
  },
})

