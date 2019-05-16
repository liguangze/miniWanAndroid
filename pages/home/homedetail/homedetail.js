// pages/home/homedetail/homedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

link:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(" options.link = " + options.link);
   
   that.setData({
     link: options.link,
   })

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})