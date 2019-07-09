// pages/addressAdd/index.js
const App = getApp()
const WXAPI = require('../../../wxapi/index')
const routes = require('../../../router/index.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // region: [],
    disabled: false,
    errorMsg: '',
    default: false,
    addressInfo: {
      name: '',
      phone: '',
      post: '',
      address: '',
      region: []
    },


    addressLists: []    // 收货地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    if (options.encodedData != 'undefined') {
      let json = routes.extract(options)
      // 编辑地址
      let addressInfo = wx.getStorageSync('addressInfo')
      _this.setData({
        addressInfo
      })
    } else {
      // 新增地址
      let addressLists = wx.getStorageSync('addressLists') || []
      _this.setData({
        addressLists
      })
    }

  },

  /**
    * 选择地区
    */
  regionChange(e) {
    let region = e.detail.value
    this.setData({
      'addressInfo.region': region
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
    let _this = this, formData = e.detail.value, addressLists = this.data.addressLists
    formData.region = this.data.addressInfo.region
    formData.isDefault = this.data.default
    // 发起请求按钮禁用
    this.setData({
      disabled: true
    })
    // 表单验证
    if (!_this.validation(formData)) {
      App.showError('', _this.data.errorMsg, false)
      this.setData({
        disabled: true
      })
      return false
    }

    // WXAPI.addAddress(formData).then(res => {
    //   console.log(res)
    // })
    let defaultAddress = addressLists.find(s => {
      return s.isDefault
    })
    // 存在默认地址
    if (defaultAddress && formData.isDefault) {
      wx.showModal({
        title: '提示',
        content: '已经存在默认地址是否覆盖？',
        success(res) {
          if (res.confirm) {
            addressLists.map(s => {
              s.isDefault = false
            })
          } else if (res.cancel) {
            formData.isDefault = false
          }
          _this.addressAdd(_this, addressLists, formData)
        }
      })
    } else {
      _this.addressAdd(_this, addressLists, formData)
    }
  },
  addressAdd(_this, addressLists, formData) {
    console.log(formData)
    addressLists.push(formData)
    wx.setStorageSync("addressLists", addressLists);
    App.showSuccess('添加成功！', function () {
      _this.setData({
        disabled: false
      })
      // wx.navigateBack();
    })
  },

  /**
    * 提交表单信息
    */
  validation(data) {
    console.log(data)
    let reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
    if (data.name.trim() === '') {
      this.data.errorMsg = '收件人不能为空'
      return false
    }
    if (!data.phone.length) {
      this.data.errorMsg = '手机号不能为空'
      return false
    }
    if (!reg.test(data.phone)) {
      this.data.errorMsg = '手机号不符合要求'
      return false
    }
    if (!data.region.length) {
      this.data.errorMsg = '省市区不能空';
      return false
    }
    if (data.address.trim() === '') {
      this.data.errorMsg = '详细地址不能为空';
      return false
    }
    return true
  },
  /**
    * 获取微信地址
    */
  chooseWxAddress() {
    let _this = this
    wx.chooseAddress({
      success: function (res) {
        _this.setData({
          'addressInfo.name': res.userName,
          'addressInfo.phone': res.telNumber,
          'addressInfo.address': res.detailInfo,
          'addressInfo.post': res.nationalCode,
          'addressInfo.region': [res.provinceName, res.cityName, res.countyName],
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