// pages/detail/index.js
Page({
  /**
   * 页面的初始数据
   */
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
    let current = e.currentTarget.dataset.index;
    if (this.data.currentTab == current) {
      return false;
    } else {
      this.setData({
        currentTab: current
      })
    }
  },
  tabsChange: function(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    // 获取商品信息
    wx.request({
      url: "https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/goods/detail",
      success: function(res) {
        that.setData({
          bannerImage: res.data.bannerImage,
          price: res.data.price,
          oldPrice: res.data.oldPrice,
          title: res.data.title,
          deliver: res.data.deliver,
          amount: res.data.amount,
          address: res.data.address
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 创建动画
    this.animation = wx.createAnimation({
      duration: 100,
      transformOrigin: "50% 50%",
      timingFunction: "linear",
      success: function(res) {
        console.log(res)
      }
    })
  },
  showChooseNum: function() {
    let systemInfo = wx.getSystemInfoSync();
    this.animation.translate(0, -500 / 750 * systemInfo.windowWidth).step()
    this.setData({
      animation: this.animation.export(),
      maskShow: true
    })
  },
  reduceCount: function() {
    var that = this
    if(that.data.count>1){
      that.setData({
        count: that.data.count - 1
      })
    }else{
     wx.showToast({
       title: '不能再少了哦！',
       icon:'error',
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
  closeChooseNum: function(){
    console.log(1231231)
    let systemInfo = wx.getSystemInfoSync();
    this.animation.translate(0, 500 / 750 * systemInfo.windowWidth).step()

    this.setData({
      animation: this.animation.export(),
      maskShow: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})