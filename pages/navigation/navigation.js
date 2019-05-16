// pages/project/project.js

const app = getApp();
var network = require('../utils/network.js');
var configurl = require('../utils/config.js');
Page({

  data: {
    navLeftItems: [],  // 左侧导航
    navRightItems: [], // 右侧产品
    curIndex: 0,
    textColor:0,
    title:"",

 // 自定义自己喜欢的颜色
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"],
    // 存储随机颜色
    randomColorArr: []


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    network.getRequestLoading(configurl.navigationUrl, "", '',
      function (res) {
        console.log("导航 = ", res);
      
        var articlesData = res['data'][0]['articles']
        console.log("导航item = ", articlesData);
        var title = res['data'][0]['name'];

        that.setData({
          navLeftItems: res,
          navRightItems: articlesData,
          title: title,
        })
      },
      function (res) { })


  

    for (var i = 1; i < 11; i++) {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      that.setData({
        textColor: "rgb(" + r + ',' + g + ',' + b + ")",

      })
    }
 
   var labLen = that.data.colorArr.length,
      colorArr = that.data.colorArr,
      colorLen = colorArr.length,
      randomColorArr = [];
    //判断执行
    do {
      let random = colorArr[Math.floor(Math.random() * colorLen)];
      randomColorArr.push(random);
      labLen--;
    } while (labLen > 0)

    that.setData({
      randomColorArr: randomColorArr
    });
 

 
  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

 // 改变tab栏
  currentTabs({ currentTarget: { dataset: { index: item } } }) {
    var articlesData = this.data.navLeftItems['data'][item]['articles'];
    var title        = this.data.navLeftItems['data'][item]['name'];
    console.log("====== ", articlesData);
    this.setData({
      curIndex: item,
      navRightItems: articlesData,
      title: title,
    })
  },
  // 去往列表页
  gotoProductDetail({ currentTarget: { dataset: { link: link } } }) {
    console.log("link === ", link);
    wx.navigateTo({
      
      url: '../home/homedetail/homedetail?link=' + link,
    })
  }


})