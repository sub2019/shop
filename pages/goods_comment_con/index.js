import { orderProduct, orderComment} from '../../api/order.js';

const productInfo = {

}

const app=getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '商品评价',
      'color': false,
    },
    scoreList:[
      { 'name': '商品质量','stars':0},
      { 'name': '服务态度','stars':0},
    ],
    pics:[],
    orderId:'',
    unique:'',
    productInfo:{},
    cart_num:0,
  },

  /**
   * 授权回调
   */
  onLoadFun:function(){
    this.getOrderProduct();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.unique || !options.uni) return app.Tips({title:'缺少参数'},{tab:3,url:1});
    this.setData({ unique: options.unique, orderId: options.uni});
  },

  /**
   * 获取某个产品详情(orderProduct接口)
   *
   */
  getOrderProduct:function(){
    var that=this;
    orderProduct(that.data.unique).then(res=>{
      that.setData({ productInfo: res.data.productInfo, cart_num: res.data.cart_num });
    });
  },

  /**
   * 评价星级
   */
  stars: function (e) {
    var index = e.target.dataset.index;
    var indexw = e.target.dataset.indexw;
    this.data.scoreList[indexw].stars = index
    this.setData({
      scoreList: this.data.scoreList
    })
  },

  /**
   * 删除图片
   *
   */
  DelPic: function (e) {
    var index = e.target.dataset.index, that = this, pic = this.data.pics[index];
    that.data.pics.splice(index, 1);
    that.setData({ pics: that.data.pics });
  },

  /**
   * 上传文件
   *
   */
  uploadpic: function () {
    var that = this;
    util.uploadImageOne('upload/image', function (res) {
      console.log(res);
      that.data.pics.push(res.data.url);
      that.setData({ pics: that.data.pics });
    });
  },

  /**
   * 立即评价(orderComment接口)
   */
  formSubmit:function(e){
    var formId = e.detail.formId, value = e.detail.value, that = this,
      product_score = that.data.scoreList[0].stars, service_score = that.data.scoreList[1].stars;
    if (!value.comment) return app.Tips({ title:'请填写你对宝贝的心得！'});
    value.product_score = product_score;
    value.service_score = service_score;
    value.pics=that.data.pics;
    value.unique = that.data.unique;
    wx.showLoading({ title: "正在发布评论……" });
    orderComment(value).then(res=>{
      wx.hideLoading();
      return app.Tips({ title: '感谢您的评价!', icon: 'success' }, '/pages/order_details/index?order_id=' + that.data.orderId);
    }).catch(err=>{
      wx.hideLoading();
      return app.Tips({ title: err });
    });
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

  }
})