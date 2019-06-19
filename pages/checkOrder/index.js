// pages/checkOrder/index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: {},
    addressLists: []    // 收货地址 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressLists = wx.getStorageSync('addressLists'), addressInfo = {}
    if (addressLists.length > 0) {
      addressInfo = addressLists.find(s => {
        return s.isDefault
      })
      if (!addressInfo) {
        addressInfo = addressLists[0]
      }
    } else {
      addressLists = []
    }
    console.log(addressInfo)

    this.setData({
      addressInfo
    })
  },
  /**
   * 添加收货地址
   */
  addAddress() {
    routes.navigateTo('addressAdd')
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