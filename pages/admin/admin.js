// pages/admin/admin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    page:1,
    size:10,
    list:[], //留言列表
    inputShow:-1,
    inputValue:'', //作者回复内容
    replyItem:null //回复 的参数
  },
  // 登录请求
  postLogin: function (e) {
    const { baseurl } = app.globalData;
    var _this = this;
    var value = e.detail.value;
    // console.log('form submit：', e.detail.value);
    if(!value.name || !value.pass) return;
    wx.request({
      url: baseurl+'/admin_login',
      data:  value,
      method:'POST',
      success:(res)=>{
        // console.log(res.data)
        const { code, msg } = res.data;
        if (code){
          _this.setData({token:msg.token},()=>{
            _this.admin_all_message()
          });
        }else{
          wx.showToast({
            title: '账号或者密码错误',
            icon: 'none',
            duration: 1500,
          })
        }
      }

    })
  },

  // 获取留言列表
  admin_all_message(){
    var _this = this;
    const { token, page, size } = this.data;
    const { baseurl } = app.globalData;
    wx.request({
      url: `${baseurl}/admin_all_message?token=${token}&page=${page}&size=${size}`,
      method:'GET',
      success: (res) => {
        // console.log(res.data);
        var { code, msg } = res.data;
        if(code){
          _this.setData({ list: msg }, () => {
            wx.stopPullDownRefresh();
          })
        }
      }
    })
  },

  // 处理留言
  change_message(e){
    // console.log(e);
    var val = e.target.id; //delete,toTop,reply

    const { item, index } = e.currentTarget.dataset
    const { blog_id, u_message_id,author_message } = item;

    const { baseurl } = app.globalData;
    const { token } = this.data;
    if (!token || !blog_id || !u_message_id) {
      wx.showToast({
        title: '请求错误，刷新试试',
        icon: 'none',
        duration: 1500,
      })
      return;
    };
    if (val === 'delete') {
      this.delete_message(token, baseurl, blog_id, u_message_id, index);
    }else if(val === 'toTop'){
      this.to_top(token, baseurl, blog_id, u_message_id, index);
    }else if( val === 'reply'){
      author_message 
      ? wx.showToast({
          title: '你已经回复过了哦~',
          icon :'none',
          duration: 1500,
        })
      : this.setData({
          inputShow:index,
          replyItem:item
        });
    }
  },
  // 删除
  delete_message(token, baseurl, blog_id, u_message_id, index){
    var _this = this;

    wx.showModal({
      content: '确认删除该留言？',
      success: (res) => {
        if (!res.cancel && res.confirm) {
          wx.request({
            url: `${baseurl}/admin_msg_delete?token=${token}&blog_id=${blog_id}&u_message_id=${u_message_id}`,
            method: 'GET',
            success: (res) => {
              if (res.data.code) {
                let list = _this.data.list;

                list.splice(index, 1);
                _this.setData({ list });
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

  // replyValue input 双向绑定
  replyValue (e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 管路员回复留言
  reply(e){
    var _this = this;
    const id  = e.target.id;//send,cancel
    if(id ==='cancel'){
      this.setData({
        inputShow:-1,
        inputValue:''
      })
    }else if(id === 'send'){
      const { replyItem, token, inputValue,inputShow } = this.data;
      const { blog_id, u_message_id } = replyItem;
      const { baseurl } = app.globalData;

      if(!blog_id || !u_message_id) return;
      wx.request({
        url:baseurl+'/admin_reply_message',
        method:'POST',
        data:{
          token,
          blog_id,
          u_message_id,
          reply:inputValue
        },
        success: res => {
          if(res.data.code) {
            let list = _this.data.list;

            list[inputShow].author_message = inputValue
            _this.setData({ 
              list,
              inputShow:-1,
              inputValue:''
            });
            wx.showToast({
              title: '回复成功',
              duration: 1500,
            });
          }
        }
      })
    }
    
  },
  // 置顶
  to_top(token, baseurl, blog_id, u_message_id, index){
    var _this = this;
    wx.request({
      url: `${baseurl}/admin_to_top_message?token=${token}&blog_id=${blog_id}&u_message_id=${u_message_id}`,
      success: res =>{
        // console.log(res)
        var {code,msg} = res.data;
        if(code) {
          let text = '';
          msg.isTop ?
            text = '置顶成功'
            :text = '取消置顶';

            wx.showToast({
              title: text,
              duration: 1500,
            });
          let list = _this.data.list;

          list[index].is_top = msg.isTop;
          _this.setData({list});
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
  onPullDownRefresh() {
    this.admin_all_message();
  } 
})