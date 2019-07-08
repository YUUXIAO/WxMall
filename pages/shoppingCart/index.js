// pages/shoppingCart/index.js
const routes = require('../../router/index.js')
const util = require('../../utils/util')
const WXAPI = require('../../wxapi/index')
const App = getApp()


Page({
    /**
     * 页面的初始数据
     */
    data: {
        cartLists: [],
        showEdit: false,
        selectAll: false,
        totalPrice: '0.00',      // 合计金额
        selectedCount: 0,    // 选中数量
        startX: 0,
        delBtnWidth: 120
    },
    onLoad: function (options) { },

    /**
      * 获取购物车数据
      */
    getCartLists() {
        let _this = this
        wx.request({
            url: 'https://www.easy-mock.com/mock/5b8b9d4a61840c7b40336534/example/getCartList',
            data: {
                token: App.getToken()
            },
            success: function (res) {
                if (res.data.code.code == 500) {
                    App.showError(res.data.code.message, function () {
                        App.doLogin()
                    })
                } else {
                    _this.setData({
                        cartLists: res.data.data.cartList
                    })
                    _this.getCount()
                }
            }
        })
    },
    /**
      * 获取页面宽度初始数据
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
      * 选中购物车
      */
    chooseCartItem: function ({ currentTarget: { dataset: { index } } }) {
        let _this = this, selected = !_this.data.cartLists[index].selected
        _this.setData({
            ['cartLists[' + index + '].selected']: selected
        }, function () {
            // 更新购物车已选商品总价格
            this.getCount()
        })
    },
    /**
     * 切换购物车列表编辑/完成
     */
    switchAction: function ({ currentTarget: { dataset: { type } } }) {
        this.setData({
            showEdit: !this.data.showEdit
        })
    },
    /**
      * 选择框全选
      */
    setSelectAll: function (e) {
        let cartLists = this.data.cartLists, selectAll = !this.data.selectAll
        cartLists.map(item => {
            item.selected = selectAll
        })
        this.setData({ cartLists, selectAll }, function () {
            // 更新购物车已选商品总价格
            this.getCount()
        })
    },
    /**
      * 获取选中数量、合计金额
      */
    getCount() {
        let cartLists = this.data.cartLists, selectedCount = 0, totalPrice = 0, selectAll = false
        // 判断全选状态
        selectAll = cartLists.every(s => {
            return s.selected
        })
        cartLists.forEach(item => {
            if (item.selected === true) {
                // 计算选中商品数量
                selectedCount = cartLists.length
                // 计算选中商品总金额
                totalPrice += parseFloat((item.retailPrice * item.goodCount).toFixed(2))
            }
        })
        this.setData({
            totalPrice,
            selectedCount,
            selectAll
        })
    },

    /**
      * 绑定计数器数量变化
      */
    getCountNum: function ({ currentTarget: { dataset: { index } }, detail }) {
        this.setData({
            ['cartLists[' + index + '].goodCount']: detail
        }, function () {
            // 更新购物车总价格
            this.getCount()
        })
    },
    /**
      * 左滑删除单件商品
      */
    delCartItem: function ({ currentTarget: { dataset: { index } } }) {
        let cartLists = this.data.cartLists
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
        let _this = this, delCartIds = _this.getCheckedIds()
        if (!delCartIds.length) {
            App.showError('', '请选择商品！')
            return false
        }
        App.showError('', '您确定要移除选择的商品吗?', true, function (res) {
            // 确认删除
            res.confirm && WXAPI.cartDelete(delCartIds).then(res => {
                // 重新获取购物车列表
                _this.getCartLists()
            })
        })
    },
    /**
      * 获取已选中的商品
      */
    getCheckedIds: function () {
        let arrIds = []
        this.data.cartLists.forEach(item => {
            if (item.selected) {
                arrIds.push(item.id)
            }
        })
        return arrIds
    },
    /**
      * 批量下单商品
      */
    takeOrders: function () {
        let cartIds = _this.getCheckedIds()
        let cartLists = this.data.cartLists.filter(s => {
            return s.selected
        })
        if (!cartIds.length) {
            App.showError('', '您还没有选择商品！')
            return false
        }
        wx.setStorageSync('goodsInfo', cartLists)
        // 跳转订单确认页面，根据ids获取信息
        routes.navigateTo('checkOrder', { cartIds: cartIds })
    },
    /**
      * 去购物
      */
    returnShopping: function () {
        routes.navigateTo('home')
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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 获取购物车列表数据
        this.getCartLists()
        // 获取页面宽度初始数据
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
        // 保存购物车数据
        WXAPI.setCartLists(cartLists).then(res => {
            if (res.code == 200) {
                // do something
            }
        })
    },
})
