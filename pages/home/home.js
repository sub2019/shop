//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    "banner_list": [
      {
        "banner": [
          {
            "pic_url": "https://ltx.qmit.cn/images/banner1.jpg",
          },
          {
            "pic_url": "https://ltx.qmit.cn/images/banner2.jpg",
          },
          {
            "pic_url": "https://ltx.qmit.cn/images/banner3.jpg",
          },
          {
            "pic_url": "https://ltx.qmit.cn/images/banner4.jpg",
          },
          {
            "pic_url": "https://ltx.qmit.cn/images/banner5.jpg",
          }
        ]
      },
    ],
    menus: [
      {
        id: 1,
        url: '/pages/category/category',
        pic: '../../imgs/img/fenlei.png',
        name: '商品分类'
      },
      {
        id: 2,
        url: '/pages/user_get_coupon/user_get_coupon',
        pic: '../../imgs/img/youhuijuan.png',
        name: '领优惠券'
      },
      {
        id: 3,
        url: '/pages/user_goods_collection/user_goods_collection',
        pic: '../../imgs/img/shoucang.png',
        name: '我的收藏'
      },
      {
        id: 4,
        url: '/pages/user_sgin/user_sgin',
        pic: '../../imgs/img/qiandao.png',
        name: '签到活动'
      },
      {
        id: 1,
        url: '/pages/logs/logs',
        pic: '../../imgs/img/tuangou.png',
        name: '拼团活动'
      },
      {
        id: 2,
        url: '/pages/user_vip/user_vip',
        pic: '../../imgs/img/vip2.png',
        name: '会员中心'
      },
      {
        id: 3,
        url: '/pages/logs/logs',
        pic: '../../imgs/img/zixun.png',
        name: '行业咨询'
      },
      {
        id: 4,
        url: '/pages/study/study',
        pic: '../../imgs/img/xuexi.png',
        name: '商学院'
      },
    ],
    bastList: [
      {
        id: 1,
        image: 'https://ltx.qmit.cn/images/chuang.jpg',
        store_name: '皮床现代简约双人床1.8米小户型主卧床婚床',
        price: 300,
        vip_price: 130,
        sales: 1203,
        unit_name: '件'
      },
      {
        id: 1,
        image: 'https://ltx.qmit.cn/images/gaogenxie.jpg',
        store_name: '2019新款百搭高跟鞋',
        price: 140,
        vip_price: 130,
        sales: 1203,
        unit_name: '件'
      },
      {
        id: 1,
        image: 'https://ltx.qmit.cn/images/beizi.jpg',
        store_name: '南极人加厚保暖棉被子',
        price: 1599,
        vip_price: 355,
        sales: 1203,
        unit_name: '件'
      },
      {
        id: 1,
        image: 'https://ltx.qmit.cn/images/zuoyi.jpg',
        store_name: '茶桌椅组合火烧石大理石茶台功夫茶几自动上水简约现代家具茶艺桌',
        price: 388,
        vip_price: 500,
        sales: 377,
        unit_name: '件'
      },
    ]
  },
  onLoad: function () {

  }
})
