// pages/knowledgesystem/knowledgesystem.js
const app = getApp();
var network = require('../utils/network.js');
var configurl = require('../utils/config.js');
var utilsMap = require('../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    knowledgesystemData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    network.getRequestLoading(configurl.knowledgesystemUrl, "", '',
      function (res) {
        console.log("知识体系 = ", res);
        that.setData({
         knowledgesystemData: res
        })
      },
      function (res) { })
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
,

  knowledgesystemdetail:function(e){
    // console.log("itemdata = " + e.currentTarget.dataset.itemdata);
    app.globalData.knowledgesystemAppData = e.currentTarget.dataset.itemdata;

  
    wx.navigateTo({
      url: '../knowledgesystem/knowledgesystemdetail/knowledgesystemdetail',
    })
  }
})