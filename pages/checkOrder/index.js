// pages/checkOrder/index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')
const APP = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面传值
    options: {},
    // 收货地址
    addressInfo: {},
    // 商品信息
    goodsInfo: [],
    // 总价
    totalPrice: 0,
    // 备注
    remark: '',
    // 按钮禁用
    disabled: false
  },
  onLoad: function (options) {
    let json = routes.extract(options)
    console.log(json)
    this.setData({
      options: json
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // 获取收货地址
    this.getAddressInfo()
    // 获取订单信息
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
    console.log(this.data.addressInfo)
  },
  /**
    * 获取商品信息
    */
  getGoodsInfo() {
    let goodsInfo = wx.getStorageSync('goodsInfo'), totalPrice = 0
    totalPrice = goodsInfo.reduce((acc, cur) => {
      return acc + (parseFloat((cur.retailPrice * cur.goodCount).toFixed(2)))
    }, 0)
    this.setData({ goodsInfo, totalPrice })
  },
  /**
   * 添加收货地址
   */
  addAddress() {
    routes.navigateTo('addressAdd')
  },
  /**
   * input绑定：买家备注
   */
  onInputRemark({ detail: { value } }) {
    this.setData({
      remark: value
    })
  },
  /**
    * 提交订单
    */
  onSubmitOrder() {
    let _this = this, options = _this.data.options
    // 判断收货信息
    if (!this.data.addressInfo.name) {
      APP.showError('提交失败', '未填写收货地址！', false)
      return false
    }
    // 按钮禁用, 防止二次提交
    if (_this.data.disabled) {
      return false
    }
    // _this.data.disabled = true
    // 显示loading
    // wx.showLoading({ title: '正在处理...' })


    // 单创建成功后回调--微信支付
    let callback = result => {
      // 支付失败
      if (result.code === 500) {
        APP.showError('支付失败', result.msg, false, function () {
          _this.redirectToOrder();
        })
        return false
      }
      // 发起微信支付
      APP.wxPayment({
        payment: result.payment,
        success: res => {
          _this.redirectToOrder()
        },
        fail: res => {
          App.showError('支付失败', result.msg, false, () => {
            _this.redirectToOrder();
          });
        }
      })
    }


    // 表单提交的基础数据
    let postData = {
      // 收货地址信息
      address: _this.data.addressInfo.address,
      province: _this.data.addressInfo.region[0],
      city: _this.data.addressInfo.region[1],
      area: _this.data.addressInfo.region[2],
      // 支付方式
      payType: _this.data.options.payType,
      // 联系人
      linkman: _this.data.addressInfo.name,
      // 联系电话
      phone: _this.data.addressInfo.phone,
      // 买家备注
      remark: _this.data.remark || '',
    }

    // 创建订单-立即购买
    if (options.type === 'buyNow') {
      WXAPI.orderBuyNow(Object.assign({
        goodsId: options.goodsId,
        goodsCount: options.goodsCount
      }, postData))
        .then(res => {
          callback(res)
        })
        .fail(res => {
          console.log('fail')
        })
        .complete(res => {
          // 关闭加载中提示
          // wx.hideLoading();
          // _this.data.disabled = false
        })
    }
    // 创建订单-购物车购买
    else if (options.type === 'cart') {
      WXAPI.orderCart(Object.assign({
        cartIds: options.cartIds || 0,
      }, postData))
        .then(res => {
          callback(res)
        })
        .fail(res => {
          console.log('fail')
        })
        .complete(res => {
          // 关闭加载中提示
          // wx.hideLoading();
          // _this.data.disabled = false
        })
    }
  },
  /**
   * 支付失败，跳转到未付款订单
   */
  redirectToOrder() {
    wx.navigateTo({
      url: "../orders/index"
    })
  }
})