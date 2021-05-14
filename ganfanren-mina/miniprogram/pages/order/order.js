// miniprogram/pages/order/order.js
//导入全局app.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArr:[]
  },
  getUserOrderByUserId(){
    const db = wx.cloud.database()
    db.collection("orderdb").get()
    .then(res=>{
      this.orderArr=res.data.reverse()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userId);
    this.getUserOrderByUserId()
  },

  /**
   * 页面关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  
})