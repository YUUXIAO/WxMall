const CONFIG = require('./config.js')
const token = ''

const request = (url, needSubDomain, method, data) => {
    wx.showNavigationBarLoading();
    let _url = CONFIG.baseUrl + (needSubDomain ? '/' + CONFIG.subDomain : '') + url
    return new Promise((resolve, reject) => {
        wx.request({
            url: _url,
            method: method,
            data: data,
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success(request) {
                resolve(request.data)
            },
            fail(error) {
                reject(error)
            },
            complete(data) {
                wx.hideNavigationBarLoading();
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
    // 注册 
    register: (data) => {
        // return request('/api/register', true, 'post', data)
        return true
    },
    // 首页获取商品列表
    getGoodsList: (data) => {
        return request('/item/saleRankItems.json', true, 'post', data)
    },
    // 搜索获取提示列表
    getSearchList: (data) => {
        return request('/search/searchAutoComplete.json', false, 'get', data)
    },
    // 搜索获取商品列表
    getSearchGoodsList: (data) => {
        return request('/search/search.json', false, 'get', data)
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