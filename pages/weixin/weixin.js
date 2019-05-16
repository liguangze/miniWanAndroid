// pages/weixin/weixin.js
var network = require('../utils/network.js');
var configurl = require('../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxarticleData: [],
    wxarticleItemData: [],
    currentTab: 0,
    navScrollLeft: 0,
    height: 150,

    pageNum: 1,
    isFirstRequest: true,
    index:0,
  },

  loadData() {
    var that = this
    network.getRequestLoading(configurl.wxarticleUrl, "", '',
      function (res) {
        console.log("微信公众号列表 = ", res);
        var id = res.data[that.data.index].id;
        console.log("id === " + id);
        console.log("that.data.index === " + that.data.index);
        network.getRequestLoading("https://wanandroid.com/wxarticle/list/" + id + "/" + that.data.pageNum + "/json", "", '',
          function (res) {
            console.log("微信公众号列表详情 = ", res);
            var responseList = [];
            that.data.isFirstRequest ? responseList = res.data.datas : responseList = that.data.wxarticleItemData.concat(res.data.datas)


            that.setData({
              wxarticleItemData: responseList,
              height: 150 * (responseList.length)
            })

            wx.hideLoading();

            // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();


          },
          function (res) { })



        that.setData({
          wxarticleData: res.data,


        })
      },
      function (res) { })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.loadData();
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  switchNav(event) {
    var that = this;
    var cur = event.currentTarget.dataset.current;
    var cid = event.currentTarget.dataset.id;

    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 3;

    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth,
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
        index :cur,
        pageNum:1,
        isFirstRequest: true,
      })
    }
    this.loadData();
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 3;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
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
    }),
      that.loadData()

  },


})