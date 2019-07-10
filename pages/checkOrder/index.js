// pages/checkOrder/index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单类型【立即购买 or 购物车结算】
    orderType: 'buyNow',
    // 收货地址
    addressInfo: {},
    // 商品信息
    goodsInfo: [],
    // 总价
    totalPrice: 0,
    // 备注
    remark: ''
  },
  onLoad: function (options) {
    // let json = routes.extract(options)
    // this.setData({
    //   orderType: json.type
    // })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // 获取收货地址
    this.getAddressInfo()
    // 获取商品信息
    this.getGoodsInfo()
  },
  /**
    * 获取收货地址
    */
  getAddressInfo() {
    let addressLists = wx.getStorageSync('addressLists'), addressInfo = {}
    if (addressLists.length > 0) {
      addressInfo = addressLists.find(s => {
        return s.isDefault
      })
      // 如果没有设置默认地址则选择第一条地址显示
      if (!addressInfo) {
        addressInfo = addressLists[0]
      }
    } else {
      addressLists = []
    }
    this.setData({
      addressInfo
    })
  },
  /**
    * 获取商品信息
    */
  getGoodsInfo() {
    let goodsInfo = wx.getStorageSync('goodsInfo'), totalPrice = 0
    totalPrice = goodsInfo.reduce((acc, cur) => {
      return acc + (parseFloat((cur.retailPrice * cur.goodCount).toFixed(2)))
    }, 0)
    console.log(goodsInfo)
    this.setData({ goodsInfo, totalPrice })
  },
  /**
   * 添加收货地址
   */
  addAddress() {
    routes.navigateTo('addressAdd')
  },
  /**
    * 提交订单
    */
  payOrder() { },
})