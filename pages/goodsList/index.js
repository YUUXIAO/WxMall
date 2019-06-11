// pages/goodsList/index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')
const pageIndex = 'goodsList::'

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
      descSorted: true,
      matchType: 0,
      floorPrice: -1,
      upperPrice: -1,
      stillSearch: false,
      searchWordSource: 1,
      size: 10,
      keyword: ''
    },
    // 商品列表
    goodsList: [],
    // 商品列表分页信息
    pagination: {},
    // 列表排列方式
    showView: true,
    showLoadEnd: false
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
    // 设置列表显示方式
    this.setShowView();
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
   * 设置默认列表显示方式
   */
  setShowView() {
    let _this = this;
    _this.setData({
      showView: wx.getStorageSync(`${pageIndex}showview`) || false
    });
  },
  /**
    * 切换列表排列方式
    */
  changeShowState() {
    let _this = this, showView = !this.data.showView
    wx.setStorageSync(`${pageIndex}showview`, showView)
    _this.setData({
      showView
    })
  },
  /**
  * 切换筛选条件
  */
  switchTab(e) {
    let _this = this, type = e.currentTarget.dataset.type,
      sortType = type == 'price' ? 1 : 0,
      descSorted = true
    if (type == 'price') {
      descSorted = !this.data.searchControl.descSorted
    }
    _this.setData({
      'searchControl.page': 1,
      'searchControl.sortType': sortType,
      'searchControl.descSorted': descSorted,
      goodsList: [],
      pagination: {},

    }, () => {
      _this.getGoodsList()
    })
  },
  /**
    * 获取商品列表
    */
  getGoodsList: function () {
    if (!this.data.pagination.lastPage) {
      WXAPI.getSearchGoodsList(this.data.searchControl).then(res => {
        let data = res.data.directly.searcherResult
        this.setData({
          goodsList: this.data.goodsList.concat(data.result),
          pagination: data.pagination
        })
        if (this.data.pagination.lastPage) {
          this.setData({
            showLoadEnd: true
          })
        }
      })
    }
  },
  goDetail: function (e) {
    console.log(111111111)
    let index = e.currentTarget.dataset.index
    let goodDetail = this.data.goodsList[index]
    let param = {
      id: e.currentTarget.dataset.id
    }
    console.log(index)
    wx.setStorageSync('goodDetail', goodDetail)
    routes.navigateTo('goodsDetail', param)
  },
  searchInput: function () {
    let param = {
      searchValue: this.data.searchControl.keyword
    }
    routes.navigateTo("search", param)
  },
  /**
    * 下拉到底加载数据
    */
  bindDownLoad() {
    // 已经是最后一页
    if (this.data.searchControl.page >= this.data.pagination.totalPage) {
      this.setData({
        noMore: true
      });
      return false;
    } else {
      this.setData({
        'searchControl.page': ++this.data.searchControl.page
      });
    }
    // 加载下一页
    this.getGoodsList()
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