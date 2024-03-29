// import util from '../../utils/util.js';
// import { postSignUser, getSignConfig, getSignList, setSignIntegral} from '../../api/user.js';
// import { setFormId } from '../../api/api.js';

const userInfo = {
  avatar: "https://wx.qlogo.cn/mmopen/vi_32/fxiauVW5Ruze5YCbjcLsHw2dFcAXT394e5HFPm00rJdA8tgYgaiber93P8wiayTzZIiaR9kavmIXeAOasfat4dJb1Q/132",
  nickName: "黑发",
  integral: 300
}

const signCount = [0, 0, 0, 7]

const signSystemList = [
  {
    day: '第1天',
    is_sgin: true,
    is_day_sgin: false
  },
  {
    day: '第2天',
    is_sgin: true,
    is_day_sgin: false
  },
  {
    day: '第3天',
    is_sgin: true,
    is_day_sgin: false
  },
  {
    day: '第4天',
    is_sgin: true,
    is_day_sgin: false
  },
  {
    day: '第5天',
    is_sgin: true,
    is_day_sgin: false
  },
  {
    day: '第6天',
    is_sgin: true,
    is_day_sgin: false
  },
  {
    day: '第7天',
    is_sgin: true,
    is_day_sgin: false
  },
]

const signList = [
  {
    title: '签到',
    add_time: '2019-10-1 15:30:00',
    number: '20',
  },
  {
    title: '签到',
    add_time: '2019-10-2 15:30:00',
    number: '20',
  },
  {
    title: '签到',
    add_time: '2019-10-3 15:30:00',
    number: '20',
  },
  {
    title: '签到',
    add_time: '2019-10-4 15:30:00',
    number: '20',
  },
  {
    title: '签到',
    add_time: '2019-10-5 15:30:00',
    number: '20',
  },
  {
    title: '签到',
    add_time: '2019-10-6 15:30:00',
    number: '20',
  },
  {
    title: '签到',
    add_time: '2019-10-7 15:30:00',
    number: '20',
  },
]

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '签到',
      'color': true,
      'class':'0'
    },
    active:false,
    userInfo,
    signCount,
    signSystemList,
    signList,
    integral:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 授权回调
  */
  onLoadFun:function(){
    this.getUserInfo();
    this.getSignSysteam();
    this.getSignList();
  },

  /**
   * 获取签到配置
  */
  getSignSysteam:function(){
    var that=this;
    getSignConfig().then(res=>{
      that.setData({ signSystemList: res.data, day: that.Rp(res.data.length) });
    })
  },

  /**
   * 去签到记录页面
   *
  */
  goSignList:function(){
    // return app.Tips('/pages/user_sgin_list/index');
  },
  /**
   * 获取用户信息
  */
  getUserInfo:function(){
    var that=this;
    postSignUser({ sign: 1 }).then(res=>{
      res.data.integral = parseInt(res.data.integral);
      var sum_sgin_day = res.data.sum_sgin_day;
      that.setData({ userInfo: res.data, signCount: that.PrefixInteger(sum_sgin_day, 4), sign_index: res.data.sign_num });
    });
  },

  /**
   * 获取签到列表
   *
  */
  getSignList:function(){
    // var that=this;
    // getSignList({page:1,limit:3}).then(res=>{
    //   that.setData({ signList: res.data });
    // })
  },
  /**
   * 数字转中文
   *
  */
  Rp: function (n) {
    var cnum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var s = '';
    n = '' + n; // 数字转为字符串
    for (var i = 0; i < n.length; i++) {
      s += cnum[parseInt(n.charAt(i))];
    }
    return s;
  },
  /**
   * 数字分割为数组
   * @param int num 需要分割的数字
   * @param int length 需要分割为n位数组
  */
  PrefixInteger: function (num, length) {
    return (Array(length).join('0') + num).slice(-length).split('');
  },

  /**
   * 用户签到
  */
  goSign:function(e){
    // var that = this, formId = e.detail.formId, sum_sgin_day = that.data.userInfo.sum_sgin_day;
    // setFormId(formId);
    // if (that.data.userInfo.is_day_sgin) return app.Tips({title:'您今日已签到!'});
    // setSignIntegral().then(res=>{
    //   that.setData({
    //     active: true,
    //     integral: res.data.integral,
    //     sign_index: (that.data.sign_index + 1) > that.data.signSystemList.length ? 1 : that.data.sign_index + 1,
    //     signCount: that.PrefixInteger(sum_sgin_day + 1, 4),
    //     'userInfo.is_day_sgin': true,
    //     'userInfo.integral': util.$h.Add(that.data.userInfo.integral, res.data.integral)
    //   });
    //   that.getSignList();
    // }).catch(err=>{
    //   return app.Tips({title:err})
    // });

    var that = this
    that.setData({
      active: true,
      // integral: res.data.integral,
      // sign_index: (that.data.sign_index + 1) > that.data.signSystemList.length ? 1 : that.data.sign_index + 1,
      // signCount: that.PrefixInteger(sum_sgin_day + 1, 4),
      // 'userInfo.is_day_sgin': true,
      // 'userInfo.integral': util.$h.Add(that.data.userInfo.integral, res.data.integral)
    });
    // that.getSignList();
  },
  /**
   * 关闭签到提示
  */
  close:function(){
    this.setData({active: false});
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }

})