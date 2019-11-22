import { getCategoryList} from '../../api/store.js';
// import { setFormId } from '../../api/api.js';

const app = getApp();
Page({
  data: {
    navlist: [],
    productList: [],
    navActive: 0,
    parameter: {
      'navbar': '1',
      'return': '0',
      'title':'产品分类'
    },
    navH:"",
    number:"",
    height: ""
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (res) {
    this.getAllCategory();
  },

  /**
  * 切换导航,右侧滚动到对应的商品列表
  */
  infoScroll:function(){
    var that = this;
    console.log(that.data.productList)
    var len = that.data.productList.length;
    console.log(that.data)
    that.setData({
      navH: app.globalData.navHeight,
      number: that.data.productList[len - 1].children.length
    })
    //设置商品列表高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: (res.windowHeight) * ( 750/res.windowWidth) - 98 - app.globalData.navHeight
          //res.windowHeight:获取整个窗口高度为px，*2为rpx；98为头部占据的高度；
        })
      },
    });
    var height = 0;
    var hightArr = [];
    for (var i = 0; i < len; i++) { //productList
      //获取元素所在位置
      var query = wx.createSelectorQuery().in(this);
      var idView = "#b" + i;
      query.select(idView).boundingClientRect();
      query.exec(function (res) {
        var top = res[0].top;
        hightArr.push(top);
        that.setData({
          hightArr: hightArr
        });
      });
    };
  },

  /**
  * 点击左侧的导航
  */
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    console.log(index, id);
    this.setData({
      toView: id,
      navActive: index
    });
  },

  /**
  * 获取分类列表
  */
  getAllCategory: function () {
    var that = this;
    getCategoryList().then(res=>{
      that.setData({
        productList: res.data
      });
      that.infoScroll()
    })
  },

  /**
  * 右侧商品列表滚动,对应切换到左侧对应的导航
  */
  scroll: function (e) {
    var scrollTop = e.detail.scrollTop;
    var scrollArr = this.data.hightArr;
    for (var i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0]) {
        this.setData({
          navActive: 0,
          lastActive: 0
        })
      } else if (scrollTop >= scrollArr[i] - scrollArr[0] && scrollTop < scrollArr[i + 1] - scrollArr[0]) {
        console.log(scrollArr[1] - scrollArr[0])
        this.setData({
          navActive: i
        })
      } else if (scrollTop >= scrollArr[scrollArr.length - 1] - scrollArr[0]) {
        this.setData({
          navActive: scrollArr.length - 1
        })
      }
    }
  },

  /**
  * 搜索
  */
  searchSubmitValue: function (e) {
    var that = this;
    console.log(e.detail)
    // setFormId(e.detail.formId);
    if (e.detail.value.length > 0)
      wx.navigateTo({ url: '/pages/goods_list/goods_list?searchValue=' + e.detail.value})
    else
      return app.Tips({ title:'请填写要搜索的产品信息'});
  },

  formSubmit: function (e) {
    console.log(e.detail.formId)
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

  }
})




// const productList = [
//       {
//         "id": 1,
//         "cate_name": "女装",
//         "children": [
//           {
//             "id": 1,
//             "cate_name": "时尚卫衣",
//             "pic": 'https://ltx.qmit.cn/images/nvzhuang1.jpg'
//           },
//           {
//             "id": 2,
//             "cate_name": "初秋外套",
//             "pic": "https://ltx.qmit.cn/images/nvzhuang2.jpg"
//           },
//           {
//             "id": 3,
//             "cate_name": "连衣裙",
//             "pic": "https://ltx.qmit.cn/images/nvzhuang3.jpg"
//           },
//           {
//             "id": 4,
//             "cate_name": "休闲套装",
//             "pic": "https://ltx.qmit.cn/images/nvzhuang4.jpg"
//           },
//           {
//             "id": 5,
//             "cate_name": "毛衣",
//             "pic": "https://ltx.qmit.cn/images/nvzhuang5.jpg"
//           },
//           {
//             "id": 6,
//             "cate_name": "牛仔裤",
//             "pic": "https://ltx.qmit.cn/images/nvzhuang6.jpg"
//           },
//         ]
//       },
//       {
//         "id": 2,
//         "cate_name": "美食",
//         "children": [
//           {
//             "id": 1,
//             "cate_name": "休闲零食",
//             "pic": "https://ltx.qmit.cn/images/meishi.jpg"
//           },
//           {
//             "id": 2,
//             "cate_name": "健康饮品",
//             "pic": "https://ltx.qmit.cn/images/meishi2.jpg"
//           },
//           {
//             "id": 3,
//             "cate_name": "水果生鲜",
//             "pic": "https://ltx.qmit.cn/images/meishi3.jpg"
//           },
//         ]
//       },
//       {
//         "id": 3,
//         "cate_name": "家居日用",
//         "children": [
//           {
//             "id": 1,
//             "cate_name": "厨房用品",
//             "pic": "https://ltx.qmit.cn/images/jiaju1.jpg"
//           },
//           {
//             "id": 2,
//             "cate_name": "创意收纳",
//             "pic": "https://ltx.qmit.cn/images/jiaju2.jpg"
//           },
//           {
//             "id": 3,
//             "cate_name": "洗发护发",
//             "pic": "https://ltx.qmit.cn/images/jiaju3.jpg"
//           },
//         ]
//       },
//       {
//         "id": 4,
//         "cate_name": "男装",
//         "children": [
//           {
//             "id": 1,
//             "cate_name": "外套",
//             "pic": "https://ltx.qmit.cn/images/nanzhuang1.jpg"
//           },
//           {
//             "id": 2,
//             "cate_name": "长袖衬衣",
//             "pic": "https://ltx.qmit.cn/images/nanzhuang2.jpg"
//           },
//           {
//             "id": 3,
//             "cate_name": "休闲裤",
//             "pic": "https://ltx.qmit.cn/images/nanzhuang3.jpg"
//           },
//         ]
//       },
//       {
//         "id": 5,
//         "cate_name": "鞋品",
//         "children": [
//           {
//             "id": 1,
//             "cate_name": "运动鞋",
//             "pic": "https://ltx.qmit.cn/images/xiezi1.jpg"
//           },
//           {
//             "id": 2,
//             "cate_name": "帆布鞋",
//             "pic": "https://ltx.qmit.cn/images/xiezi2.jpg"
//           },
//           {
//             "id": 3,
//             "cate_name": "高跟鞋",
//             "pic": "https://ltx.qmit.cn/images/xiezi3.jpg"
//           },
//         ]
//       }
//     ]


