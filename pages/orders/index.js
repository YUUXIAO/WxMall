// pages/detail/index.js
Page({
  data: {
    bannerImage: [],
    price: '',
    oldPrice: '',
    title: '',
    deliver: '',
    amount: 0,
    address: '',
    currentTab: 0,
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    animation: '',
    maskShow: false,
    count: 1
  },
  tabClick: function(e) {
    let current = e.currentTarget.dataset.index
    if (this.data.currentTab == current) {
      return false
    } else {
      this.setData({
        currentTab: current
      })
    }
  },
  tabsChange: function(e) {
    let currentTab = e.detail.current
    this.setData({
      currentTab: currentTab
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // 获取商品信息
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/goods/detail',
      success: function(res) {
        that.setData({
          bannerImage: res.data.bannerImage,
          price: res.data.price,
          oldPrice: res.data.oldPrice,
          title: res.data.title,
          deliver: res.data.deliver,
          amount: res.data.amount,
          address: res.data.address,
          selected: false
        })
      }
    })
  },
  onReady: function() {
    // 创建动画
    this.animation = wx.createAnimation({
      duration: 100,
      transformOrigin: '50% 50%',
      timingFunction: 'linear',
      success: function(res) {
        console.log(res)
      }
    })
  },
  showChooseNum: function() {
    let systemInfo = wx.getSystemInfoSync()
    this.animation.translate(0, (-500 / 750) * systemInfo.windowWidth).step()
    this.setData({
      animation: this.animation.export(),
      maskShow: true
    })
  },
  reduceCount: function() {
    var that = this
    if (that.data.count > 1) {
      that.setData({
        count: that.data.count - 1
      })
    } else {
      wx.showToast({
        title: '不能再少了哦！',
        icon: 'error',
        duration: 1000
      })
    }
  },
  increaseCount: function() {
    var that = this
    that.setData({
      count: that.data.count + 1
    })
  },
  closeChooseNum: function() {
    let systemInfo = wx.getSystemInfoSync()
    this.animation.translate(0, (500 / 750) * systemInfo.windowWidth).step()

    this.setData({
      animation: this.animation.export(),
      maskShow: false
    })
  },
  // 商品加入购物车
  addtoCart: function() {
    let shoppingCart = {
      count: this.data.count,
      image: this.data.bannerImage[0],
      title: this.data.title,
      price: this.data.price,
      selected: true,
      txtStyle: ''
    }

    let self = this
    wx.setStorage({
      key: 'shoppingCart',
      data: shoppingCart,
      success: function(res) {
        wx.redirectTo({
          url: '/pages/index/index'
        })
        let systemInfo = wx.getSystemInfoSync()
        self.animation.translate(0, (500 / 750) * systemInfo.windowWidth).step()
        self.setData({
          animation: self.animation.export(),
          maskShow: false
        })
        wx.showToast({
          title: '加入购物车成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    })
  }
})
