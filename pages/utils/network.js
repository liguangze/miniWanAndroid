/**
 * url:请求的url
 * params:请求参数
 * message:loading提示信息
 * success:成功的回调
 * fail:失败的回调
 */

//post请求
function postRequest(url, params, success, fail) {
  this.postRequestLoading(url, params, "", success, fail)
}

//根据判断message 是否显示loading
function postRequestLoading(url, params, message, success, fail) {
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  const postRequestTask = wx.request({
    url: url,
    data: {
      reqStr: params
    },
    header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid")
    },
    method: 'POST',
    success: function(res) {
      var data = res.data;
      if (message != "") {
        wx.hideLoading()
      }
      success(data)
    },
    fail: function(res) {
      if (message != "") {
        wx.hideLoading()
      }
      fail(res)
    }
  })
}

//get请求
function getRequest(url, params, success, fail) {
  this.getRequestLoading(url, params, "", success, fail)

  
}

function getRequestLoading(url, params, message, success, fail) {
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  const getRequestTask = wx.request({
    url: url,
    data: params,
    header: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    success: function(res) {
      
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail(res)
      }
    },
    fail: function(res) {
      if (message != "") {
        wx.hideLoading()
      }
      fail(res)
    }
  })
}

//取消post请求
function abortPostRequest(url, params, success, fail) {
  postRequestTask.abort()
}

//取消get请求
function abortGetRequest(url, params, success, fail) {
  getRequestTask.abort()
}






var configurl = require('../utils/config.js');
let request = (url, data, type) => new Promise((resolve, reject) => {
  wx.request({
    url:  url,
    data: data,
    method: type,//OPTIONS,GET,HEAD,POST,PUT,DELETE,TRANCE,CONNECT
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      "cookie": wx.getStorageSync("sessionid")
    },
    success: function (res) {
      //success
      if (res.data.errorCode == 0) {
        if (url == configurl.INTERFACE_USER_LOGIN || url == configurl.INTERFACE_REGISTER) {
          wx.setStorageSync("sessionid", res.header['Set-Cookie'])
        }
        resolve(res.data)
      } else {
        reject(res.data)
      }
    },
    fail: function (err) {
      //fail
      reject(err)
    },
    complete: function () {
      //complete
    }
  })
})


module.exports = {
  postRequest: postRequest,
  postRequestLoading: postRequestLoading,
  getRequest: getRequest,
  getRequestLoading: getRequestLoading,
  abortPostRequest: abortPostRequest,
  abortGetRequest: abortGetRequest,
  request: request
}