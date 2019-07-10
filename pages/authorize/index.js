// pages/authorize.js
const WXAPI = require('../../wxapi/index')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  // 授权登陆
  bindGetUserInfo: function (e) {
    if (!e.detail.userInfo) {
      return
    }
    if (app.globalData.isConnected) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.login()
    } else {
      wx.showToast({
        title: '当前无网络！',
        icon: 'none'
      })
    }
  },
  // 登陆
  login: function () {
    const that = this
    const token = wx.getStorageSync('token');
    if (token) {
      WXAPI.checkToken(token).then(function (res) {
        if (res.code != 0) {
          // token校验失败
          wx.removeStorageSync('token')
          that.login();
        } else {
          wx.navigateBack();
        }
      })
      return;
    }
    wx.login({
      success: function (res) {
        WXAPI.login(res.code).then(res => {
          // 未注册用户 去注册
          if (res.isNotUser) {
            that.registerUser()
            return
          }
          // 登陆错误
          if (res.code != 0) {
            wx.showModal({
              title: '提示',
              content: '无法登录，请重试',
              showCancel: false
            })
            return;
          }
          // 登陆成功 设置token和用户id
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('userId', res.data.userId)
          // 回到原来的地方
          wx.navigateBack()
        })
      }
    })
  },
  // 注册
  register: function () {
    let that = this
    wx.login({
      success: function () {
        // 微信登录接口返回的 code 参数
        let code = res.code
        wx.getUserInfo({
          success: function (res) {
            let iv = res.iv
            let encryptedData = res.encryptedData
            // 调用注册接口
            WXAPI.register({
              code: code,
              encryptedData: encryptedData,
              iv: iv,
            }).then(function (res) {
              that.login();
            })
          }
        })
      }
    })
  }
})