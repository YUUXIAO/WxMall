// pages/detail/index.js
const routes = require('../../router/index.js');
const util = require('../../utils/util')

Page({
  data: {
    currentTab: 0,
    windowHeight: '',
    statusType: [
      { name: "待付款", page: 0 },
      { name: "待发货", page: 0 },
      { name: "待收货", page: 0 },
      { name: "待评价", page: 0 },
      { name: "已完成", page: 0 }
    ],
    orderList: ''
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

    this.getOrders()
  },
  /**
   * 获取订单列表
   */
  getOrders() {
    let _this = this
    wx.request({
      url: 'https://easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/order/list',
      success: function (res) {
        console.log(res.data.orders)
        _this.setData({
          orderList: res.data.orders
        })
      }
    })
  },
  /**
   * 切换tab栏
   */
  swichNav({ currentTarget: { dataset: { index } } }) {
    if (this.data.currentTab == index) return
    this.setData({
      currentTab: index
    })
  },
  /**
   * 切换订单内容列表
   */
  swiperChange({ detail: { current } }) {
    this.setData({
      currentTab: current
    })
    if (!this.data.orderList[current].length) this.getOrders()
  },
  onShow: function () { },
  onReady: function () { }
})