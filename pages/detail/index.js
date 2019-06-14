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
    popupAnimation: {},
    // goodCount: 1,
    submitType: ''
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
    goodDetail.goodCount = 1
    let bannerImage = [goodDetail.scenePicUrl, goodDetail.listPicUrl, goodDetail.primaryPicUrl]
    this.setData({
      goodDetail,
      id: goodDetail.id,
      'swiper.bannerImage': bannerImage
    })
    this.getGoodRates()
  },
  goHome: function () {
    routes.navigateTo('home')
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
  * 显示底部弹窗
  */
  showPopup() {
    let _this = this
    _this.setData({
      showBottomPopup: true
    })
    let animation = wx.createAnimation({
      duration: 60,
      timingFunction: 'ease'
    })
    _this.animation = animation
    setTimeout(function () {
      _this.fadeIn()
    }, 100)
  },
  /**
  * 隐藏底部弹窗
  */
  hidePopup() {
    let _this = this;
    let animation = wx.createAnimation({
      duration: 80,
      timingFunction: 'ease',
    })
    _this.animation = animation
    _this.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      _this.setData({
        showBottomPopup: false
      })
    }, 100)
  },
  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      popupAnimation: this.animation.export()
    })
  },
  fadeDown: function () {
    this.animation.translateY(500).step()
    this.setData({
      popupAnimation: this.animation.export(),
    })
  },
  /**
    * 点击加入购物车and立即购买
    */
  onConfirmSubmit: function (e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      submitType: type
    })
    this.showPopup()
  },
  /**
  * 减少商品数量
  */
  reduceCount: function () {
    let _this = this
    if (_this.data.goodDetail.goodCount > 1) {
      _this.setData({
        'goodDetail.goodCount': --this.data.goodDetail.goodCount
      })
    }
  },
  /**
  * 增加商品数量
  */
  increaseCount: function () {
    this.setData({
      'goodDetail.goodCount': ++this.data.goodDetail.goodCount
    })
  },
  /**
  * 确定规格
  */
  confirmOrder: function () {
    let submitType = this.data.submitType
    let _this = this
    if (submitType === 'buyNow') {
      // 立即购买
      routes.navigateTo('checkOrder')
    } else if (submitType === 'addCart') {
      // 加入购物车
      let shoppingCart = wx.getStorageSync('shoppingCart') || []
      let a = shoppingCart.findIndex(ele => {
        return ele.id == _this.data.goodDetail.id
      })
      if (a > -1) {
        shoppingCart[a].goodCount += _this.data.goodDetail.goodCount
      } else {
        shoppingCart.push(_this.data.goodDetail)
      }
      wx.setStorageSync('shoppingCart', shoppingCart)
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 1000,
        complete: function () {
          _this.hidePopup()
        }
      })

    }
  },
  onReady: function () { },
  inputTyping: function (e) { }
})
