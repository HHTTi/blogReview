//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    base_url: app.globalData.baseurl,
    title: app.globalData.title,
    blog_url: app.globalData.blog_url,
    reivewList:[
      {
        u_message_id: 0,
        nickName: 'ddd',
        user_avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/TA3kAQ9NGHHVIIicmvPRoBvBibLsic0P3KgXpnvdSvTR08cWwlQxawPNib1vpjZ8OJXStdNSG0KDcpGCq2ibGnMaYow/132",
        content: 'ddddddddsdf的风格的风格豆腐干士大夫敢死队风格ddddddddddddsdf的风格的风格豆腐干士大夫敢死队风格ddddddddddddsdf的风格的风格豆腐干士大夫敢死队风格dddd d',
        isAuthor: false,
        parised: 14,
        createTime: '',
        isTop: true,
        hasAuthorReply: true,
        author_message: 'dddddddddddd',
        isCurrentUser:false
      }
    ],
    time: (new Date()).toString()
  },


  // get 评论列表
  getBlogReview(){
    var _this = this;
    const { blog_id, openid, baseurl } = app.globalData;
    if (!blog_id) return;
    wx.request({
      url: baseurl + '/article_user_message',
      data: {
        blog_id,
        openId: openid
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        _this.setData({
          reivewList: res.data.msg
        })
      }
    })
  },
  // 点赞
  addParised(e){
    var _this = this;
    const { blog_id, openid, baseurl } = app.globalData;
    const u_message_id  = e.currentTarget.dataset.id;
    console.log('u_message_id', u_message_id)
    if (!blog_id) return;
    wx.request({
      url: `${baseurl}/add_u_msg_like?blog_id=${blog_id}&openId=${openid}&u_message_id=${u_message_id}`,

      method: "GET",
      success: function (res) {
        console.log('点赞res:',res.data)
        if(res.data.code){
          
        }
      }
    })
  },
  // 当前用户点的赞
  current_u_msg_like(){
    var _this = this;
    const { blog_id, openid, baseurl } = app.globalData;
    wx.request({
      url: `${baseurl}/current_u_msg_like?blog_id=${blog_id}&openId=${openid}`,

      method: "GET",
      success: function (res) {
        console.log('res:', res.data)
      }
    })

  },
  addReview: function(e) {
    console.log('e',e);
    wx.navigateTo({
      url: '../addReview/addReview',
    })
  },
  // 改变this.data
  changeData(){
    const { blog_id, blog_url, title } = app.globalData;
    this.setData({
      blog_id,
      blog_url,
      title
    })
  },

  onUnload: function() {
    // console.log('触发 onUnload事件')
    
  },
  onHide: function() {
    // console.log('触发 onHide事件')
  },
  onReady: function () {
    console.log('触发 onReady事件',app)
    app.getUserInfoData();
    this.getBlogReview();
    
  },
  onShow: function() {
    //  console.log('触发 onShow事件')
    this.changeData();
    this.current_u_msg_like();
  },
  onLoad: function () {
  
    console.log('触发 onLoad事件', app.globalData);


  },
  // shuaxin
  onPullDownRefresh() {
    this.getBlogReview();
  }   
})
