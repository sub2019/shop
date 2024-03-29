import { getAddressList } from '../../api/user.js';

var app = getApp();
Component({
  properties: {
    //跳转url链接
    pagesUrl:{
      type:String,
      value:'',
    },
    address:{
      type: Object,
      value:{
        address:true,
        addressId:0,
      }
    },
    isLog:{
      type:Boolean,
      value:false,
    },
  },
  data: {
    active: 0,
    //地址列表
    addressList:[],
    is_loading:true,
  },
  attached: function () {
    this.getAddressList()
  },
  methods: {
    /**
     * 点击地址
     */
    tapAddress: function (e) {
      this.setData({ active: e.currentTarget.dataset.id });
      this.triggerEvent('OnChangeAddress', e.currentTarget.dataset.addressid);
    },

    /**
     * 关闭地址组件
     */
    close: function () {
      this.setData({ 'address.address': false });
      this.triggerEvent('changeTextareaStatus');
    },

    /**
     * 跳转到地址页
     */
    goAddressPages:function(){
      this.setData({ 'address.address': false });
      this.triggerEvent('changeTextareaStatus');
      wx.navigateTo({url: this.data.pagesUrl});
    },

    /**
     * 获取地址列表
     */
    getAddressList:function(){
      var that=this;
      getAddressList({page:1,limit:5}).then(res=>{
        var addressList = res.data;
        //处理默认选中项
        for (var i = 0, leng = addressList.length; i < leng; i++) {
          if (addressList[i].id == that.data.address.addressId) that.setData({ active: i });
        }
        that.setData({ addressList: addressList,is_loading:false });
      })
    }
  }
})