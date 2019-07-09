// pages/user/index.js
const routes = require('../../router/index.js')
const App = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      image: '/images/bg1.jpg',
      name: 'YU'
    },
    orderInfo: [
      {
        title: '待付款',
        type: 'unpaidCount',
        icon: 'icon-daifukuan',

      },
      {
        title: '待发货',
        type: 'waitDeliveryCount',
        icon: 'icon-icon-test',
      },
      {
        title: '待收货',
        type: 'waitReceivedCount',
        icon: 'icon-yifahuodefuben',
      },
      {
        title: '待评价',
        type: 'waitCommentCount',
        icon: 'icon-daipingjia',
      },
      {
        title: '已完成',
        type: 'finishedCount',
        icon: 'icon-yiwancheng',
      },
    ],
    // 订单数量
    orderCount: {},
    canIUse: false
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取当前用户信息
    this.getUserInfo();
  },
  /**
    *  获取用户信息
    */
  getUserInfo() {
    let _this = this
    wx.request({
      url: 'https://easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/user/info',
      data: {
        token: App.getToken()
      },
      success: function (res) {
        if (res.data.code == 200) {
          let { orderCount } = res.data.data
          // 转换订单数量
          _this.data.orderInfo = _this.data.orderInfo.map(item => {
            item.badgeCount = orderCount[item.type]
            return item
          })
          _this.setData({ orderInfo: _this.data.orderInfo })
        } else {
          App.showError('', res.data.data, true, function () {
            App.doLogin()
          })
        }
      }
    })
  },
  /**
    *  查看收货地址
    */
  intoAddress() {
    routes.navigateTo('addressList')
  },
  /**
    *  查看订单详情
    */
  enterOrder({ currentTarget: { dataset: { index } } }) {
    routes.navigateTo('orders', { type: index })
  }
})
