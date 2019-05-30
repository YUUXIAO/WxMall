// pages/goodsList/index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品列表高度
    scrollHeight: null,
    searchControl: {
      _timestamp: Date.parse(new Date()),
      page: 1,
      sortType: 0,
      categoryId: 0,
      descSorted: false,
      matchType: 1,
      floorPrice: -1,
      upperPrice: -1,
      stillSearch: false,
      searchWordSource: 1,
      size: 10,
      keyword: ''
    },
    // 商品列表
    goodsList: [],
    // 列表显示方式
    showView: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const json = routes.extract(options)
    this.setData({
      'searchControl.keyword': json.searchValue
    });
    // 设置商品列表高度
    this.setListHeight();
    // 获取商品列表
    this.getGoodsList();
  },
  /**
     * 设置商品列表高度
     */
  setListHeight() {
    let _this = this;
    wx.getSystemInfo({
      success: res => {
        _this.setData({
          scrollHeight: res.windowHeight - 90,
        });
      }
    });
  },
  /**
    * 获取商品列表
    */
  getGoodsList: function () {
    WXAPI.getGoodList(this.data.searchControl).then(res => {
      let data = res.data.directly.searcherResult
      this.setData({
        goodsList: data.result
      })
    })
  },
  searchInput: function () {
    routes.navigateTo("search")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})