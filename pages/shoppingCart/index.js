// pages/shoppingCart/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        shoppingCartList: [],
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
        type == 'complete' && this.getCount()
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
        console.log(this.data.delBtnWidth)
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
        console.log(this.data.cartLists)
        let _this = this, cartLists = this.data.cartLists, index = e.currentTarget.dataset.index, goodCount = cartLists[index].goodCount
        console.log(goodCount)
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
        cartList.map(m => {
            if (m.selected) {
                console.log(total)
            }
        })
        this.setData({
            totalPrice: total.toFixed(2)
        })
    },
    // 开始滑动事件
    // touchS: function (e) {
    //     if (e.touches.length == 1) {
    //         this.setData({
    //             startX: e.touches[0].clientX
    //         })
    //     }
    // },
    // 滑动中事件
    // touchM: function (e) {
    //     var that = this
    //     if (e.touches.length == 1) {
    //         //手指移动时水平方向位置
    //         var moveX = e.touches[0].clientX
    //         //手指起始点位置与移动期间的差值
    //         var disX = this.data.startX - moveX
    //         var delBtnWidth = this.data.delBtnWidth
    //         var txtStyle = ''

    //         if (disX == 0 || disX < 0 || disX < delBtnWidth / 2) {
    //             //如果移动距离小于等于0，文本层位置不变
    //             txtStyle = 'left:0rpx'
    //         } else {
    //             txtStyle = 'left:-' + delBtnWidth + 'rpx'
    //         }
    //         //获取手指触摸的是哪一项
    //         var index = e.currentTarget.dataset.index
    //         var cartList = this.data.cartList
    //         cartList[index].txtStyle = txtStyle

    //         //更新列表的状态
    //         this.setData({
    //             cartList: cartList
    //         })
    //     }
    // },

    // 滑动中事件
    // touchE: function (e) { },

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
        this.getCount()
        this.initEleWidth()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
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
