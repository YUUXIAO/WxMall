// pages/category/index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')



Page({
  data: {
    curIndex: 0,
    isScroll: false,
    getCategoryLists: [],
    categoryNavigation: [],
    toView: "fruits",
    products: []
  },
  switchTab(e) {
    this.setData({
      curIndex: e.target.dataset.index
    })
    // const self = this;
    // this.setData({
    //   isScroll: true
    // })
    // setTimeout(function () {
    //   self.setData({
    //     toView: e.target.dataset.id,
    //     curIndex: e.target.dataset.index
    //   })
    // }, 0)
    // setTimeout(function () {
    //   self.setData({
    //     isScroll: false
    //   })
    // }, 0.1)

  },
  onLoad: function (options) {
    var that = this;
    // 获取banner图片
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/goods/category",
    //   success: function (res) {
    //     that.setData({
    //       products: res.data.products
    //     })
    //   }
    // })

    this.getCategoryLists()
  },
  getCategoryLists() {
    let _this = this

    let data = {
      _timestamp: Date.parse(new Date())
    }
    WXAPI.getCategoryLists(data).then(res => {
      let navigationArr = []
      res.data.cateList.forEach(s => {
        navigationArr.push({ name: s.name, id: s.id })
      })
      _this.setData({
        getCategoryLists: res.data.cateList,
        categoryNavigation: navigationArr
      })

      console.log(_this.data.categoryNavigation)
    })
  },
  onReachBottom() {
    this.setData({
      isScroll: false
    })
  }
})