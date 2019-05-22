const CONFIG = require('../config.js')
const API_BASE_URL = 'https://yuxiao.com'   // 举例【填您自己的域名信息】

const request = (url, needSubDomain, method, data) => {
    let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + url
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
            complete(data) { }
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