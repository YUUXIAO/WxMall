//index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')

// 枚举类：首页商品分类推荐
import RecTypeEnum from '../../utils/enum/recommdType';



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
    // 轮播图片
    bannerImgs: [],
    // 商品列表
    goodsList: [],
    // 分类商品
    RecTypeEnum,
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
    // 是否显示回到顶部 
    floorstatus: false
  },
  onLoad: function (options) {
    // 获取商品列表
    this.getGoodsList()
    // 获取banner图片
    this.getBanner()
  },
  /**
    * 获取商品列表
    */
  getGoodsList(callback) {
    let _this = this
    WXAPI.getGoodsList({ categoryId: 0, subCategoryId: 0 }).then(res => {
      _this.setData({
        goodsList: res.data.splice(0, 10)
      })
    })
  },
  // 获取banner图片
  getBanner() {
    let _this = this
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/home/banner',
      success: function (res) {
        _this.setData({
          'carouselParams.bannerImgs': res.data.bannerImgs
        })
      }
    })
  },
  /**
    * 切换顶部导航样式
    */
  changeCurrent({ detail: { currentNum } }) {
    if (this.data.currentTab == currentNum) return;
    this.setData({
      currentTab: currentNum
    })
  },

  /**
    * 进入商品详情页面
    */
  detail({ currentTarget: { dataset: { index, id } } }) {
    let goodDetail = this.data.goodsList[index], param = { id }
    wx.setStorageSync('goodDetail', goodDetail)
    routes.navigateTo('goodsDetail', param)
  },
  /**
    * 获取滚动条当前位置
   */
  onPageScroll({ scrollTop }) {
    this.setData({
      floorstatus: scrollTop > 200 ? true : false
    })
  },
  /**
    * 回到顶部
    */
  goTop(e) {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  onReachBottom: function () {
    // 获取更多商品
  },
  /**
  * 下拉刷新
  */
  onPullDownRefresh: function () {
    // 获取首页数据
    this.getGoodsList(function () {
      wx.stopPullDownRefresh()
    });
  },
  /**
    * 分享当前页面
    */
  onShareAppMessage(options) {
    // 按钮转发
    if (options.from === "button") {
      return {
        title: '按钮转发',
        imageUrl: "",
        path: '/page/index?shareInfo=' + 'shareBtn',
        success: res => {
          console.log(res)
        },
        fail: res => {
          console.log(res)
        }
      }
    } else if (options.from === "menu") {
      // menu转发
      return {
        title: 'menu转发',
        imageUrl: "",
        path: '/page/index?shareInfo=' + 'shareQuery',
        success: res => {
          console.log(res)
        },
        fail: res => {
          console.log(res)
        }
      }
    }
  }
})
