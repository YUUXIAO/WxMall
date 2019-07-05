//index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')
//获取应用实例
Page({
  data: {
    currentTab: 0,
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
    goodsList: [],
    wellChosen: [],
    indicatorDots: false,
    autoplay: false,
    loadingShow: false,
    interval: 3000,
    duration: 800,
    // 搜索栏
    searchParams: {
      placeholder: '搜索更多好物',
      itemStyle: {
        textAlign: 'left',
        height: '80rpx'
      }
    },
    // 轮播图
    carouselParams: {
      bannerImgs: [],
    },
    floorstatus: true
  },
  onLoad: function (options) {
    let that = this
    // 获取商品列表
    this.getGoodsList()
    // 获取banner图片
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/home/banner',
      success: function (res) {
        that.setData({
          'carouselParams.bannerImgs': res.data.bannerImgs
        })
      }
    })
  },
  // 切换顶部导航样式
  changeCurrent(res) {
    if (this.data.currentTab == res.detail.currentNum) return;
    this.setData({
      currentTab: res.detail.currentNum
    })
  },


  // setTab(e) {
  //   const tabData = e.currentTarget.dataset
  //   this.setData({
  //     'tabnav.tabIndex': tabData.tabindex
  //   })
  // },
  /**
   * 获取商品列表
   */
  getGoodsList() {
    let _this = this
    let param = {
      categoryId: 0,
      subCategoryId: 0
    }
    WXAPI.getGoodsList(param).then(res => {
      if (res.code == 200) {
        _this.setData({
          goodsList: res.data
        })
      }
    })

  },
  /**
    * 进入商品详情页面
    */
  detail(e) {
    let index = e.currentTarget.dataset.index
    let goodDetail = this.data.goodsList[index]
    let param = {
      id: e.currentTarget.dataset.id
    }
    wx.setStorageSync('goodDetail', goodDetail)
    routes.navigateTo('goodsDetail', param)
  },
  /**
   * 获取滚动条当前位置
   */
  onPageScroll(e) {
    if (e.scrollTop > 200) {
      this.setData({
        floorstatus: true
      })
    } else {
      this.setData({
        floorstatus: false
      })
    }
  },
  /**
  * 回到顶部
  */
  goTop(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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
