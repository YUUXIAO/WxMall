// pages/detail/index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')


Page({
  data: {
    id: null,
    goodDetail: {},
    swiper: {
      bannerImage: [],
      interval: 3000,
      duration: 200
    },
    currentTab: 0,
    recommendList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options) {
    //   let json = routes.extract(options)
    //   let goodDetail = wx.getStorageSync('goodDetail')
    //   goodDetail.deliver = '免邮'
    //   let bannerImage = [goodDetail.listPicUrl, goodDetail.primaryPicUrl, goodDetail.scenePicUrl]
    //   this.setData({
    //     goodDetail,
    //     id: json.id,
    //     'swiper.bannerImage': bannerImage
    //   })
    // }
    let goodDetail = wx.getStorageSync('goodDetail')
    goodDetail.deliver = '免邮'
    let bannerImage = [goodDetail.listPicUrl, goodDetail.primaryPicUrl, goodDetail.scenePicUrl]
    this.setData({
      goodDetail,
      id: goodDetail.id,
      'swiper.bannerImage': bannerImage
    })
  },
  /**
   * 切换商品选项
   */
  tabClick: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentTab: index
    })
    index == 2 && this.getRecommend()
  },
  /**
   * 获取用户评价列表
   */
  getUserComment: function () {

  },
  /**
   * 获取更多推荐
   */
  getRecommend: function () {
    console.log('getRecommendgetRecommendgetRecommendgetRecommend')
    let param = {
      __timestamp: Date.parse(new Date()),
      itemId: this.data.id
    }
    WXAPI.getRecommendList(param).then(res => {
      if (res.code == 200) {
        // this.recommendList = res.data.items
        this.setData({
          recommendList: res.data.items
        })
      }
      console.log(this.data.recommendList)
    })
  },
  onReady: function () { },
  inputTyping: function (e) { }
})
