// miniprogram/pages/menu/menu.js
//引入封装好的 request
import {
  request
} from "../../request/index"
//导入全局app.js
const app = getApp()
Page({

  data: {
    //轮播图数据
    swiperList: [{
        id: "",
        open_type: "",
        navigator_url: "",
        imgSrc: "http://m.qpic.cn/psc?/V50MDf9e3T15H42YFol43JjKfU1Xe4Iz/ruAMsa53pVQWN7FLK88i5nP4MFOFeDWb8aZU8MM*imo5.v7wiwnreO.YlDbSavi425xJbaHORsDYXGUsMVu8aAhHMZREXXoUlphtthRfUPg!/mnull&bo=ewIFAQAAAAABB10!&rf=photolist&t=5"
      },
      {
        id: "",
        open_type: "",
        navigator_url: "",
        imgSrc: "http://m.qpic.cn/psc?/V50MDf9e3T15H42YFol43JjKfU1Xe4Iz/ruAMsa53pVQWN7FLK88i5gpohaa1S9IjxCwEpB8fXzyAmDvXDRVn.n.kdYr.LWKX9HlE7opPZmV0LV7z1brI67lKkV1AshXJzgC97KHlljA!/mnull&bo=VgW2AgAAAAABB8c!&rf=photolist&t=5"
      },
      {
        id: "",
        open_type: "",
        navigator_url: "",
        imgSrc: "http://m.qpic.cn/psc?/V50MDf9e3T15H42YFol43JjKfU1Xe4Iz/ruAMsa53pVQWN7FLK88i5gpohaa1S9IjxCwEpB8fXzyHwktULsBbiffUUW4wOQFaOc2I6Xtwu5gojzlp6KBJdPiCr2n5Fylo3WpbpLvCoaw!/mnull&bo=wAbIAwAAAAABBy0!&rf=photolist&t=5"
      }
    ],
    //菜单的数据
    menuList: [],
    //控制购物车的显示和隐藏
    cartDetailShow: false,
    //购物车
    cartItem: {},
    cartList: [],
    //存储当前订单的数量与价格
    cartObj: {
      totalPrice: null,
      totalQuantity: null
    }
  },

  //计算折扣
  discount(data) {
    // console.log(data);
    data.map(item => {
      let discount = parseFloat(item.good_newPrice / item.good_oldPrice)
      discount = discount.toFixed(2) * 10
      item.discount = discount
      // console.log(item);
    })
    this.setData({
      menuList: data
    })
  },
  //请求菜单数据
  getMenuList() {
    //前提时能访问到jsonserver,向jsonServer发送请求获取菜单的数据
    //  request({
    //   url:"http://localhost:3000/menus"
    // })
    // .then(res=>{
    //   // console.log(res.data);
    //   this.setData({
    //     menuList:res.data
    //   })
    //   this.discount(res.data)
    // })
    // .catch(err=>{
    //   console.log(err);
    // })

    //向云数据库获取menu的数据
    const db = wx.cloud.database()
    db.collection('menudb').get()
      .then(res => {
        // console.log(res);

        this.setData({
          menuList: res.data
        })
        //计算折扣
        this.discount(res.data)
      })

  },

  //将商品加入购物车
  /**
   * 获取缓存中的购物车数组，
   * 先判断，如果当前商品已经在购物车中，那么数量加一
   * 否则，将当前商品加入数组中
   * 
   */
  addGoodToCart(e) {
    let {item} = e.currentTarget.dataset
    //短路与 如果cartArr存在，返回cartArr，否则为空数组
    let cartArr = wx.getStorageSync("cartArr") || [];

    //寻找下标 ，存在着返回一，否则返回该元素的下标
    let index = cartArr.findIndex(v => {
      return v.id === item.id
    })

    if (index === -1) {
      //为负一该元素不存在，将该元素添加到数组中
      item.quantity = 1
      item.totalItemPrice = item.good_newPrice
      cartArr.push(item)
    } else {
      /**
       * 存在该商品的数量加一,并且重新计算该商品的价格
       */
      let item = cartArr[index]
      item.quantity++
      item.totalItemPrice = item.quantity * item.good_newPrice
    }
    //把购物车添加回缓存中
    wx.setStorageSync('cartArr', cartArr);
    // wx.showToast({
    //   title: '加入成功',
    //   icon: 'success',
    //   duration: 100,
    //   mask: true,//防止触摸穿透
    // });
    this.setData({
      cartList: cartArr
    })
    //计算商品数量与总价格
    this.totalCartInfo()

  },
  //改变商品的数量，还存在bug，无法正常计算商品的价格，商品数量可以正常计算
  changeGoodsQuantity(e){
    //获取商品的详情，以及是进行数量加一还是减一
    let {item,command} = e.currentTarget.dataset

    //获取缓存
    let cartArr = wx.getStorageSync("cartArr")

    //寻找下标,根据下标找到指定的向变更的商品
    let index = cartArr.findIndex(v => {
      return v.id === item.id
    })
    
    let target =  cartArr[index]
    if(command=="add"){
      target.quantity++
      target.totalItemPrice = target.quantity * target.good_newPrice
      // console.log( item.totalItemPrice);
      // console.log("jia");
    }else{
      /**
       * 如果商品的数量小于1那么将该商品从数组中移除，否则商品数量减减
       * 如果一件商品都没有了，则将购物车收起
      */
      if(cartArr[index].quantity<=1){
        cartArr.splice(index,1)
        if(cartArr.length<=0){
           this.setData({
                cartList:[],
                ["cartObj.totalPrice"]:null,
                ["cartObj.totalQuantity"]:null,
                cartDetailShow:false
              })
             
              wx.setStorageSync('cartArr', []);
        }
      }else{
        target.quantity--
        target.totalItemPrice = target.quantity * target.good_newPrice
        // console.log( item.totalItemPrice)
        // console.log("jian");
      }
     
    }
    
    //将变更后的数据存入缓存中
    wx.setStorageSync('cartArr', cartArr);
    this.setData({
      cartList: cartArr
    })
    this.totalCartInfo()
  },


  initCartDetail() {
    let cartArr = wx.getStorageSync("cartArr") || [];
    this.setData({
      cartList: cartArr,
    })
  },

  //计算商品数量与价格
  totalCartInfo() {
    //计算商品数量与总价格
    let cartArr = wx.getStorageSync("cartArr") || [];
    let allQuantity = 0

    let allPirce = 0
    cartArr.map(v => {
      allQuantity += v.quantity
      allPirce += v.totalItemPrice
      // console.log(allPirce);
      //保留一位小数
      allPirce = Number(parseFloat(allPirce).toFixed(1))
    })

    this.setData({
      ["cartObj.totalPrice"]: allPirce,
      ["cartObj.totalQuantity"]: allQuantity
    })
  },

  // 将jsonServer上的数据拷贝到小程序上
  getMenuDataToWxdb() {
    request({
        url: "http://localhost:3000/menus"
      })
      .then(res => {
        // console.log(res.data);
        const db = wx.cloud.database()
        for (let v of res.data) {
          db.collection('menudb').add({
            data: {
              ...v
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  },

  //结算用户的购物车并且将提交订单
  submitOrder() {
    // console.log(this.data.cartObj.totalPrice);
    wx.showModal({
      title: '提交订单?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          let cartArr = wx.getStorageSync("cartArr");
          let time = new Date().toLocaleDateString()
          const db = wx.cloud.database()
          const _ = db.command
          // console.log(_.inc);
          //将用户提交的记录添加到云数据库中
          db.collection('orderdb')
          .add({
              data: {
                time: time,
                total_price: this.data.cartObj.totalPrice,
                order_status: false,
                order_detail: cartArr,
                allGoodsQuantity:this.data.cartObj.totalQuantity,
                allGoodsPrice:this.data.cartObj.totalPrice
              }
          })
          .then(res => {
            /*
            * 成功后清空缓存，并且将收起购物车
            */
            this.setData({
              cartList:[],
              ["cartObj.totalPrice"]:null,
              ["cartObj.totalQuantity"]:null,
              cartDetailShow:false
            })
            // // console.log(this.data.cartDetailShow);
            wx.setStorageSync('cartArr', []);
          })

        }//Modalsuccess
      },//showModal
    });
  },

  //清空购物车
  resetCartList() {
    wx.showModal({
      title: '清空购物车?',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          this.setData({
            cartList: [],
            ["cartObj.totalPrice"]: null,
            ["cartObj.totalQuantity"]: null,
            cartDetailShow: false
          })
          //隐藏购物车
          wx.setStorageSync('cartArr', []);
        }
      },
    });
  },
  //控制菜单的显示与隐藏
  showCartDetail() {
    // console.log("显示与隐藏遮罩");
    let flag = !this.data.cartDetailShow
    this.setData({
      cartDetailShow: flag
    })
  },


  onLoad: function (options) {
    //获取菜单数据
    this.getMenuList()

    //获取缓存中的购物车 数组
    //页面初始化购物车数组
    this.totalCartInfo()

    //将json上的数据拷贝到云数据库中
    // this.getMenuDataToWxdb()

    //初始化购物车商品细节
    this.initCartDetail()
  },
  //页面初次加载便获取用户的openId
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