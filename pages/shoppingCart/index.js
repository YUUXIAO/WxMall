// pages/shoppingCart/index.js
const routes = require('../../router/index.js');



Page({
    /**
     * 页面的初始数据
     */
    data: {
        cartLists: [],
        showEdit: false,
        selectAll: true,
        priceCount: 0,      // 合计金额
        selectedCount: 0,    // 选中数量
        startX: 0,
        delBtnWidth: 120
    },
    onLoad: function (options) {
        // var that = this
        // 获取购物车列表数据
        // wx.request({
        //     url: 'https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/getCartList',
        //     success: function (res) {
        //         that.setData({
        //             cartList: res.data.cartList
        //         })
        //         // 获取新加入购物车数据
        //         wx.getStorage({
        //             //获取数据的key
        //             key: 'shoppingCart',
        //             success: function (res) {
        //                 that.setData({
        //                     cartList: that.data.cartList.concat(res.data)
        //                 })
        //                 // 判断购物车是否有数据
        //                 if (that.data.cartList.length) {
        //                     that.setData({
        //                         hasList: true,
        //                         selectAll: true
        //                     })
        //                 } else {
        //                     that.setData({
        //                         hasList: false,
        //                         selectAll: false
        //                     })
        //                 }
        //                 that.getTotalPrice()
        //             },
        //             fail: function (res) {
        //                 console.log(res)
        //             }
        //         })
        //     }
        // })
    },
    /**
      * 获取购物车初始数据
      */
    getEleWidth: function (w) {
        //以宽度750px设计稿做宽度的自适应
        let realWidth = 0, res = wx.getSystemInfoSync().windowWidth, scale = (750 / 2) / (w / 2);
        realWidth = Math.floor(res / scale);
        return realWidth;
    },
    initEleWidth: function () {
        let delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth
        });
    },
    /**
      * 获取购物车初始数据
      */
    getCartLists: function () {
        let cartLists = wx.getStorageSync('shoppingCart')
        cartLists = cartLists.map(s => {
            s.selected = true
            return s
        })
        this.setData({
            cartLists
        })
    },
    /**
      * 选中购物车
      */
    chooseCartItem: function (e) {
        let index = e.currentTarget.dataset.index, cartLists = this.data.cartLists
        cartLists[index].selected = !cartLists[index].selected
        let selectAll = cartLists.every(s => {
            return s.selected
        })
        this.setData({
            cartLists,
            selectAll
        })
        this.getCount()
    },
    /**
     * 编辑
     */
    editCart: function (e) {
        let cartLists = this.data.cartLists, type = e.currentTarget.dataset.type, selected = type == "edit" ? false : true
        cartLists = cartLists.map(s => {
            s.selected = selected
            return s
        })
        this.setData({
            cartLists,
            selectAll: selected,
            showEdit: !this.data.showEdit
        })
        this.getCount()
    },
    /**
      * 全选
      */
    setSelectAll: function (e) {
        let cartLists = this.data.cartLists, selectAll = !this.data.selectAll
        cartLists.map(s => {
            s.selected = selectAll
        })
        this.setData({
            cartLists,
            selectAll
        })
        this.getCount()
    },
    /**
      * 获取选中数量、合计金额
      */
    getCount() {
        let cartLists = this.data.cartLists, selectedCount = 0, priceCount = 0
        cartLists = cartLists.filter(s => {
            return s.selected
        })
        selectedCount = cartLists.length
        priceCount = cartLists.map(s => {
            return parseFloat((s.retailPrice * s.goodCount).toFixed(2))
        }).reduce((acc, cur) => {
            return parseFloat(acc + cur)
        }, 0)
        this.setData({
            priceCount,
            selectedCount
        })
    },
    touchS: function (e) {
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            })
        }

    },
    touchM: function (e) {
        let index = e.currentTarget.dataset.index
        if (e.touches.length == 1) {
            let moveX = e.touches[0].clientX, disX = this.data.startX - moveX, delBtnWidth = this.data.delBtnWidth, left = ''
            if (disX <= 0) {
                left = "margin-left:0px";
            } else {
                left = "margin-left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    left = "margin-left:-" + delBtnWidth + "px";
                }
            }
            let cartLists = this.data.cartLists
            if (index !== '' && index != null) {
                cartLists[parseInt(index)].style = left
                this.setData({
                    cartLists
                })
            }
        }
    },
    touchE: function (e) {
        let index = e.currentTarget.dataset.index
        if (e.changedTouches.length == 1) {
            let endX = e.changedTouches[0].clientX, disX = this.data.startX - endX, delBtnWidth = this.data.delBtnWidth
            //如果距离小于删除按钮的1/2，不显示删除按钮
            let style = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px", cartLists = this.data.cartLists
            if (index !== "" && index != null) {
                cartLists[parseInt(index)].style = style;
                this.setData({
                    cartLists
                })
            }
        }
    },
    /**
      * 绑定减数量事件
      */
    reduceCount: function (e) {
        let _this = this, cartLists = this.data.cartLists, index = e.currentTarget.dataset.index, goodCount = cartLists[index].goodCount
        if (goodCount > 1) {
            cartLists[index].goodCount--
            _this.setData({
                cartLists
            })
        } else {
            wx.showToast({
                title: '不能再少了哦！',
                icon: 'error',
                duration: 1000
            })
        }
        _this.getCount()
    },
    getCountNum: function (e) {
        console.log(e)
        // this.cartLists[index].goodCount = detail
        // this.setData({
        //     cartLists
        // })
    },
    /**
      * 绑定加数量事件
      */
    increaseCount: function (e) {
        let cartLists = this.data.cartLists, index = e.currentTarget.dataset.index
        cartLists[index].goodCount++
        this.setData({
            cartLists
        })
        this.getCount()
    },
    /**
      * 删除商品
      */
    delCartItem: function (e) {
        let index = e.currentTarget.dataset.index, cartLists = this.data.cartLists
        if (index !== '' && index != null) {
            cartLists.splice(index, 1)
            this.setData({
                cartLists
            })
        }
    },
    /**
      * 批量删除商品
      */
    deleteTotal: function () {
        let cartLists = this.data.cartLists
        cartLists = cartLists.filter((s, index) => {
            if (s.selected) {
                s.index = index
                return s
            }
        })
        cartLists.forEach(s => {
            cartLists.splice(s.index, 1)
        })
        this.setData({
            cartLists
        })
    },
    /**
      * 批量删除商品
      */
    takeOrders: function () {
        let cartLists = this.data.cartLists.filter(s => {
            return s.selected
        })
        wx.setStorageSync('goodsInfo', cartLists)
        routes.navigateTo('checkOrder')
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getCartLists()
        this.getCount()
        this.initEleWidth()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        let cartLists = this.data.cartLists
        cartLists = cartLists.map(s => {
            s.style = ''
        })
        wx.setStorageSync('shoppingCart', this.data.cartLists)
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () { },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { }
})
