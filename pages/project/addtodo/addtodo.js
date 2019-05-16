// pages/project/addtodo/addtodo.js

import baseNetwork from "../../utils/baseNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusArray: ['重要', '工作', '学习', '生活'],
    title: "",
    content: "",
    date: "",
    type: 0,
    id: 0,
    edit: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.bean != undefined) {
      var bean = JSON.parse(options.bean);
      console.log(bean)
      this.setData({
        title: bean.title,
        content: bean.content,
        date: bean.dateStr,
        id: bean.id,
        type: bean.type,
        edit: true
      })
    }
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

  titleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  detailInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //状态选择
  bindStatusChange: function(e) {
    this.setData({
      type: e.detail.value
    })
  },

  sumbit() {
    if (this.data.title == "" || this.data.content == "" || this.data.date == "") {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    } else {
      if (!this.data.edit) {
        baseNetwork.addTodo({
          title: this.data.title,
          content: this.data.content,
          date: this.data.date,
          type: this.data.type
        }).then(
          function(res) {
            console.log("addtodo成功 = " + res.data)
            wx.navigateBack({
              delta: -1
            });
          }
        )
      } else {

        baseNetwork.updateTodo(this.data.id, {
            title: this.data.title,
            content: this.data.content,
            date: this.data.date,
            type: this.data.type
          })
          .then(
            res => {
              console.log(res.data)
              wx.navigateBack({
                delta: -1
              });
            }
          )
      }



    }
  }
})