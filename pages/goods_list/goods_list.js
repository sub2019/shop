// import { getProductslist, getProductHot } from '../../api/store.js';
import { getProductslist, getProductHot } from '../../api/store.js';

const app = getApp();

// 模拟数据
// const host_product = [
//       {
//         "id": 1,
//         "image": "https://ltx.qmit.cn/images/beizi.jpg",
//         "store_name": "南极人加厚保暖棉被子",
//         "price": 300,
//         "vip_price": 130,
//         "sales": 1203,
//         "unit_name": "件"
//       },
//       {
//         "id": 2,
//         "image": "https://ltx.qmit.cn/images/gaogenxie.jpg",
//         "store_name": "2019新款百搭高跟鞋",
//         "price": 140,
//         "vip_price": 130,
//         "sales": 1203,
//         "unit_name": "件"
//       },
//       {
//         "id": 3,
//         "image": "https://ltx.qmit.cn/images/chuang.jpg",
//         "store_name": "皮床现代简约双人床1.8米小户型主卧床婚床",
//         "price": 1599,
//         "vip_price": 355,
//         "sales": 1203,
//         "unit_name": "件"
//       },
//       {
//         "id": 4,
//         "image": "https://ltx.qmit.cn/images/zuoyi.jpg",
//         "store_name": "茶桌椅组合火烧石大理石茶台功夫茶几自动上水简约现代家具茶艺桌",
//         "price": 388,
//         "vip_price": 500,
//         "sales": 377,
//         "unit_name": "件"
//       },
//       {
//         "id": 5,
//         "image": "https://ltx.qmit.cn/images/shafa1.jpg",
//         "store_name": "百纯现代简约小户型北欧风格轻奢布艺沙发客厅科技布沙发组合家具",
//         "price": 2580.00,
//         "vip_price": 2500.00,
//         "sales": 436,
//         "unit_name": "件"
//       },
//       {
//         "id": 6,
//         "image": "https://ltx.qmit.cn/images/shafa2.jpg",
//         "store_name": "北欧乳胶布艺沙发现代简约整装可拆洗大小户型客厅组合家具",
//         "price": 1888.00,
//         "vip_price": 1800.00,
//         "sales": 682,
//         "unit_name": "件"
//       }
//     ]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // host_product,
    productList: [],
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '商品列表',
      'color': true,
      'class': '0'
    },
    navH: "",
    is_switch:true,
    where: {
      sid: 0, // 商品的id
      keyword: '', // 关键字
      priceOrder: '', //价格排序
      salesOrder: '', //订单排序
      news: 0, // 是否新品
      page: 1,
      limit: 10,
      cid: 0,
    },
    price:0,
    stock:0,
    nows:false,
    loadend:false,
    loading:false,
    loadTitle:'加载更多',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options路由参数, 和跳到这个页面之前的操作有关
    console.log("路由参数",options)
    this.setData({
      ['where.sid']: options.sid || 0,
      title: options.title || '',
      ['where.keyword']: options.searchValue || '',
      navH: app.globalData.navHeight
    });

    this.get_product_list();
    console.log(this.data.productList)
    this.get_host_product();
  },

  /**
   * 切换列表样式(默认一行显示2个is_switch=true)
   */
  Changswitch:function(){
    var that = this;
    that.setData({
      is_switch: !this.data.is_switch
    })
  },

  /**
   * 搜索提交
   */
  searchSubmit: function (e) {
    var that = this;
    this.setData({ ['where.keyword']: e.detail.value, loadend: false, ['where.page']: 1 })
    this.get_product_list(true);// true ==> isPage
    console.log('点击搜索'+ ':' + '参数通过getProductslist(that.data.where)传递')
  },

  /**
  * 获取我的推荐
  */
  get_host_product: function () {
    var that = this;
    getProductHot().then(res=>{
      that.setData({ host_product: res.data });
    });
  },

  /**
  * 导航栏4个筛选按钮点击事件处理
  */
  set_where: function (e) {
    console.log('服务端数据筛选'+ ':' + '参数通过getProductslist(that.data.where)传递')
    var dataset = e.target.dataset;
    switch (dataset.type) {
      case '1':
        return wx.navigateBack({
          delta: 1, // 返回几层页面,这里是1层
        })
        break;
      case '2':
        if (this.data.price == 0)
          this.data.price = 1; // 1--价格由高-低
        else if (this.data.price == 1)
          this.data.price = 2; // 2--价格由低-高
        else if (this.data.price == 2)
          this.data.price = 0;
        this.setData({ price: this.data.price, stock: 0 });
        break;
      case '3':
        if (this.data.stock == 0)
          this.data.stock = 1;
        else if (this.data.stock == 1)
          this.data.stock = 2;
        else if (this.data.stock == 2)
          this.data.stock = 0;
        this.setData({ stock: this.data.stock, price: 0 });
        break;
      case '4':
        this.setData({ nows: !this.data.nows });
        break;
    }
    this.setData({ loadend: false, ['where.page']: 1 });
    this.get_product_list(true);
  },

  /**
  * 设置where条件(筛选条件)
  */
  setWhere: function () {
    if (this.data.price == 0)
      this.data.where.priceOrder = '';
    else if (this.data.price == 1)
      this.data.where.priceOrder = 'desc';// 价格倒序
    else if (this.data.price == 2)
      this.data.where.priceOrder = 'asc';// 价格正序
    if (this.data.stock == 0)
      this.data.where.salesOrder = '';
    else if (this.data.stock == 1)
      this.data.where.salesOrder = 'desc';// 销量倒序
    else if (this.data.stock == 2)
      this.data.where.salesOrder = 'asc';// 销量正序
    this.data.where.news = this.data.nows ? 1 : 0; // 是否新品
    this.setData({ where: this.data.where });
  },

  /**
  * 查找产品(接口每次都只加载10条数据,然后page+1,一直到最后一次加载不够10条,)
  */
  get_product_list: function (isPage) {
    console.log('isPage:', isPage)
    let that = this;
    this.setWhere();// 设置筛选条件
    if (that.data.loadend) return;
    if (that.data.loading) return;
    if (isPage === true) that.setData({ productList: [] });
    that.setData({ loading: true, loadTitle: '' });
    getProductslist(that.data.where).then(res=>{
      console.log('请求参数:',that.data.where)

      // 分页开始,正常应该在服务端分页,服务端写好分页后直接去掉这段代码,打开let list = res.data;
      let arr = res.data
      let list = []
      let page = that.data.where.page
      let pageNum = arr.length/10
      if (page <= pageNum) {
        list = arr.slice(10*page-10, 10*page)
      } else {
        list = arr.slice(10*page-10, arr.length)
      }
      // list = []
      console.log('分页列表',list)
      // 分页结束

      // let list = res.data;
      let productList = app.SplitArray(list, that.data.productList);
      let loadend = list.length < that.data.where.limit;
      that.setData({
        loadend: loadend,
        loading: false,
        loadTitle: loadend ? '已全部加载' : '加载更多',
        productList: productList,
        ['where.page']: that.data.where.page + 1,
      });
    }).catch(err=>{
      that.setData({ loading: false, loadTitle: '加载更多' });
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
    this.setData({['where.page']:1,loadend:false,productList:[]});
    this.get_product_list();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.get_product_list();
  },
})







