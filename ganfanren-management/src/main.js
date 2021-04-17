// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
//引入axios
import axios from 'axios'
//引入vue-resource
import Resource from 'vue-resource'

//全局引入Alert
import Alert from "./components/Alert"



Vue.use(Resource)

//全局注册Alert组件
Vue.component("Alert",Alert)

//配置axios的公共路径
axios.defaults.baseURL="http://localhost:3000/"
//配置axios的原型
// Vue.prototype.http=axios
/**
 * 完成后可以使用this.http.get(),等等发起请求
*/

Vue.config.productionTip = false

//全局路由守卫
//to到哪里去，from从哪里来，next是否继续
//全局前置守卫，进入一个路由触发
router.beforeEach((to,from,next)=>{
  //1.判断是否处于登录状态，store.getter.isLogin = false ?
  if(store.state.isLogin){
    next()
  }else{
    //2.如果不是登录状态，那么只有login和register页面和Home可以进入
    if(to.path=="/login" || to.path=="/register" || to.path=="/"){
      next()
    }else{
      alert("请先登录")
      next("/login")
    }
  }
  
})

//全局后置守卫
//从一个路由离开时触发
// router.afterEach((to,from)=>{
//   // alert("离开了")
//   // console.log(this.$store);
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data() {
    return {
      // isLogin:false
    }
  },
  mounted() {
    window.addEventListener("beforeunload", () => this.beforeunloadHandler());
  },
  methods: {
    //在页面关闭时，将用户的登录状态变更成false
    beforeunloadHandler() {
      axios
      .get(`/users/${store.state.userId}`)
      .then(res=>{
        // console.log(res.data.id);
        axios
        .put(`/users/${res.data.id}`,{
            "userEmail": res.data.userEmail,
            "userPassword": res.data.userPassword,
            "isLogin": false,
        })
      })
    }
  },
  destroyed() {
    

  },
  
  components: { App },
  template: '<App/>'
})
