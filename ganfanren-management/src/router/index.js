import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//一级 myheader上的路由组件
import Home from '@/components/Home'
import Menu from '@/components/Menu'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
import Register from '@/components/Register'
import About from '@/components/about/About'

//about二级路由
import History from '@/components/about/History'
import Contact from '@/components/about/contact/contact'
import OrderingGuide from '@/components/about/OrderingGuide'
import Delivery from '@/components/about/Delivery'

//contact三级路由

import Phone from '@/components/about/contact/Phone'
import PersonName from '@/components/about/contact/PersonName'


Vue.use(Router)

export default new Router({
  mode:"history",
  //滚动行为,只有通过浏览器前进后退才能触发
  //页面必须有滚动条
  scrollBehavior(to,from,savedPosition){
    //返回固定的位置
    // return {x:0,y:100}

    //返回某个便签的位置
    // return {selector:".btn"}

    //每次触发将页面重置到顶部
    if(savedPosition){
      return savedPosition
    }else{
      return {x:0,y:0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      components:{
        //默认路由
        default:Home,
        //命名路由
        "orderingGuide":OrderingGuide,
        "delivery":Delivery,
        "history":History
      }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/admin',
      name: 'Admin',
      //路由独享守卫
      // beforeEnter:(to,next,from)=>{
      //   alert("非登录界面，无法访问该界面")
      //   if(to.path=="/login" || to.path=="/register"){
      //     next()
      //   }else{
      //     alert("请先登录")
      //     next("/login")
      //   }
      // },
      component: Admin
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      redirect:"/contact",
      children:[
        {path:"/history",name:"History",component:History},
        {
          path:"/contact",name:"Contact",component:Contact,
          // redirect:"/about/contact/phone",
          children:[
            {path:"/phone",name:"Phone",component:Phone},
            {path:"/personname",name:"PersonName",component:PersonName}
          ]
        },
        {path:"/orderingGuide",name:"OrderingGuide",component:OrderingGuide},
        {path:"/delivery",name:"Delivery",component:Delivery}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path:"*",
      redirect:"/"
    }
   
  ]
})
