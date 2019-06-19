// pages/addressAdd/index.js
const App = getApp()
const WXAPI = require('../../wxapi/index')
const routes = require('../../router/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    disabled: false,
    errorMsg: '',
    default: false,


    addressLists: []    // 收货地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressLists = wx.getStorageSync('addressLists') ? wx.getStorageSync('addressLists') : []
    // let addressLists = wx.getStorageSync('addressLists')
    console.log(addressLists)
    this.setData({
      addressLists
    })
  },

  /**
    * 选择地区
    */
  regionChange(e) {
    let region = e.detail.value
    this.setData({
      region
    })
  },
  /**
    * 选择地区
    */
  setDefaultAddress() {
    this.setData({
      default: !this.data.default
    })
  },
  /**
    * 提交表单信息
    */
  saveData(e) {
    let _this = this, formData = e.detail.value
    formData.region = this.data.region
    formData.isDefault = this.data.default
    // 表单验证
    if (!_this.validation(formData)) {
      App.showError(_this.data.errorMsg)
      return false
    }
    // 发起请求按钮禁用
    this.setData({
      disabled: true
    })

    // WXAPI.addAddress(formData).then(res => {
    //   console.log(res)
    // })
    console.log(this.data.addressLists)
    this.data.addressLists.push(formData)
    wx.setStorageSync("addressLists", this.data.addressLists);
    App.showSuccess('添加成功！', function () {
      // routes.navigateTo('')
    })

  },
  /**
    * 提交表单信息
    */
  validation(data) {
    let reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
    if (data.name.trim() === '') {
      this.data.errorMsg = '收件人不能为空'
      return false
    }
    if (data.phone.length < 1) {
      this.data.errorMsg = '手机号不能为空'
      return false
    }
    // if (!reg.test(data.phone)) {
    //   this.data.errorMsg = '手机号不符合要求'
    //   return false
    // }
    if (!this.data.region) {
      this.data.error = '省市区不能空';
      return false
    }
    if (data.address.trim() === '') {
      this.data.error = '详细地址不能为空';
      return false
    }
    return true
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