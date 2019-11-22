/**
 * 时间格式化
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const $h={
  //除法函数，用来得到精确的除法结果
  //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
  //调用：$h.Div(arg1,arg2)
  //返回值：arg1除以arg2的精确结果
  Div:function (arg1, arg2) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length; } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length; } catch (e) { }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return this.Mul(r1 / r2 , Math.pow(10, t2 - t1));
  },
  //加法函数，用来得到精确的加法结果
  //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
  //调用：$h.Add(arg1,arg2)
  //返回值：arg1加上arg2的精确结果
  Add: function (arg1, arg2) {
    console.log('this的指向',this)
    arg2 = parseFloat(arg2);
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(100, Math.max(r1, r2));
    return (this.Mul(arg1, m) + this.Mul(arg2, m)) / m;
  },
  //减法函数，用来得到精确的减法结果
  //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
  //调用：$h.Sub(arg1,arg2)
  //返回值：arg1减去arg2的精确结果
  Sub: function (arg1, arg2) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((this.Mul(arg1, m) - this.Mul(arg2, m)) / m).toFixed(n);
  },
  //乘法函数，用来得到精确的乘法结果
  //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
  //调用：$h.Mul(arg1,arg2)
  //返回值：arg1乘以arg2的精确结果
  Mul: function (arg1, arg2) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
}


/**
 * 合并数组(默认为空数组,把获取到的新数组的每一项通过遍历添加到空数组中)
 */
const SplitArray = function (list, sp) {
  if (typeof list != 'object') return [];
  if (sp === undefined) sp = [];
  for (var i = 0; i < list.length; i++) {
    sp.push(list[i])
  }
  return sp
}

/**
  * opt  object | string
  * to_url object | string
  * 例:
  * this.Tips('/pages/test/test'); 跳转不提示
  * this.Tips({title:'提示'},'/pages/test/test'); 提示并跳转
  * this.Tips({title:'提示'},{tab:1,url:'/pages/index/index'}); 提示并跳转值table上
  * tab=1 一定时间后跳转至 table上
  * tab=2 一定时间后跳转至非 table上
  * tab=3 一定时间后返回上页面
  * tab=4 关闭所有页面跳转至非table上
  * tab=5 关闭当前页面跳转至table上
  */
const Tips= function (opt, to_url) {
  if (typeof opt == 'string') {
    to_url = opt;
    opt = {};
  }
  var title = opt.title || '', icon = opt.icon || 'none', endtime = opt.endtime || 2000;
  if (title) wx.showToast({ title: title, icon: icon, duration: endtime })
  if (to_url != undefined) {
    if (typeof to_url == 'object') {
      var tab = to_url.tab || 1, url = to_url.url || '';
      switch (tab) {
        case 1:
          //一定时间后跳转至 table
          setTimeout(function () {
            wx.switchTab({
              url: url
            })
          }, endtime);
          break;
        case 2:
          //跳转至非table页面
          setTimeout(function () {
            wx.navigateTo({
              url: url,
            })
          }, endtime);
          break;
        case 3:
          //返回上页面
          setTimeout(function () {
            wx.navigateBack({
              delta: parseInt(url),
            })
          }, endtime);
          break;
        case 4:
          //关闭当前所有页面跳转至非table页面
          setTimeout(function () {
            wx.reLaunch({
              url: url,
            })
          }, endtime);
          break;
        case 5:
          //关闭当前页面跳转至非table页面
          setTimeout(function () {
            wx.redirectTo({
              url: url,
            })
          }, endtime);
          break;
      }

    }else if(typeof to_url == 'function'){
      setTimeout(function () {
        to_url && to_url();
      }, endtime);
    }else{
      //没有提示时跳转不延迟
      setTimeout(function () {
        wx.navigateTo({
          url: to_url,
        })
      }, title ? endtime : 0);
    }
  }
}

/**
 * 检查用户登录: 判断有无令牌,islog是否登录,过期时间
 * 例:有令牌token=true,以前登陆过isLog=true,并且没有过期,同时满足这些条件才返回true
 */
const checkLogin = function(){
  let res = getApp().globalData.token ? true : false;
  let res1 = getApp().globalData.isLog;
  let res2 = res && res1;
  if (res2){
    let newTime=Math.round(new Date() / 1000);
    if (getApp().globalData.expiresTime < newTime) return false;
  }
  return res2;
}


/**
 * 检查用户登录: 判断用户头像信息权限,通讯录权限
 */
