// Page({
//   data: {
//     inputShowed: false,
//     inputVal: ""
//   },
//   showInput: function () {
//     this.setData({
//       inputShowed: true
//     });
//   },
//   hideInput: function () {
//     this.setData({
//       inputVal: "",
//       inputShowed: false
//     });
//   },
//   clearInput: function () {
//     this.setData({
//       inputVal: ""
//     });
//   },
//   inputTyping: function (e) {
//     this.setData({
//       inputVal: e.detail.value
//     });
//   }
// });
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 匹配列表
    inputVal: {       // 属性名
      type: Array,    // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: []       // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    inputShowed: false
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */
    // 显示默认语和取消按钮
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    // 隐藏默认语和取消按钮
    hideInput: function () {
      this.setData({
        inputShowed: false
      });
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _inputTyping() {
      //触发键盘回调
      this.triggerEvent("inputTyping")
    }
  }
})