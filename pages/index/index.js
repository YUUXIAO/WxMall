//index.js
//获取应用实例
// const app = getApp()
Page({
  data: {
    imgUrls: [
      '/images/bg1.jpg',
      '/images/bg2.jpg'
    ],
    lastestLists:[
      {
        'id':1,
        'title':'名称1',
        'price':1,
        'image':'/images/bg1.jpg'
      },
      {
        'id': 2,
        'title': '名称2',
        'price': 2,
        'image': '/images/bg1.jpg'
      },
      {
        'id': 3,
        'title': '名称3',
        'price': 3,
        'image': '/images/bg1.jpg'
      },
      {
        'id': 4,
        'title': '名称4',
        'price': 4,
        'image': '/images/bg1.jpg'
      }
    ],
    selectedImg:'/images/bg1.jpg',
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  }
})