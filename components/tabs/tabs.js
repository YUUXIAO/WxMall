// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否允许滚动
    isScroll: {
      type: Boolean,
      value: false
    },
    // 渲染列表
    tabLists: {
      type: Array,
      value: ["item1", "item2", "item3", "item4"],
      observer: function (newVal, oldVal) {
        // 元素未超过4个平分页面宽度
        if (newVal && newVal.length < 5) {
          this.setData({
            _itemWidth: (750 / newVal.length)
          })
        }
      }
    },
    // 传入需要显示的tab值【不同对象取字段可能会不一样，需格式化转换】
    tabItem: {
      type: String,
      value: ''
    },
    // tab高度
    height: {
      type: String,
      value: '80'
    },
    // 字体大小
    textSize: {
      type: String,
      value: '28'
    },
    // 字体选中颜色
    selectColor: {
      type: String,
      value: '#b5272e'
    },
    // 当前选中项
    currentTab: {
      type: String,
      value: 0,
      observer: function (newVal, oldVal) {
        this.setData({
          _curIndex: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前切换卡index
    _curIndex: 0,
    _itemWidth: 128,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _swichNav({ currentTarget: { dataset: { index } } }) {
      this.triggerEvent('changeCurrent', {
        currentNum: index
      })
    }

  },
  ready() {
    // 统一格式化转换tab显示名称
    let tabLists = this.data.tabLists.map(s => {
      s._name = s[this.data.tabItem]
      return s
    })
    this.setData({
      tabLists
    })
  }
})
