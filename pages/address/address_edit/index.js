// pages/address/address_add/index.js
var address = require('../../../utils/city.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseProvience: "省份",
    chooseCity: "城市",
    chooseArea: "区县",
    address:"城市、区县、街道",
    showCity: false,
    showArea: false,
    chooseConfirm: false,
    animation: '',
    currentTab: 0,
    provinces: [],
    cities: [],
    areas: [],
    value: [9999, 1, 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var provinces = []
    address.map(s => {
      provinces.push(s.name)
    })
    this.setData({
      provinces: provinces
    })
  },

  showAddress: function () {
    let systemInfo = wx.getSystemInfoSync()
    this.animation.translate(0, (-680 / 750) * systemInfo.windowWidth).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  handleConfirm: function () {
    if (this.data.chooseConfirm) {
      let systemInfo = wx.getSystemInfoSync()
      this.animation.translate(0, (680 / 750) * systemInfo.windowWidth).step()
      let address = this.data.chooseProvience + '-' + this.data.chooseCity + '-' + this.data.chooseArea
      this.setData({
        address: address,
        animation: this.animation.export(),
        chooseConfirm: false
      })


    }
  },
  provienceTap: function (e) {
    let chooseProvience = e.currentTarget.dataset.name;
    address.map(s => {
      if (s.name == chooseProvience) {
        this.setData({
          chooseProvience: chooseProvience,
          currentTab: 1,
          showCity: true,
          cities: s.cityList[0].areaList
        })
      }
    })
  },
  cityTap: function (e) {
    let chooseCity = e.currentTarget.dataset.name;
    address.map(s => {
      if (s.name == this.data.chooseProvience) {
        this.setData({
          chooseCity: chooseCity,
          currentTab: 2,
          showArea: true,
          areas: s.cityList[1].areaList
        })
      }
    })
  },
  areaTap: function (e) {
    let chooseArea = e.currentTarget.dataset.name;
    address.map(s => {
      if (s.name == this.data.chooseProvience) {
        this.setData({
          chooseArea: chooseArea,
          chooseConfirm: true
        })
      }
    })
  },
  addressChange: function (e) {
    let currentTab = e.currentTarget.dataset.index
    this.setData({
      currentTab: currentTab
    })
  },
  tabsChange: function (e) {
    let currentTab = e.detail.current
    this.setData({
      currentTab: currentTab
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 创建动画
    this.animation = wx.createAnimation({
      duration: 100,
      transformOrigin: '50% 50%',
      timingFunction: 'linear',
      success: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})