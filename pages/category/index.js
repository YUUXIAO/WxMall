// pages/category/index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')
const util = require('../../utils/util')



Page({
  data: {
    curIndex: 0,
    isScroll: false,
    getCategoryLists: [],
    categoryNavigation: [],
    toView: 'ID1010000',
    // scrollTop: 0,
    scrollHeight: '',
    products: [],
    windowHeight: ''
  },
  switchTab(e) {
    let id = e.target.dataset.id
    let index = e.target.dataset.index
    this.setData({
      toView: 'ID' + id,
      curIndex: index
    }, this.getViewHeight)
  },
  onLoad: function (options) {
    var that = this;
    var _windowHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowHeight: _windowHeight
    })
    // 获取banner图片
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/goods/category",
    //   success: function (res) {
    //     that.setData({
    //       products: res.data.products
    //     })
    //   }
    // })
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log(res);
    //     // 可使用窗口宽度、高度 
    //     console.log('height=' + res.windowHeight);
    //     console.log('width=' + res.windowWidth);
    //     // 计算主体部分高度,单位为px 
    //     that.setData({
    //       // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将100rpx转换为px） 
    //       // main: res.windowHeight - res.windowWidth / 750 * 100
    //     })
    //   }
    // })

    this.getCategoryLists()
  },
  searchCategory(e) {
    let obj = e.currentTarget.dataset.category
    // let param = {
    //   __timestamp: Date.parse(new Date()),
    //   sortType: 0,
    //   descSorted: false,
    //   deliveryAreaId: 0,
    //   categoryId: obj.superCategoryId,
    //   subCategoryId: obj.id
    // }
    let query = {
      categoryId: obj.superCategoryId,
      subCategoryId: obj.id,
      category: true
    }
    routes.navigateTo('goodsList', query)
    // WXAPI.getCategoryDetailLists(param).then(res => { })
  },
  getCategoryLists() {
    let _this = this
    let data = {
      // _timestamp: Date.parse(new Date())
      _timestamp: util.getCurrentTimeStamp()
    }
    WXAPI.getCategoryLists(data).then(res => {
      let navigationArr = []
      res.data.cateList.forEach(s => {
        navigationArr.push({ name: s.name, id: s.id })
      })
      _this.setData({
        getCategoryLists: res.data.cateList,
        categoryNavigation: navigationArr
      }, _this.getViewHeight)
    })
  },
  getViewHeight() {
    let _this = this, query = wx.createSelectorQuery()
    query.select(`#${this.data.toView}`).boundingClientRect(res => {
      _this.setData({
        scrollHeight: res.height + 'rpx'
      })
      console.log(res)
      console.log(_this.data.scrollHeight)
    }).exec();
  },
  scroll(e) {
    console.log(e)
    // console.log(this.data.scrollHeight + '==========' + e.detail.scrollTop)
  },
  onReachBottom() {
    this.setData({
      isScroll: false
    })
  }
})