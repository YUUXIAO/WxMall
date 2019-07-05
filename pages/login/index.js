// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  authorLogin(e) {
    let userInfo = e.detail.rawData
    let encryptedData = e.data.encryptedData
    let iv = e.data.iv
    let signature = e.data.signature
    let _this = this;
    // 拒绝登陆
    if (e.detail.errMsg !== 'getUserInfo:ok') {
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
        wx.hideLoading();
      }
    })
  },
  /**
  * 跳转回原页面
  */

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