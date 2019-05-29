// search.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')

Page({
  data: {
    searchValue: '',
    historyList: [],
    searchResult: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取历史搜索
    this.getHistorySearch();
  },

  /**
     * 获取历史搜索
     */
  getHistorySearch: function () {
    let historyList = wx.getStorageSync('historySearch');
    this.setData({
      historyList
    });
  },
  /**
     * 绑定输入值
     */
  getSearchInput: function (e) {
    this.data.searchValue = e.detail.value;
    let that = this
    WXAPI.getSearchList({
      timestamp: Date.parse(new Date()),
      keywordPrefix: this.data.searchValue
    }).then(function (res) {
      if (res.code == '200') {
        that.setData({
          searchResult: res.data
        })
      }
      console.log(this.data.searchResult)
    })

  },
  /**
   * 搜索提交
   */
  search: function () {
    // 记录最近搜索
    let historySearch = wx.getStorageSync("historySearch") || []
    let index = historySearch.indexOf(this.data.searchValue)
    index > -1 && historySearch.splice(index, 1)
    historySearch.unshift(this.data.searchValue)
    wx.setStorageSync('historySearch', historySearch)
    // 跳转到商品列表页面
    this.goList()
  },
  /**
    * 清空搜索历史
    */
  searchDel: function () {
    wx.removeStorageSync("historySearch")
    this.getHistorySearch();
  },
  /**
     * 跳转到最近搜索
     */
  goSearch: function () {
    this.goList()
  },
  /**
    * 商品列表页面
    */
  goList: function () {
    let param = {
      search: this.data.searchValue
    }
    routes.navigateTo("goodsList", param)
  }
})