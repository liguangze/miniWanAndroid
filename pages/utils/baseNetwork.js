var configurl = require('../utils/config.js');
var network = require('../utils/network.js');

export default {

  //首页轮播图
  getHomeBanner(params) {
    const result = network.request(configurl.bannerUrl, params, "GET");
    return result;
  },

  //首页文章
  article(page, params) {
    const result = network.request("https://www.wanandroid.com/article/list/" + page + "/json", params, "GET");
    return result;
  },


  //首页收藏
  collect(id, params) {
    const result = network.request("https://www.wanandroid.com/lg/collect/" + id + "/json", params, "POST");
    return result;

  },

  //首页取消收藏
  uncollect(id, params) {
    const result = network.request("https://www.wanandroid.com/lg/uncollect_originId/" + id + "/json", params, "POST");
    return result;

  },



  //我的收藏

  myCollcet(id, params) {
    const result = network.request("https://www.wanandroid.com/lg/collect/list/" + id + "/json", params, "GET");
    return result;
  },


  //添加todo
  addTodo(params) {
    const result = network.request("https://www.wanandroid.com/lg/todo/add/json", params, "POST");
    return result;
  },


  //未完成todo列表
  notodo(page, type, params) {
    const result = network.request("https://www.wanandroid.com/lg/todo/listnotdo/" + type + "/json/" + page, params, "POST");
    return result;
  },


  //以完成todo列表
  donetodo(page, type, params) {
    const result = network.request("https://www.wanandroid.com/lg/todo/listdone/" + type + "/json/" + page, params, "POST");
    return result;
  },

  //编辑todo
updateTodo(id,params){
  const result = network.request("https://www.wanandroid.com/lg/todo/update/" + id + "/json", params, "POST");
  return result;
},


  //完成todo
  finishTodo(id, params) {
    const result = network.request("https://www.wanandroid.com/lg/todo/done/" + id + "/json", params, "POST");
    return result;
  },


  
  //删除todo
  deleteTodo(id, params) {
    const result = network.request("https://www.wanandroid.com/lg/todo/delete/" + id + "/json", params, "POST");
    return result;
  },
}