// pages/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[]
  },
  // 授权登录
  getUserInfo: function (e) {
    var userInfo = e.detail.userInfo;
    if (userInfo){
      app.globalData.userInfo = userInfo;
      app.globalData.hasUserInfo = true;
      this.setData({
        userInfo
      })
      // wx.switchTab({
      //   url: '../index/index',
      // });
      this.getCurrentUserMessageAll();
    };
    
  },
  // 改变this.data
  changeData(){
    if (this.data.userInfo) return;
    const { userInfo } = app.globalData;
    this.setData({
      userInfo
    })
  },
  // 获取当前用户所有写的留言
  getCurrentUserMessageAll(){
    var _this = this;
    const { baseurl, openid } = app.globalData;
    if(!openid) {
      wx.showToast({
        title: '授权登录后显示我的留言或者添加留言哦~',
        icon: 'none',
        duration: 2000,
      });
      return;
    };
    wx.request({
      url: baseurl +'/current_u_msg_all?openId='+openid,
      method:"GET",
      success:(res) =>{
        console.log('current_u_msg_all',res.data);
        if (res.data.code){
          _this.setData({list:res.data.msg},()=>{
            wx.stopPullDownRefresh();
          })
        }
      }
    })
  },
  // 删除留言
  delete_message(e){
    // console.log(e.currentTarget)
    var _this = this;
    const { baseurl, openid } = app.globalData;
    const { blog_id, u_message_id } = e.currentTarget.dataset.item;
    if (!openid) return;
    wx.showModal({
      content:'确认删除该留言？',
      success:(res)=> {
        // console.log(res);
        if (!res.cancel && res.confirm){
          wx.request({
            url: `${baseurl}/current_u_msg_delete?openId=${openid}&blog_id=${blog_id}&u_message_id=${u_message_id}`,
            method:'GET',
            success:(res)=> {
              // console.log('delete_message',res.data)
              if (res.data.code){
                let list = _this.data.list, index = e.currentTarget.dataset.id
                
                list.splice(index,1);
                // console.log(list)
                _this.setData({list});
                wx.showToast({
                  title: '删除成功'
                })
              }
            }
          })
        }
      }
    })
  },  
  toAdmin(){
    const { baseurl, openid, userInfo } = app.globalData;
    if(!openid || !userInfo) return;
    wx.showActionSheet({
      itemList:['登录后台'],
      success (res) {
        if(res.tapIndex === 0) {
          // wx.request({
          //   url: `${baseurl}/is_admin?openId=${openid}`,
          //   method:'GET',
          //   success: res => {
          //     // console.log('is_admin',res.data);
          //     if(res.data.code){
                wx.navigateTo({
                  url: '../admin/admin',
                })
          //     }
          //   }
          // })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeData();
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
    this.getCurrentUserMessageAll();

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
  onPullDownRefresh() {
    if(this.data.userInfo){
      this.getCurrentUserMessageAll();
    }
  }  

})