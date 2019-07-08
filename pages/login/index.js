// pages/login/index.js
const App = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 用户授权登陆
   */
  authorLogin(e) {
    let { userInfo, encryptedData, iv, signature, errMsg } = e.detail, _this = this;
    // 拒绝登陆
    if (errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({
      title: "正在登录",
      mask: true
    });
    wx.login({
      success: function (res) {
        let code = res.code
        let param = {
          code,
          userInfo,
          encryptedData,
          iv,
          signature
        }
        _this.login(param)

      }
    })
  },
  /**
    * 发送用户信息登陆
    */
  login(data) {
    let _this = this
    // 发送用户信息
    wx.request({
      url: 'https://easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/login',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: data,
      success: function (res) {
        let { token } = res.data.data
        // 记录token 
        App.setToken(token)
        // 跳转回原页面
        _this.navigateBack();
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  /**
    * 跳转回原页面
    */
  navigateBack: function () {
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})