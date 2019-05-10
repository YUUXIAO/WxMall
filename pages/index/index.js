//index.js
//获取应用实例
Page({
  data: {
    tabnav: {
      tabnum: 4,
      tabIndex: 0,
      tabItems: [
        {
          title: '热卖'
        },
        {
          title: '文学'
        },
        {
          title: '保健'
        },
        {
          title: '服饰'
        },
        {
          title: '海外'
        },
        {
          title: '水果'
        },
        {
          title: '生活'
        },
        {
          title: '运动'
        },
        {
          title: '健身'
        },
        {
          title: '文学'
        }
      ]
    },
    bannerImgs: [],
    discountList: [],
    lastestLists: [],
    wellChosen: [],
    indicatorDots: false,
    autoplay: false,
    loadingShow: false,
    interval: 3000,
    duration: 800
  },
  onLoad: function (options) {
    let that = this
    // 获取banner图片
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/home/banner',
      success: function (res) {
        that.setData({
          bannerImgs: res.data.bannerImgs,
          discountList: res.data.lastestLists,
          wellChosen: res.data.wellChosen,
          lastestLists: res.data.lastestLists
        })
      }
    })
  },
  // 切换顶部导航样式
  setTab(e) {
    const tabData = e.currentTarget.dataset
    this.setData({
      'tabnav.tabIndex': tabData.tabindex
    })
  },
  // 点击商品跳转商品详情
  goodsDetail: function () {
    wx.navigateTo({
      url: '/pages/detail/index'
    })
  },
  onReachBottom: function () {
    let that = this
    this.setData({
      loadingShow: true
    })
    // 获取更多商品
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/home/banner',
      success: function (res) {
        let lastestLists = that.data.lastestLists
        res.data.lastestLists.map(m => {
          lastestLists.push(m)
        })
        that.setData({
          lastestLists: lastestLists,
          loadingShow: false
        })
      }
    })
  }
})
