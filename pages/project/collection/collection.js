// pages/project/collection/collection.js

import baseNetwork from "../../utils/baseNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeData: [],
    pageNum: 0,
    isFirstRequest: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData()
  },

  initData() {
    var that = this;
    baseNetwork.myCollcet(this.data.pageNum).then(
      function(res){
        var responseList = [];
        that.data.isFirstRequest ? responseList = res.data.datas : responseList = that.data.homeData.concat(res.data.datas)
        that.setData({
          homeData: responseList,
        })
        wx.hideLoading();

        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();

      })
      .catch(e => {
        wx.showToast({
          title: e["errorMsg"],
        })

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
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      pageNum: that.data.pageNum + 1,
      isFirstRequest: false
    }),
    
      that.initData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //  点击收藏
   
  onCollectionTap: function (e) {
    var that = this
    var islogin = wx.getStorageSync('wanAndroidName')
    if (islogin == null || islogin == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      wx.navigateTo({
        url: '/pages/login/login',
      })

    } else {
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      console.log("id = " + id);
      baseNetwork.uncollect(id).then
        (
        function (res) {
          that.data.homeData.splice(index, 1)
          that.setData({
            homeData: that.data.homeData
          })

          wx.showToast({
            title: '取消收藏成功',
          })

        }
        )


    }
  }
  
})