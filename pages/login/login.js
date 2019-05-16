// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    password: "",
    name: "",
    url: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      url: app.globalData.userInfo.avatarUrl,
      name: app.globalData.userInfo.nickName,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  inputNumber: function(e) {
    this.setData({
      number: e.detail.value
    })
  },
  inputPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function(e) {
    var number = this.data.number;
    var password = this.data.password;
    // 提交请求

    console.log("number = " + number);
    console.log("password = " + password);


    wx.request({
      url: 'https://www.wanandroid.com/user/login', // 仅为示例，并非真实的接口地址
      data: {
        username: number,
        password: password
      },
      method:"POST"
      ,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log("登录 == ", res.header['Set-Cookie'])

        if (res.data.errorCode == 0){
          console.log("登录ID = " + res.data.data.id);
          wx.setStorageSync("userId", res.data.data.id),
          wx.setStorageSync("wanAndroidName", res.data.data.username);
          wx.setStorageSync("sessionid", res.header['Set-Cookie']);
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];    //上一个页面

          prevPage.setData({
            wanAndroidName: res.data.data.username
          })
          wx.navigateBack({

            delta: 1  // 返回上一级页面。
          })
        
        }else {
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  }
})