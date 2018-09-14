// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    toView: "fruits",
    isScroll: false,
    categoryNavigation: [{
        "name": "水果",
        "id": "fruits"
      },
      {
        "name": "蔬菜",
        "id": "vegetables"
      },
      {
        "name": "服饰",
        "id": "clothes"
      },
      {
        "name": "玩具",
        "id": "plays"
      }
    ],
    products: [{
        "banner": "/images/bg1.jpg",
        "title": '水果',
        "product": [{
            "image": "/images/bg1.jpg",
            "title": '水果1'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '水果2'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '水果3'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '水果4'
          }
        ]
      },
      {
        "banner": "/images/bg1.jpg",
        "title": '蔬菜',
        "product": [{
            "image": "/images/bg1.jpg",
            "title": '蔬菜1'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '蔬菜2'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '蔬菜3'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '蔬菜4'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '蔬菜5'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '蔬菜6'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '蔬菜7'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '蔬菜8'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '蔬菜9'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '蔬菜10'
          }
        ]
      },
      {
        "banner": "/images/bg1.jpg",
        "title": '服饰',
        "product": [{
            "image": "/images/bg1.jpg",
            "title": '服饰1'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '服饰2'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '服饰3'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '服饰4'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '服饰5'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '服饰6'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '服饰7'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '服饰8'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '服饰9'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '服饰10'
          }
        ]
      },
      {
        "banner": "/images/bg1.jpg",
        "title": '玩具',
        "product": [{
            "image": "/images/bg1.jpg",
            "title": '玩具1'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '玩具2'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '玩具3'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '玩具4'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '玩具5'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '玩具6'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '玩具7'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '玩具8'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '玩具9'
          },
          {
            "image": "/images/bg1.jpg",
            "title": '玩具10'
          }
        ]
      },
    ]
  },
  switchTab: function(e) {
    const self = this;
    this.setData({
      isScroll: true
    });
    let timer = setTimeout(function() {
      self.setData({
        toView: e.target.dataset.id,
        currentIndex: e.target.dataset.index
      })
    }, 0);
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})