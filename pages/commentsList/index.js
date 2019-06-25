// pages/commentsList/index.js
const routes = require('../../router/index.js');
const WXAPI = require('../../wxapi/index')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [],
    tagsList: [],
    filterParam: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      let json = routes.extract(options)
      this.setData({
        filterParam: json
      })
      this.getCommentsList(json)
      this.getTagsList(json)
    }
  },
  /**
  * 获取评论标签组
  */
  getTagsList: function (json) {
    let param = {
      // __timestamp: Date.parse(new Date()),
      __timestamp: util.getCurrentTimeStamp(),
      itemId: json.itemId
    }
    WXAPI.getTagsList(param).then(res => {
      if (res.code == 200) {
        this.setData({
          tagsList: res.data
        })
      }
    })
  },
  /**
    * 获取评论列表
    */
  getCommentsList: function (json) {
    WXAPI.getCommentsList(json).then(res => {
      let commentList = res.data.commentList.map(s => {
        s.createTime = util.formatTime(s.createTime, 'Y-M-D h:m')
        return s
      })
      if (res.code == 200) {
        this.setData({
          commentList: commentList
        })
      }
    })

  },
  /**
   * 点击标签筛选评论列表
   */
  fliterComments: function (e) {
    let tagName = e.currentTarget.dataset.name;
    this.setData({
      'filterParam.tag': tagName
    })
    WXAPI.fliterTagsList(this.data.filterParam).then(res => {
      if (res.code == 200) {
        this.setData({
          commentList: res.data.commentList
        })
      }
    })
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