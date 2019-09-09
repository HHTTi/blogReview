// pages/addReview/addReview.js
const app = getApp();
const { globalData } = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    isDisabled:true,
    message:'',
    blog_id: 0
  },

  getmessage: function (e) {
    let isDisabled ,
        msg = e.detail.value;
    isDisabled = !msg ;
    this.setData({
      message: msg,
      isDisabled
    }) 
  },
  // 改变this.data
  changeData() {
    const { blog_id, title } = globalData;
    this.setData({
      blog_id,
      title
    })
  },
  // add_user_message
  postAddUseMessage(){
    const { blog_id, openid, baseurl,userInfo } = globalData;
    const { message } = this.data;
    console.log('add_user_message', message);
    wx.request({
      url: baseurl + '/add_user_message',
      data: {
        blog_id,
        openId:openid,
        user_message:message,
        user_nickName: userInfo.nickName,
        user_avatarUrl: userInfo.avatarUrl
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        if(res.data.code){
          wx.showToast({
            title: '留言成功',
            icon: 'success',
            duration: 1000,
            success: wx.navigateBack()
          });
        }else {
          wx.showToast({
            title: '留言失败,请稍后再试',
            icon: 'none',
            duration: 2000,
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.changeData();
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