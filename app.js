const WXAPI = require('wxapi/index')
const routes = require('./router/index.js');

App({
  onLaunch: function (e) {
    // 用户版本更新
    this.updateManager()
    // 初次加载判断网络情况
    this.getNetworkType()
    // 监听网络状态变化
    this.onNetworkStatusChange()
  },

  /**
    * 执行用户登录
    */
  doLogin() {
    wx.removeStorageSync('token')
    // 保存当前页面
    let pages = getCurrentPages();
    console.log(pages)
    if (pages.length) {
      let currentPage = pages[pages.length - 1];
      "pages/login/login" != currentPage.route &&
        wx.setStorageSync("currentPage", currentPage)
    }
    console.log(wx.getStorageSync("currentPage"))
    setTimeout(() => {
      routes.navigateTo('login')
    })
  },
  /**
    * 显示成功提示框
    */
  showSuccess(msg, callback) {
    wx.showToast({
      title: msg,
      icon: 'success',
      mask: true,
      duration: 1500,
      success() {
        callback && (setTimeout(function () {
          callback()
        }, 1500))
      }
    })
  },
  /**
    * 显示失败提示框
    */
  showError(title, content, showCancel, callback) {
    wx.showModal({
      title: title || '友情提示',
      content: content,
      showCancel: showCancel || false,
      success(res) {
        callback && callback(res);
      }
    });
  },
  /**
    * 记录formId
    */
  saveFormId(formId) {
    if (formId == 'the formId is a mock one') {
      return false;
    }
    WXAPI.saveFormId(formId).then(res => {
      console.log(res)
    })
  },
  /**
   * 获取Token
   */
  getToken() {
    let token = wx.getStorageSync('token')
    return token
  },
  /**
   * 设置Token
   */
  setToken(data) {
    wx.setStorageSync('token', data)
  },
  /**
    * 发起微信支付
    */
  wxPayment(option) {
    let options = Object.assign({
      payment: {},
      success: () => { },
      fail: () => { },
      complete: () => { },
    }, option)
    wx.requestPayment({
      timeStamp: option.payment.timeStamp,
      nonceStr: option.payment.nonceStr,
      package: "prepay_id=" + option.payment.prepay_id,
      signType: 'MD5',
      paySign: option.payment.paySign,
      success(res) {
        option.success(res)
      },
      fail(res) {
        options.fail(res);
      },
      complete(res) {
        options.complete(res);
      }
    })
  },
  /**
    * 小程序主动更新
    */
  updateManager() {
    if (wx.canIUse('getUpdateManager')) {
      let updateManager = wx.getUpdateManager()
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              updateManager.applyUpdate()
            } else {
              return false
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        })
      })
    } else {
      wx.showModal({
        title: "提示",
        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
      });
    }
  },
  /**
    * 初次加载判断网络情况
    */
  getNetworkType() {
    let _this = this
    wx.getNetworkType({
      success: function (res) {
        // 返回有效类型,有效值wifi/2g/3g/4g/unknown(Android下不常见网络类型)/none(无网络)
        const networkType = res.networkType
        if (networkType == 'none') {
          _this.globaData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
  },
  /**
    * 监听网络状态变化
    */
  onNetworkStatusChange() {
    let _this = this
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        _this.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function () { }
        })
      } else {
        _this.globalData.isConnected = true
        wx.hideToast()
      }
    });
  },
  globalData: {
    // 网络连接状态
    isConnected: true
  }
})


// setdata: function (e) {
//   var obj = {};
//   obj[e.currentTarget.dataset.key] = e.currentTarget.dataset.val;
//   this.setData(obj);
// }

