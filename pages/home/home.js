// pages/home/home.js

import baseNetwork from "../utils/baseNetwork.js";

// var baseNetwork = require('../utils/baseNetwork.js');
var network = require('../utils/network.js');
var configurl = require('../utils/config.js');
var utilsMap = require('../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //首页轮播图数据
    bannerData: [],
    indicatorDots: false,
    interval: 3000,
    duration: 800,

    //首页列表数据
    homeData: [],

    pageNum: 0,
    isFirstRequest: true,
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isFirstRequest: true
    }),
      this.loadData()

  },


  /**
   * 请求轮播图与首页列表数据
   */
  loadData() {
    var that = this;
    //首页轮播图
    baseNetwork.getHomeBanner().then(
      function (res) {
        that.setData({
          bannerData: res.data
        })
      })




    //首页列表
    baseNetwork.article(this.data.pageNum)
      .then(
        function (res) {
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

        }

      )

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 首页点击item
   */
  toHomeDetail: function (e) {

    console.log("e.currentTarget.dataset.link = " + e.currentTarget.dataset.link);
    var link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: '../home/homedetail/homedetail?link=' + link,
    })
  },

  /**
   * 点击收藏
   */
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
      console.log("收藏的id = " + e.currentTarget.dataset.id);
      console.log("是否收藏 = " + e.currentTarget.dataset.collect);
      console.log("index = " + e.currentTarget.dataset.index);
      var collet = e.currentTarget.dataset.collect;
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      if (collet){
        baseNetwork.uncollect(id).then
        (
          function(res){
            that.data.homeData[index].collect = false
            that.setData({
              homeData: that.data.homeData
            })

            wx.showToast({
              title: '取消收藏成功',
            })

          }
        )
      }else{

        baseNetwork.collect(id).then(
          function(){
            that.data.homeData[index].collect = true
            that.setData({
              homeData: that.data.homeData
            })

            wx.showToast({
              title: '收藏成功',
            })



          }
        )

      }


    }
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading();
    that.setData({
      pageNum: 0,
      isFirstRequest: true
    }),
      that.loadData()


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
   
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      pageNum: that.data.pageNum + 1,
      isFirstRequest: false
    })
      that.loadData()

  },

})