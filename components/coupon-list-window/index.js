import { setCouponReceive } from '../../api/api.js';
const app = getApp();
Component({
  properties: {
    coupon: {
      type: Object,
      value:{
        list:[],
        statusTile:''
      },
    },
    //打开状态 0=领取优惠券,1=使用优惠券
    openType:{
      type:Number,
      value:0,
    }
  },
  data: {
  },
  attached: function () {
  },
  methods: {
    /**
     * 关闭组件
     */
    close: function () {
      this.triggerEvent('ChangCouponsClone');
    },

    /**
     * 点击某个优惠卷
     */
    getCouponUser:function(e){
      var that = this;
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var list = that.data.coupon.list;
      if (list[index].is_use == true && this.data.openType==0) return true;
      console.log('选择优惠卷', this.data.openType)
      switch (this.data.openType){
        case 0:
          //领取优惠券
          setCouponReceive(id).then(res=>{
            list[index].is_use = true;
            that.setData({
              ['coupon.list']: list
            });
            app.Tips({ title: '领取成功' });
            that.triggerEvent('ChangCoupons', list[index]);
          });
        break;
        case 1:
          that.triggerEvent('ChangCoupons',index);
        break;
      }
    },
  }
})



// const data = [
//   {
//     "coupon_price": "12.00",   // 优惠卷价格
//     "use_min_price": "100.00", // 最低满多少元使用
//     "add_time": "2019/10/10",  // 开始时间
//     "end_time": "2019/11/10",  // 结束时间
//     "is_use": true, // true(已领取, 可以使用) false(未领取, 不能使用, 立即领取)
//     "use_title": "" // 状态文本
//   },
//   {
//     "coupon_price": "12.00",   // 优惠卷价格
//     "use_min_price": "100.00", // 最低满多少元使用
//     "add_time": "2019/10/10",  // 开始时间
//     "end_time": "2019/11/10",  // 结束时间
//     "is_use": "0",
//     "use_title": "" // 状态文本
//   },
// ]