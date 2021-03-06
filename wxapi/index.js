const CONFIG = require('./config.js')
const token = ''

const request = (url, needSubDomain, method, data, header) => {
    wx.showLoading({ title: '加载中', mask: true })
    let _url = CONFIG.baseUrl + (needSubDomain ? '/' + CONFIG.subDomain : '') + url
    let defaultHeader = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    // data.token = wx.getStorageSync('token')
    return new Promise((resolve, reject) => {
        wx.request({
            url: _url,
            method: method,
            data: data || {},
            header: header || defaultHeader,
            success(request) {
                resolve(request.data)
            },
            fail(error) {
                reject(error)
            },
            complete(data) {
                wx.hideLoading()
            }
        })
    })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
    var Promise = this.constructor;
    return this.then(
        function (value) {
            Promise.resolve(callback()).then(
                function () {
                    return value
                }
            )
        },
        function (reason) {
            Promise.resolve(callback()).then(
                function () {
                    throw reason;
                }
            );
        }
    )
}


// API请求管理 
module.exports = {
    request,
    register: (data) => {
        // return request('/api/login', true, 'post', data)
        let res = {
            isNotUser: true,
            code: 0
        }
        return res
    },
    checkToken: (data) => {
        // return request('/api/checkToken', true, 'post', data)
        return true
    },
    // 记录formId
    saveFormId: (data) => {
        // return request('/formId/save', false, 'post', data )
    },



    // 首页获取商品列表
    getGoodsList: (data) => {
        let header = {
            'content-type': 'application/json'
        }
        return request('/item/saleRankItems.json', false, 'post', data, header)
    },
    // 搜索获取提示列表
    getSearchList: (data) => {
        return request('/search/searchAutoComplete.json', false, 'get', data)
    },
    // 搜索获取商品列表
    getSearchGoodsList: (data) => {
        return request('/search/search.json', false, 'get', data)
    },
    // 搜索商品推荐列表
    getRecommendList: (data) => {
        return request('/item/rcmd.json', false, 'get', data)
    },
    // 搜索商品评论列表
    getCommentsList: (data) => {
        return request('/comment/listByItemByTag.json', false, 'get', data)
    },
    // 搜索商品好评率
    getGoodRates: (data) => {
        return request('/comment/itemGoodRates.json', false, 'get', data)
    },
    // 搜索商品评价标签组
    getTagsList: (data) => {
        return request('/comment/tags.json', false, 'get', data)
    },
    // 筛选商品评价        
    fliterTagsList: (data) => {
        return request('/comment/listByItemByTag.json', false, 'get', data)
    },
    // 获取商品类别      
    getCategoryLists: (data) => {
        return request('/globalinfo//queryTop.json', false, 'get', data)
    },
    // 获取商品类别点击详情    
    getCategoryDetailLists: (data) => {
        return request('/item/listByCategory.json', false, 'get', data)
    },
    // 添加收货地址    
    addAddress: (data) => {
        // return request('/addAddress/addd', false, 'post', data)
    },
    // 获取我的订单
    getOrders: (data) => { },
    // 删除购物车数据
    cartDelete: (data) => {
        return new Promise((resolve, reject) => {
            let data = {
                code: 200
            }
            resolve(data)
        })
    },
    // 保存购物车数据
    setCartLists: (data) => {
        return new Promise((resolve, reject) => {
            let data = {
                code: 200
            }
            resolve(data)
        })
    },
    // 创建订单-立即购买
    orderBuyNow: (data) => {
        // return request('/order/buyNow', false, 'post', data)
        return new Promise((resolve, reject) => {
            let data = {
                code: 500,
                msg: '仅做演示，不支持支付！',
                payment: {
                    timeStamp: '',
                    nonceStr: '',
                    prepay_id: '',
                    paySign: 'paySign'
                }
            }
            resolve(data)
        })
    },
    // 创建订单-购物车结算
    orderCart: (data) => {
        // return request('/order/cart', false, 'post', data)
        return new Promise((resolve, reject) => {
            let data = {
                code: 500,
                msg: '仅做演示，不支持支付！',
                payment: {
                    timeStamp: '',
                    nonceStr: '',
                    prepay_id: '',
                    paySign: 'paySign'
                }
            }
            resolve(data)
        })
    },








    queryMobileLocation: (data) => {
        return request('/common/mobile-segment/location', false, 'get', data)
    },
    queryConfigBatch: (keys) => {
        return request('/config/values', true, 'get', { keys })
    },
    scoreRules: (data) => {
        return request('/score/send/rule', true, 'post', data)
    },
    scoreSign: (token) => {
        return request('/score/sign', true, 'post', {
            token
        })
    },
    scoreExchange: (number, token) => {
        return request('/score/exchange', false, 'post', {
            number,
            token
        })
    },
}