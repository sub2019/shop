import { HTTP_REQUEST_URL } from './config.js';
import util from './utils/util.js'

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: {},
    navHeight: 0,
    url: HTTP_REQUEST_URL,
    isLog: false,
    MyMenus: [],
    loginType: "routine", // 用户类型 routine--普通用户
    spid: 888888888, // 推广人的ID
    code: 999999999, // 推广人二维码的ID
    token: '',
    expiresTime: 0, // 过期时间
  },

  /**
   * 合并数组
   * @param {array} list 请求返回产品数据
   * @param { array } sp 原始数据
   * @return { array }
   */
  SplitArray: function (list, sp) {
    return util.SplitArray(list, sp)
  },

  /**
   * 信息提示 + 跳转
   * @param { object }|string opt  例如:{title:'提示语', icon: ''} | url
   * @param { object } to_url 5种跳转方式 {tab: 1-5, url: 跳转地址}
   */
  Tips: function (opt, to_url) {
    return util.Tips(opt, to_url)
  },

  /**
   * 快捷调用助手函数
   */
  help: function () {
    return util.$h
  }
})