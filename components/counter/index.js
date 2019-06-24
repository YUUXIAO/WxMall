// components/counter/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 商品数量
    count: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    reduceCount() {
      let nums = this.data.count > 0 ? this.data.count : wx.showToast({ title: '你输入的数量不能为空，且不能小于0', icon: "none" });
      this.setData({
        count: --nums
      })
      this.triggerEvent('getCountNum', nums)
      this.triggerEvent('reduceEvent')
    },
    changeCount({ detail: { value } }) {
      value > 0 ? value : wx.showToast({ title: '你输入的数量不能为空，且不能小于0', icon: "none" })
      if (value.indexOf('0') == 0) {
        value = value.substring(1)
      }
      this.setData({
        count: value
      })
      this.triggerEvent('getCountNum', value)
    },
    increaseCount() {
      this.setData({
        count: ++this.data.count
      })
      this.triggerEvent('getCountNum', this.data.count)
      this.triggerEvent('increaseEvent')
    }
  }
})
