// pages/article_list/article_list.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  // 文章列表
  getArticleList(){
    var _this = this;
    wx.request({
      url: app.globalData.baseurl + '/article_list',
      data: {
        name:'d'
      },
      method: 'post', //上传方式
      success: function (res) {
        // console.log('article_list:', res.data)
        if(res.data.code){
          _this.setData({
            list:res.data.msg
          })
        }
      }
    })
  },
  toBlogReview(e){
    const { blog_id, title, url }  = e.currentTarget.dataset.item;
    // console.log('toBlogReview', e);
      app.globalData.blog_id = blog_id
      app.globalData.title = title
      app.globalData.blog_url = url 
    wx.switchTab({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleList();
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

  }
})