//app.js
App({

  onLaunch: function (options) {
    // console.log(this,'app')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    wx.getSystemInfo({
      success(res) {
        console.log(' wx.getSystemInfo',res)
      }
    });
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('wx.login',res)
        let _this = this;
        if (res.code) {
          //发起网络请求
          wx.request({
            url: this.globalData.baseurl+'/user_openId',
            data: {
              code: res.code,
            },
            method: "POST",
            success: function (res) {
              console.log(res.data,'resss')
              if(res.data.code){
                _this.globalData.openid = res.data.msg.openid;
                _this.globalData.session_key = res.data.msg.openid;
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res)
        }
      }
    });
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('getSetting',res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.hasUserInfo = true
              console.log('wx.getUserInfo', res, this.globalData)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log('未获取用户信息')
        }
      }
    })
    
  },

  globalData: {
    blog_id:0,
    title: '蜡笔小新 |壁纸+图片',
    blog_url:'',
    baseurl:'https://www.hhtti.cn/wx',
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid:'',
    seccion_key:''
  }
})