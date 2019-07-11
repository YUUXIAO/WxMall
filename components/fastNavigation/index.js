// components/counter/index.js
const App = getApp()


Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    _isShow: false,
    _transparent: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onTargetPage({ detail: { target: { dataset: { index } } } }) {
      let urls = App.getTabBarLinks()
      wx.switchTab({
        url: urls[index]
      })
    },
    /**
      * 导航菜单切换事件
      */
    _onToggleShow() {
      this.setData({
        _isShow: !this.data._isShow,
        _transparent: false
      })
    }
  }
})
