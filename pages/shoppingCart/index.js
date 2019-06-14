// pages/shoppingCart/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        shoppingCartList: []
        // cartList: [],
        // hasList: false,
        // selectAll: false,
        // totalPrice: 0,
        // delBtnWidth: 150
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
    getCartLists: function () {
        console.log(1111)
        let cartLists = wx.getStorageSync('shoppingCart')
        this.setData({
            cartLists
        })
        console.log(cartLists)
    },
    // 绑定减数量事件
    reduceCount: function (e) {
        var that = this
        var cartList = this.data.cartList
        var index = e.currentTarget.dataset.index
        var count = cartList[index].count
        if (count > 1) {
            cartList[index].count--
            that.setData({
                cartList: cartList
            })
        } else {
            wx.showToast({
                title: '不能再少了哦！',
                icon: 'error',
                duration: 1000
            })
        }
        this.getTotalPrice()
    },
    // 绑定加数量事件
    increaseCount: function (e) {
        var cartList = this.data.cartList
        var index = e.currentTarget.dataset.index
        cartList[index].count++
        this.setData({
            cartList: cartList
        })
        this.getTotalPrice()
    },
    // 选中商品
    selectGoods: function (e) {
        let index = e.currentTarget.dataset.index
        let carts = this.data.cartList
        let selected = carts[index].selected
        carts[index].selected = !selected
        this.setData({
            cartList: carts
        })
        this.getTotalPrice()
    },
    // 全选
    selectAllGoods: function () {
        var self = this
        let selectAll = !this.data.selectAll
        let cartList = this.data.cartList
        cartList.map(m => {
            m.selected = selectAll
        })
        this.setData({
            cartList: cartList,
            selectAll: selectAll
        })
        this.getTotalPrice()
    },
    // 计算金额
    getTotalPrice: function () {
        let cartList = this.data.cartList
        let total = 0
        console.log(cartList)
        cartList.map(m => {
            if (m.selected) {
                console.log(total)
                total += m.price * m.count
            }
        })
        this.setData({
            totalPrice: total.toFixed(2)
        })
        console.log(this.data.totalPrice)
    },
    // 开始滑动事件
    touchS: function (e) {
        if (e.touches.length == 1) {
            this.setData({
                startX: e.touches[0].clientX
            })
        }
    },
    // 滑动中事件
    touchM: function (e) {
        var that = this
        if (e.touches.length == 1) {
            //手指移动时水平方向位置
            var moveX = e.touches[0].clientX
            //手指起始点位置与移动期间的差值
            var disX = this.data.startX - moveX
            var delBtnWidth = this.data.delBtnWidth
            var txtStyle = ''

            if (disX == 0 || disX < 0 || disX < delBtnWidth / 2) {
                //如果移动距离小于等于0，文本层位置不变
                txtStyle = 'left:0rpx'
            } else {
                txtStyle = 'left:-' + delBtnWidth + 'rpx'
            }
            //获取手指触摸的是哪一项
            var index = e.currentTarget.dataset.index
            var cartList = this.data.cartList
            cartList[index].txtStyle = txtStyle

            //更新列表的状态
            this.setData({
                cartList: cartList
            })
        }
    },

    // 滑动中事件
    touchE: function (e) { },

    // 删除商品
    delItem: function () {
        console.log('del')
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
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },

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
