// pages/category/index.js
Page({
  data: {
    curIndex: 0,
    isScroll: false,
    categoryNavigation: [{
        "name": "推荐专区",
        "id": "introduce"
      },
      {
        "name": "爆品区",
        "id": "hots"
      },
      {
        "name": "居家",
        "id": "furniture"
      },
      {
        "name": "鞋包",
        "id": "shoes"
      },
      {
        "name": "服饰",
        "id": "cloths"
      },
      {
        "name": "电器",
        "id": "electrical"
      },
      {
        "name": "洗护",
        "id": "toiletries"
      },
      {
        "name": "饮食",
        "id": "foods"
      },
      {
        "name": "餐厨",
        "id": "kitchen"
      },
      {
        "name": "婴童",
        "id": "babies"
      },
      {
        "name": "文体",
        "id": "literary"
      },
      {
        "name": "特色区",
        "id": "special"
      }
    ],
    toView: "fruits",
    products: []
  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function() {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function() {
      self.setData({
        isScroll: false
      })
    }, 0.1)

  },
  onLoad: function(options) {
    var that = this;
    // 获取banner图片
    wx.request({
      url: "https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/goods/category",
      success: function(res) {
        that.setData({
          products: res.data.products
        })
      }
    })
  },
  onReachBottom() {
    this.setData({
      isScroll: false
    })
  }
})