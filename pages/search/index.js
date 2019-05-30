// search.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')

Page({
  data: {
    searchValue: '',
    showResult: false,
    showHistory: true,
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
    // 获取搜索匹配列表
    WXAPI.getSearchList({
      timestamp: Date.parse(new Date()),
      keywordPrefix: this.data.searchValue
    }).then(function (res) {
      if (res.code == '200') {
        if (res.data && res.data.length > 0) {
          that.setData({
            searchResult: res.data,
            showResult: true,
            showHistory: false
          })
        } else {
          that.setData({
            searchResult: [],
            showResult: false,
            showHistory: true
          })
        }
      }
    })
  },
  /**
   * 搜索提交
   */
  search: function (e, data = this.data.searchValue) {
    // 记录最近搜索
    if (data.trim()) {
      let historySearch = wx.getStorageSync("historySearch") || []
      let index = historySearch.indexOf(data)
      index > -1 && historySearch.splice(index, 1)
      historySearch.unshift(data)
      wx.setStorageSync('historySearch', historySearch)
      // 跳转到商品列表页面
      this.goList(data)
    }
  },
  /**
    * 清空搜索历史
    */
  searchDel: function () {
    wx.removeStorageSync("historySearch")
    this.getHistorySearch();
  },
  /**
     * 跳转到最近搜索/列表搜索
     */
  goSearch: function (e) {
    let data = e.target.dataset.text
    this.search(e, data)
  },
  /**
    * 商品列表页面
    */
  goList: function (data = this.data.searchValue) {
    if (data.trim()) {
      let param = {
        searchValue: data
      }
      routes.navigateTo("goodsList", param)
    }
  }
})