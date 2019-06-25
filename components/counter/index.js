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
    reduceEvent() {
      let nums = this.data.count
      this.setData({
        count: --nums
      })
      this.triggerEvent('getCountNum', nums)
      this.triggerEvent('reduceEvent')
    },
    changeCount({ detail: { value } }) {
      if (value.indexOf('0') == 0 && value.length > 1) {
        value = value.substring(1)
      }
      this.setData({
        count: value
      })
      this.triggerEvent('getCountNum', value)
    },
    addEvent() {
      this.setData({
        count: ++this.data.count
      })
      this.triggerEvent('getCountNum', this.data.count)
      this.triggerEvent('increaseEvent')
    }
  }
})
