// pages/knowledgesystem/knowledgesystemdetail/knowledgesystemdetail.js
const app = getApp();
var network = require('../../utils/network.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemknowledgesystem:[],
    detailItemknowledgesystem: "",
    currentTab: 0,
    navScrollLeft: 0,
    firstId :0,
    height :150,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      itemknowledgesystem: app.globalData.knowledgesystemAppData,
    })


    for (var index in app.globalData.knowledgesystemAppData) {

      var firstId = app.globalData.knowledgesystemAppData[0].id;
      console.log(" firstId ==   " + firstId);
    }


    network.getRequestLoading("https://www.wanandroid.com/article/list/0/json?cid=" + firstId, "", '',
      function (res) {
        console.log("知识体系下的文章 = ", res);

        console.log("知识体系下的文章的集合 = ", res['data']['datas'].length);
      

        that.setData({
          detailItemknowledgesystem: res,
          height: 150 * (res['data']['datas'].length)

        })
      },
      function (res) { })
   

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })



   
  },




 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

   switchNav(event) {
     var that = this;
    var cur = event.currentTarget.dataset.current;
     var cid = event.currentTarget.dataset.cid;
   
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 3;
   
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth,
      firstId: cid
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }


     network.getRequestLoading("https://www.wanandroid.com/article/list/0/json?cid=" + this.data.firstId, "", '',
       function (res) {
         console.log("知识体系下的文章 = ", res);
         that.setData({
           detailItemknowledgesystem: res,
            height: 150 * (res['data']['datas'].length)
         })
       },
       function (res) { })


     console.log("firstId = " + this.data.firstId);
  },

  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 3;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },


  clickDetail(event){

    var link = event.currentTarget.dataset.link;
    console.log("link = " + link);

    wx.navigateTo({
      url: '../../home/homedetail/homedetail?link=' + link,
    })
  }

})