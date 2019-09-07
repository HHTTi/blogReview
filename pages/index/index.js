//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    base_url:app.base_url,
    title:'蜡笔小新 |壁纸+图片',
    reivewList:[
      { 
        id: 0, 
        nickName: 'ddd', 
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/TA3kAQ9NGHHVIIicmvPRoBvBibLsic0P3KgXpnvdSvTR08cWwlQxawPNib1vpjZ8OJXStdNSG0KDcpGCq2ibGnMaYow/132",
        content:'ddddddddsdf的风格的风格豆腐干士大夫敢死队风格dddd d',
        isAuthor:false,
        parised:24,
        createTime:'',
        isTop:false,
        hasAuthorReply:false,
        authorReply:'dddddddddddd'
      },
      {
        id: 0,
        nickName: 'ddd',
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/TA3kAQ9NGHHVIIicmvPRoBvBibLsic0P3KgXpnvdSvTR08cWwlQxawPNib1vpjZ8OJXStdNSG0KDcpGCq2ibGnMaYow/132",
        content: 'ddddddddsdf的风格的风格豆腐干士大夫敢死队风格ddddddddddddsdf的风格的风格豆腐干士大夫敢死队风格ddddddddddddsdf的风格的风格豆腐干士大夫敢死队风格dddd d',
        isAuthor: false,
        parised: 14,
        createTime: '',
        isTop: true,
        hasAuthorReply: true,
        authorReply: 'dddddddddddd'
      }
    ],
    motto: 'Hello World',
    time: (new Date()).toString()
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  addReview: function(e) {
    console.log('e',e);
    wx.navigateTo({
      url: '../addReview/addReview',
    })
  },


  onUnload: function() {
    console.log('触发 onUnload事件')
    
  },
  onHide: function() {
    console.log('触发 onHide事件')
  },
  onReady: function () {
    console.log('触发 onReady事件', this)
    
  },
  onShow: function() {
     console.log('触发 onShow事件')
  },
  onLoad: function () {
  
    console.log('触发 onLoad事件');
  }
})
