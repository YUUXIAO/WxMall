// pages/address/index.js
const WXAPI = require('../../wxapi/index')
const routes = require('../../router/index.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressLists: [],
    tagData: {
      promTag: '默认'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressLists()
  },
  /**
  * 获取收货地址
  */
  getAddressLists() {
    let addressLists = wx.getStorageSync('addressLists') || []
    console.log(addressLists)
    this.setData({
      addressLists
    })
  },
  /**
    * 编辑 
    */
  addressEdit(e) {
    let index = e.currentTarget.dataset.index, addressInfo = this.data.addressLists[index]
    wx.setStorageSync("addressInfo", addressInfo);
    routes.navigateTo('addressAdd', { type: 'edit' })
  },
  /**
    * 新建地址
    */
  addAddress() {
    routes.navigateTo('addressAdd')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // let phone = this.data.phone
    // let maskPhone = phone.substr(0, 3) + "****" + phone.substr(7, 4)
    // this.setData({
    //   phone: maskPhone
    // })
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