const chekWxLogin = function(){
  return new Promise((resolve, reject)=>{
    // 获取用户当前的设置:获取用户头像权限是否打开
    wx.getSetting({
      success(res) {
        console.log('用户权限设置:', res)
        if (!res.authSetting['scope.userInfo']) {
          return reject({authSetting:false});
        } else {
          // 如果打开,读取cache_key
          wx.getStorage({
            key: 'cache_key',
            // 如果秘钥读取成功
            success(res){
              // 判断令牌,islog,过期时间是否全部都满足条件
              if (checkLogin()) {
                // 如果都满足,表示以前登陆过,从全局数据中读取用户信息,写入userinfo,把登录状态改成isLogin:true
                return resolve({ userinfo: getApp().globalData.userInfo, isLogin: true });
              } else {
                // 如果不满足,就是第一次登录,调用wxgetUserInfo获取用户信息,这里的userinfo相当于res,因为外层有了res,这里换个名字
                // 然后把秘钥写进去,设置用户信息,把登录状态改成isLogin:false
                wxgetUserInfo().then(userInfo => {
                  userInfo.cache_key = res.data;
                  return resolve({ userInfo: userInfo, isLogin: false });
                }).catch(res => {
                  return reject(res);
                })
              }
            },
            // 如果秘钥读取失败
            fail () {
              // 调用登录函数获取登录凭证code,再调用获取用户信息函数,把code写入userInfo中
              // 返回登录信息,设置登录状态isLogin: false
              getCodeLogin((code) => {
                wxgetUserInfo().then(userInfo => {
                  userInfo.code = code;
                  return resolve({ userInfo: userInfo, isLogin: false });
                }).catch(res => {
                  return reject(res);
                })
              });
            }
          })

        }
      },
      fail(res) {
        return reject(res);
      }
    })
  })
}

/**
 * wx.login获取登录凭证,通过凭证来换取登录信息,再封装,传入函数作为参数(也是回调)
 *
 */
const getCodeLogin = function(successFn){
  wx.login({
    success(res){
      successFn(res);
    }
  })
}

/**
 * 获取微信用户信息
 * 再封装,promise
 */
const wxgetUserInfo = function(){
  return new Promise((resolve, reject) =>{
    wx.getUserInfo({
      lang: 'zh_CN',
      success(res) {
        resolve(res);
      },
      fail(res){
        reject(res);
      }
    })
  });
}

/**
 * 单图上传
 * @param { object } opt [description]
 * @param { callable} successCallback 成功回调 data
 * @param { callable } errorCallback 失败回调
 */
const uploadImageOne=function (opt, successCallback, errorCallback) {
  if (typeof opt === 'string') {
    var url = opt;
    opt = {};
    opt.url = url;
  }
  var count = opt.count || 1, sizeType = opt.sizeType || ['compressed'], sourceType = opt.sourceType || ['album', 'camera'],
    is_load = opt.is_load || true, uploadUrl = opt.url || '', inputName = opt.name || 'pics';
  wx.chooseImage({
    count: count,  //最多可以选择的图片总数
    sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有
    sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      console.log('图片上传',getApp().globalData.token, res)
      //启动上传等待中...
      wx.showLoading({
        title: '图片上传中',
      });
      wx.uploadFile({
        url: getApp().globalData.url+'/api/'+uploadUrl,
        filePath: res.tempFilePaths[0],
        name: inputName,
        formData: {
          'filename': inputName
        },
        header: {
          "Content-Type": "multipart/form-data",
          // Authorization: 'Bearer '+ getApp().globalData.token
        },
        success: function (res) {
          wx.hideLoading();
          if (res.statusCode == 403) {
            Tips({ title: res.data });
          } else {
            console.log('文件上传', res)
            var data = res.data ? JSON.parse(res.data) : {};
            if (data.status == 200) {
              successCallback && successCallback(data)
            } else {
              errorCallback && errorCallback(data);
              Tips({ title: data.msg });
            }
          }
        },
        fail: function (res) {
          wx.hideLoading();
          Tips({ title: '上传图片失败' });
        }
      })
    }
  })
}



module.exports = {
  SplitArray: SplitArray,
  Tips: Tips,
  chekWxLogin: chekWxLogin,
  checkLogin: checkLogin,
  getCodeLogin: getCodeLogin,
  wxgetUserInfo: wxgetUserInfo,
  uploadImageOne: uploadImageOne,
  $h: $h
}