//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    base_url: app.globalData.baseurl,
    title: '',
    blog_url: '',
    reivewList:[ ],
    time: (new Date()).toString()
  },


  // get 评论列表
  getBlogReview(){
    var _this = this;
    const { blog_id, openid, baseurl } = app.globalData;
    if (!blog_id) {
      
      return;
    };
    wx.request({
      url: baseurl + '/article_user_message',
      data: {
        blog_id,
        openId: openid
      },
      method: "POST",
      success: function (res) {
        
        var reivewList = res.data.msg
        reivewList.sort((a,b)=>{
          return Number(b.is_top) - Number(a.is_top)
        })
        console.log(reivewList)
        _this.setData({
          reivewList
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
      
      wx.switchTab({
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
        if(res.data.code){
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
      }
    })

  },
  addReview: function(e) {
    const { userInfo } = app.globalData;
    if (!userInfo) {
      wx.switchTab({
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
    if(!blog_id) {
      wx.switchTab({
        url: '../article_list/article_list',
        success:()=>{ 
          wx.showToast({
            title: '当前暂未选择文章，去文章列表看看吧~',
            icon: 'none',
            duration: 2000,
          })
        }
      });
    }
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
    
  },
  onShow: function() {
    // console.log('触发 onShow事件')
    this.changeData();
    app.getUserInfoData();
    this.getBlogReview();
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

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
