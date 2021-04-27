// miniprogram/pages/menu/menu.js
//引入封装好的 request
import { request } from "../../request/index"
Page({

  data: {
    //轮播图数据
    swiperList:[
      {
        id:"",
        open_type:"",
        navigator_url:"",
        imgSrc:"http://m.qpic.cn/psc?/V50MDf9e3T15H42YFol43JjKfU1Xe4Iz/ruAMsa53pVQWN7FLK88i5nP4MFOFeDWb8aZU8MM*imo5.v7wiwnreO.YlDbSavi425xJbaHORsDYXGUsMVu8aAhHMZREXXoUlphtthRfUPg!/mnull&bo=ewIFAQAAAAABB10!&rf=photolist&t=5"
      },
      {
        id:"",
        open_type:"",
        navigator_url:"",
        imgSrc:"http://m.qpic.cn/psc?/V50MDf9e3T15H42YFol43JjKfU1Xe4Iz/ruAMsa53pVQWN7FLK88i5gpohaa1S9IjxCwEpB8fXzyAmDvXDRVn.n.kdYr.LWKX9HlE7opPZmV0LV7z1brI67lKkV1AshXJzgC97KHlljA!/mnull&bo=VgW2AgAAAAABB8c!&rf=photolist&t=5"
      },
      {
        id:"",
        open_type:"",
        navigator_url:"",
        imgSrc:"http://m.qpic.cn/psc?/V50MDf9e3T15H42YFol43JjKfU1Xe4Iz/ruAMsa53pVQWN7FLK88i5gpohaa1S9IjxCwEpB8fXzyHwktULsBbiffUUW4wOQFaOc2I6Xtwu5gojzlp6KBJdPiCr2n5Fylo3WpbpLvCoaw!/mnull&bo=wAbIAwAAAAABBy0!&rf=photolist&t=5"
      }
    ],
    //菜单的数据
    menuList:[]
  },

  //计算折扣
  discount(data){
    // console.log(data);
    data.map(item=>{
      let discount=parseFloat(item.good_newPrice/item.good_oldPrice)
      discount=discount.toFixed(2)*10
      item.discount=discount
      console.log(item);
    })
    this.setData({
      menuList:data
    })
  },
  //请求数据
  getMenuList(){
     //发送请求获取菜单的数据
     request({
      url:"http://localhost:3000/menus"
    })
    .then(res=>{
      console.log(res.data);
      this.setData({
        menuList:res.data
      })
      this.discount(res.data)
    })
    .catch(err=>{
      console.log(err);
    })
  },
    
  onLoad: function (options) {
   this.getMenuList()
   
  },


})