//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    base_url: app.globalData.baseurl,
    title: '',
    blog_url: '',
    reivewList:[
      // {
      //   u_message_id: 0,
      //   user_nickName: 'ddd',
      //   user_avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/TA3kAQ9NGHHVIIicmvPRoBvBibLsic0P3KgXpnvdSvTR08cWwlQxawPNib1vpjZ8OJXStdNSG0KDcpGCq2ibGnMaYow/132",
      //   content: 'ddd',
      //   isParised: false,
      //   like_number: 14,
      //   isTop: true,
      //   is_show:'',
      //   author_message: 'dddddddddddd',
      // }
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
        // console.log(res.data)
        _this.setData({
          reivewList: res.data.msg
        },()=>{
          _this.current_u_msg_like();
          wx.stopPullDownRefresh()
        })
      }
    })
  },
  // 点赞 或者 取消点赞 
  addParised(e){
    var _this = this;
    const { blog_id, openid, baseurl, userInfo } = app.globalData;
    if (!userInfo) {
      
      wx.navigateTo({
        url: '../mine/mine'
      });
      return;
    }
    var { index ,id }  = e.currentTarget.dataset;
    // console.log('u_message_id', id)
    if (!blog_id) return;
    wx.request({
      url: `${baseurl}/add_u_msg_like?blog_id=${blog_id}&openId=${openid}&u_message_id=${id}`,

      method: "GET",
      success: function (res) {
        // console.log('点赞res:',res.data)
        if(res.data.code){
          let reivewList = _this.data.reivewList;

          reivewList[index].isParised ? reivewList[index].like_number -= 1 : reivewList[index].like_number += 1;
          reivewList[index].isParised = !reivewList[index].isParised;

          // console.log(' reivewList[index]',reivewList)
          _this.setData({
            reivewList
          })
          
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
        // console.log('res:', res.data)
        let list = _this.data.reivewList,
            arr = res.data.msg;
        // console.log('list', list)
        for (let i = 0; i < list.length;i++){
          arr.forEach(ele => {
            if(ele.u_message_id === list[i].u_message_id) 
              list[i].isParised = true ;
          })
        }
        _this.setData({
          reivewList: list
        })
      }
    })

  },
  addReview: function(e) {
    const { userInfo } = app.globalData;
    if (!userInfo) {
      wx.navigateTo({
        url: '../mine/mine'
      });
      return;
    }
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
    // console.log('触发 onReady事件',app)
    app.getUserInfoData();
    this.getBlogReview();
    
  },
  onShow: function() {
    // console.log('触发 onShow事件')
    this.changeData();
    app.getUserInfoData();
    this.getBlogReview();
  },
  to_current_article(){
    wx.navigateTo({
      url: '../article_view/article_view',
    })
  },
  // shuaxin
  onPullDownRefresh() {
    this.getBlogReview();
  }   
})
