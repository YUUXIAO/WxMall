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
    commentList: [],
    recommendList: [],
    commentData: {
      __timestamp: Date.parse(new Date()),
      itemId: '',
      tag: '全部',
      size: 10,
      page: 1,
      orderBy: 0,
      oldItemTag: '全部',
      oldItemOrderBy: 0,
      tagChanged: 0
    },
    goodRates: {},
    showBottomPopup: false,
    popupAnimation: {}
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
    console.log(goodDetail)
    goodDetail.deliver = '免邮'
    let bannerImage = [goodDetail.scenePicUrl, goodDetail.listPicUrl, goodDetail.primaryPicUrl]
    this.setData({
      goodDetail,
      id: goodDetail.id,
      'swiper.bannerImage': bannerImage
    })
    this.getGoodRates()

  },
  createAnimation() {
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    })
    this.animation = animation
    animation.translateY(700).step()
    this.setData({
      popupAnimation: animation.export(),
      showBottomPopup: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        popupAnimation: animation.export()
      })
    }.bind(this), 200)
  },
  hideAnimation() {
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    })
    this.animation = animation
    animation.translateY(700).step()
    this.setData({
      popupAnimation: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        popupAnimation: animation.export()
      })
    }.bind(this), 200)
  },
  /**
   * 切换商品选项
   */
  tabClick: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentTab: index
    })
    index == 1 && this.getRecommend()
  },
  /**
   * 获取用户评价列表
   */
  getComment: function () {
    this.setData({
      'commentData.itemId': this.data.id
    })
    routes.navigateTo('commentsList', this.data.commentData)
  },
  /**
   * 获取用户评价好评率
   */
  getGoodRates: function () {
    let param = {
      itemId: this.data.id
    }
    WXAPI.getGoodRates(param).then(res => {
      if (res.code == 200) {
        this.setData({
          goodRates: res.data
        })
      }
    })
  },
  /**
   * 获取更多推荐
   */
  getRecommend: function () {
    let param = {
      __timestamp: Date.parse(new Date()),
      itemId: this.data.id
    }
    WXAPI.getRecommendList(param).then(res => {
      if (res.code == 200) {
        this.setData({
          recommendList: res.data.items
        })
      }
    })
  },
  /**
    * 加入购物车and立即购买
    */
  onConfirmSubmit: function (e) {
    // let type = e.currentTarget.dataset.type
    this.setData({
      showBottomPopup: !this.data.showBottomPopup
    })
    this.data.showBottomPopup ? this.createAnimation() : this.hideAnimation()
  },
  onReady: function () { },
  inputTyping: function (e) { }
})
