// pages/project/todo/todo.js
import baseNetwork from "../../utils/baseNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ['重要', '工作', '学习', '生活'],
    type: 0,
    pageNum: 1,
    contentList: [],
    isFirstRequest: true,
    isover: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData(this.data.pageNum,this.data.type);
  },

  initData(pageNum, type){
    console.log("pageNum = " + pageNum +"   ,type  = "+type);
    var that = this;
    baseNetwork.notodo(pageNum, type).then(
      function(res){
        // console.log("res.data = " + JSON.stringify(res.data));

        var responseList = [];

        that.data.isFirstRequest ? responseList = res.data.datas : responseList = that.data.contentList.concat(res.data.datas)

        that.setData({
          contentList: responseList,
          isover: res.data.over,
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData(this.data.pageNum, this.data.type);
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
    var that = this;

    wx.showLoading({
      title: '加载中',
    })
    if (!this.data.isover) {
    that.setData({
      pageNum: that.data.pageNum + 1,
      isFirstRequest: false,
      type: that.data.type,
    })
    }
    that.initData(that.data.pageNum, that.data.type)

  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  click(event) {
    this.setData({
      type: event.currentTarget.dataset.index,
      pageNum:1,
      isFirstRequest: true,
    })

    this.initData(this.data.pageNum, event.currentTarget.dataset.index);
  },



  edit(event) {
    const index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/project/addtodo/addtodo?bean=' + JSON.stringify(this.data.contentList[index]),
    })

  },
  finish(event) {
    const index = event.currentTarget.dataset.index;
    baseNetwork.finishTodo(this.data.contentList[index].id, { status: 1 })
      .then(
        res => {
          this.initData(this.data.pageNum, this.data.type);
        }
      )
  },

  delete(event) {
    const index = event.currentTarget.dataset.index;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除吗?',
      success: function (res) {
        if (res.confirm) {
          baseNetwork.deleteTodo(that.data.contentList[index].id)
            .then(
              res => {
                console.log(res.data)
                that.initData(that.data.pageNum, that.data.type);
              }
            )
        }
      }
    })

  },



  addtodo(){
    wx.navigateTo({
      url: '/pages/project/addtodo/addtodo',
    })
  },

  finishtodo() {
    wx.navigateTo({
      url: '/pages/project/finishtodo/finishtodo',
    })
  },
})