// 模拟数据
// const productList = [
//       {
//         "id": 1,
//         "image": "https://ltx.qmit.cn/images/beizi.jpg",
//         "store_name": "南极人加厚保暖棉被子",
//         "price": 300,
//         "vip_price": 130,
//         "sales": 1203,
//         "unit_name": "件"
//       },
//       {
//         "id": 2,
//         "image": "https://ltx.qmit.cn/images/gaogenxie.jpg",
//         "store_name": "2019新款百搭高跟鞋",
//         "price": 140,
//         "vip_price": 130,
//         "sales": 1203,
//         "unit_name": "件"
//       },
//       {
//         "id": 3,
//         "image": "https://ltx.qmit.cn/images/chuang.jpg",
//         "store_name": "皮床现代简约双人床1.8米小户型主卧床婚床",
//         "price": 1599,
//         "vip_price": 355,
//         "sales": 1203,
//         "unit_name": "件"
//       },
//       {
//         "id": 4,
//         "image": "https://ltx.qmit.cn/images/zuoyi.jpg",
//         "store_name": "茶桌椅组合火烧石大理石茶台功夫茶几自动上水简约现代家具茶艺桌",
//         "price": 388,
//         "vip_price": 500,
//         "sales": 377,
//         "unit_name": "件"
//       },
//       {
//         "id": 5,
//         "image": "https://ltx.qmit.cn/images/shafa1.jpg",
//         "store_name": "百纯现代简约小户型北欧风格轻奢布艺沙发客厅科技布沙发组合家具",
//         "price": 2580.00,
//         "vip_price": 2500.00,
//         "sales": 436,
//         "unit_name": "件"
//       },
//       {
//         "id": 6,
//         "image": "https://ltx.qmit.cn/images/shafa2.jpg",
//         "store_name": "北欧乳胶布艺沙发现代简约整装可拆洗大小户型客厅组合家具",
//         "price": 1888.00,
//         "vip_price": 1800.00,
//         "sales": 682,
//         "unit_name": "件"
//       }
//     ]