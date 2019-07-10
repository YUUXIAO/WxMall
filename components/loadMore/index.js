// components/counter/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftTitle: {
      type: String,
      value: ''
    },
    lfIcon1: {
      type: String,
      value: ''
    },
    lfIcon2: {
      type: String,
      value: ''
    },
    rightTitle: {
      type: String,
      value: ''
    },
    rgIcon1: {
      type: String,
      value: ''
    },
    rgIcon2: {
      type: String,
      value: ''
    },
    fontSize: {
      type: String,
      value: '30'
    },
    lColor: {
      type: String,
      value: '#999'
    },
    rColor: {
      type: String,
      value: '#999'
    },
    border: {
      type: Boolean,
      value: false
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
    leftTap() {
      this.triggerEvent('leftClick');
      this.triggerEvent('testNum', new Date());
    },
    rightTap() {
      this.triggerEvent('rightClick');

    },
  }
})
