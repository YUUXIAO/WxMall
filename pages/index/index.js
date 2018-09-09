//index.js
//获取应用实例
Page({
  data: {
    bannerImgs: [],
    lastestLists: [],
    wellChosen: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  onLoad: function(options) {
    var that = this;
    // 获取banner图片
    wx.request({
      url: "https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/home/banner",
      success: function(res) {
        that.setData({
          bannerImgs: res.data.bannerImgs,
          wellChosen: res.data.wellChosen,
          lastestLists: res.data.lastestLists,
        })
      }
    })
  },
  // 点击商品跳转商品详情
  goodsDetail: function(){
    wx.navigateTo({
      url: '/pages/detail/index',
    })
  }
})