import { getUserInfo, rechargeRoutine} from '../../api/user.js';
import { setFormId } from '../../api/api.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navRecharge: ['账户充值','佣金转入'],
    active:0,
    number:'',
    focus:true,
    userinfo:{},
    placeholder:"0.00",
  },

  /**
   * 登录授权回调
   */
  onLoadFun:function(){
    this.getUserInfo();
  },
  /**
   * 设置默认值(失去焦点)
   */
  setPlaceholderStatus:function(event){
    if (event.detail.value.length == 0) this.setData({ placeholder: '0.00' });
  },
  /**
   * 设置默认值(获得焦点)
   */
  setPlaceholder:function(){
    this.setData({ placeholder : '' })
  },
  navRecharge:function(e){
     this.setData({
       active: e.currentTarget.dataset.id
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 获取用户信息
   */
  getUserInfo:function(){
    var that = this;
    getUserInfo().then(res=>{
      that.setData({ userinfo: res.data });
    })
  },
  /*
   * 用户充值
   */
  submitSub:function(e){
    console.log(e)
    let that = this, formId = e.detail.formId, value = e.detail.value.number;
    if (parseFloat(value) < 0) return app.Tips({ title:'请输入金额'});
    setFormId(formId);
    if (that.data.active){
     wx.showModal({
       title: '转入余额',
       content: '转入余额后无法再次转出，确认是否转入余额',
       success(res){
         if (res.confirm){
           rechargeRoutine({ price: value, type: 1 }).then(res => {
             console.log('佣金转入', that.data.userinfo.now_money, value)
             console.log(app.help())
             that.setData({ 'userinfo.now_money': app.help().Add(value, that.data.userinfo.now_money) });
             return app.Tips({ title: '转入成功', icon: 'success' }, {tab:5,url:'/pages/user_money/user_money'});
           }).catch(err => {
             return app.Tips({ title: err })
           });
         } else if (res.cancel){
          return app.Tips({title:'已取消'});
         }
       },
     })
    }else{
      wx.showLoading({
        title: '正在支付',
      })
      rechargeRoutine({ price: value, type: 0}).then(res=>{
        wx.hideLoading();
        let jsConfig = res.data;
        wx.requestPayment({
          timeStamp: jsConfig.timestamp,
          nonceStr: jsConfig.nonceStr,
          package: jsConfig.package,
          signType: jsConfig.signType,
          paySign: jsConfig.paySign,
          success: function (res) {
            that.setData({ 'userinfo.now_money': app.help().Add(value, that.data.userinfo.now_money) });
            return app.Tips({ title: '支付成功', icon: 'success' }, {tab:5,url:'/pages/user_money/index'});
          },
          fail: function () {
            return app.Tips({ title: '支付失败' });
          },
          complete: function (res) {
            if (res.errMsg == 'requestPayment:cancel') return app.Tips({ title: '取消支付' });
          }
        })
      }).catch(err=>{
        wx.hideLoading();
        return app.Tips({title:err})
      });
    }
  }
})
