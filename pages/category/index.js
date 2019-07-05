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