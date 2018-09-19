// pages/shoppingCart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    hasList: false,
    selectAll: false,
    totalPrice: 0,
    delBtnWidth: 185
  },
  onLoad: function(options) {
    var that = this
    wx.getStorage({
      //获取数据的key
      key: 'shoppingCart',
      success: function(res) {
        that.setData({
          cartList: that.data.cartList.concat(res.data)
        })
        // 判断购物车是否有数据
        console.log(that.data.cartList)
        console.log(that.data.cartList.length)
        if (that.data.cartList.length) {
          that.setData({
            hasList: true
          })
        } else {
          that.setData({
            hasList: false
          })
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  // 绑定减数量事件
  reduceCount: function(e) {
    var that = this
    var cartList = this.data.cartList
    var index = e.currentTarget.dataset.index
    var count = cartList[index].count
    if (count > 1) {
      cartList[index].count--
      that.setData({
        cartList: cartList
      })
    } else {
      wx.showToast({
        title: '不能再少了哦！',
        icon: 'error',
        duration: 1000
      })
    }
    this.getTotalPrice()
  },
  // 绑定加数量事件
  increaseCount: function(e) {
    var cartList = this.data.cartList
    var index = e.currentTarget.dataset.index
    cartList[index].count++
    this.setData({
      cartList: cartList
    })
    this.getTotalPrice()
  },
  // 选中商品
  selectGoods: function(e) {
    let index = e.currentTarget.dataset.index
    let carts = this.data.cartList
    let selected = carts[index].selected
    carts[index].selected = !selected
    this.setData({
      cartList: carts
    })
    this.getTotalPrice()
  },
  // 全选
  selectAllGoods: function() {
    var self = this
    let selectAll = !this.data.selectAll
    let cartList = this.data.cartList
    cartList.map(m => {
      m.selected = selectAll
    })
    this.setData({
      cartList: cartList,
      selectAll: selectAll
    })
    this.getTotalPrice()
  },
  // 计算金额
  getTotalPrice: function() {
    let cartList = this.data.cartList
    let total = 0
    cartList.map(m => {
      if (m.selected) {
        total = m.price * m.count
      }
    })
    console.log(total)
    this.setData({
      totalPrice: total.toFixed(2)
    })
  },
  // 开始滑动事件
  touchS: function(e) {},
  // 滑动中事件
  touchM: function(e) {},
  // 滑动中事件
  touchE: function(e) {},

  // 删除商品
  delItem: function() {
    console.log('del')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
