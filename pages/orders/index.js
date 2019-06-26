// pages/detail/index.js
const routes = require('../../router/index.js');


Page({
  data: {
    currentTab: 0,
    statusType: [
      { name: "待付款", page: 0 },
      { name: "待发货", page: 0 },
      { name: "待收货", page: 0 },
      { name: "待评价", page: 0 },
      { name: "已完成", page: 0 }
    ],
    windowHeight: '',

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let json = options.encodedData != 'undefined' ? routes.extract(options) : {}
    let systemInfo = wx.getSystemInfoSync()
    this.setData({
      windowHeight: systemInfo.windowHeight,
      currentTab: json && json.type ? json.type : 0
    })
  },
  onShow: function () { },
  onReady: function () { }
})