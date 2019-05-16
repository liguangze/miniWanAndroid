// pages/project/project.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "../image/logo_defult.png",
    weixinName: "",
    wanAndroidName: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        url: app.globalData.userInfo.avatarUrl,
        weixinName: app.globalData.userInfo.nickName,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            url: app.globalData.userInfo.avatarUrl,
            weixinName: app.globalData.userInfo.nickName,
          })
        }
      })
    }
    this.setData({
      wanAndroidName: wx.getStorageSync("wanAndroidName")
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      url: e.detail.userInfo.avatarUrl,
      weixinName: e.detail.userInfo.nickName,

    })
  },

  clickLogin: function() {

    var wanAndroidName = wx.getStorageSync("wanAndroidName");
    console.log("wanAndroidName = " + wanAndroidName);
    this.setData({
      wanAndroidName: wx.getStorageSync("wanAndroidName"),
    })

    if (wanAndroidName == "") {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {

      wx.showToast({
        title: "您已经登录了",
        icon: 'none',
        duration: 1000,
        mask: true
      })

    }
  },

//点击收藏
  collection:function(){
    wx.navigateTo({
      url: '/pages/project/collection/collection',
    })
  },


  //点击TODO
  todo: function () {

    wx.navigateTo({
      url: '/pages/project/todo/todo',
    })
  },
  //点击设置
  setting: function () {

    wx.navigateTo({
      url: '/pages/project/setting/setting',
    })
  },

  //点击退出登录
  exitLogin: function () {
    var my = this;
    wx.showModal({
      title: '提示',
      content: '确定退出登录?',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync()
          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }
      
        }
      }
    })
  },

})