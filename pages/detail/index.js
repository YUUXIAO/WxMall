// pages/detail/index.js
Page({
  data: {
    searchList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodDetail = wx.getStorageSync('goodDetail')
    console.log(goodDetail)
  },
  onReady: function () {

  },
  inputTyping: function (e) { }
})
