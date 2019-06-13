//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    titlrBar: [
      '正在流行',
      '女装',
      '套装',
      '裙裤',
      '上衣',
      '家居',
      '女鞋',
      '男士',
      '母婴',
      '内衣',
      '美妆',
      '运动',
      '包包',
      '配饰',
      '食品'
    ],
    img_height: 1,
    option: '正在流行',
    menu: [
      { name: '大衣', img: '../../imgs/dress/dayi.png' },
      { name: '牛仔裤', img: '../../imgs/dress/niuzhai.png' },
      { name: '连衣裙', img: '../../imgs/dress/lianyiqun.png' },
      { name: '秋裤', img: '../../imgs/dress/qiuku.png' },
      { name: '衬衫', img: '../../imgs/dress/chenshan.png' },
      { name: '帽子', img: '../../imgs/dress/maozi.png' },
      { name: '毛衣', img: '../../imgs/dress/maoyi.png' },
      { name: '大衣', img: '../../imgs/dress/dayi.png' },
      { name: '牛仔裤', img: '../../imgs/dress/niuzhai.png' },
      { name: '连衣裙', img: '../../imgs/dress/lianyiqun.png' },
      { name: '秋裤', img: '../../imgs/dress/qiuku.png' },
      { name: '衬衫', img: '../../imgs/dress/chenshan.png' },
      { name: '帽子', img: '../../imgs/dress/maozi.png' },
      { name: '毛衣', img: '../../imgs/dress/maoyi.png' },
      { name: '大衣', img: '../../imgs/dress/dayi.png' },
      { name: '牛仔裤', img: '../../imgs/dress/niuzhai.png' },
      { name: '连衣裙', img: '../../imgs/dress/lianyiqun.png' },
      { name: '秋裤', img: '../../imgs/dress/qiuku.png' },
      { name: '衬衫', img: '../../imgs/dress/chenshan.png' },
      { name: '帽子', img: '../../imgs/dress/maozi.png' },
      { name: '毛衣', img: '../../imgs/dress/maoyi.png' },
      { name: '毛衣', img: '../../imgs/dress/maoyi.png' },
      { name: '毛衣', img: '../../imgs/dress/maoyi.png' },
    ]
  },
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          img_height: res.windowHeight - 56,
        })
      }
    })
  },

  clickTitle: function (e) {
    let that = this
    that.setData({
      option: e.currentTarget.dataset.title,
    })
  }
})