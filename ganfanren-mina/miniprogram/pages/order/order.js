// miniprogram/pages/order/order.js
//导入全局app.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderArr:[],
    //保存
    // cartObj:{}
  },
  //通过用户的oppenid来查询订单
  getUserOrderByUserId(){
    const db = wx.cloud.database()
    db.collection("orderdb").get()
    .then(res=>{
      this.setData({
        orderArr:res.data.reverse()
      })
    })
  },
  //删除订单
  removeOrderItem(e){
    // console.log(e.currentTarget.dataset.orderinfo);
   wx.showModal({
     title: '确定删除订单？无法恢复哟~~',
     showCancel: true,
     cancelText: '取消',
     cancelColor: '#000000',
     confirmText: '确定',
     confirmColor: '#3CC51F',
     success: (result) => {
       if(result.confirm){
        let item=e.currentTarget.dataset.orderinfo
         const db= wx.cloud.database()
        //  console.log(db);
        // console.log(item._id);
         db.collection('orderdb').doc(item._id).remove()
         .then(res=>{
          //数据库删除成功后在删除本地数据
          let {orderArr}=this.data
          let index = orderArr.findIndex(v=>{
            return v._id==item._id
          })
          orderArr.splice(index,1)
          this.setData({
            orderArr:orderArr
          })
          wx.showToast({
            title: '订单删除成功',
            icon: 'success',
            duration: 800,
            mask: true,
          });
         })
         .catch(err=>{
           wx.showToast({
             title: '订单删除失败',
             icon: 'error',
             image: '',
             duration: 800,
             mask: true,
           });
         })
        

       }
     },

   });
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userId);
    this.getUserOrderByUserId()
  },
  onShow:function(){
    this.getUserOrderByUserId()
  },
  onReady:function(){
    wx.cloud.callFunction({
      name:"login",
    }).then(res=>{
      // console.log(res);
      let {openid:userId}=res.result
      app.globalData.userId=userId
    })
  }

  
})