import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        //设置属性
        menuList:[],
        currentUser:null,
        //记录登录状态
        isLogin:false
    },
    getters:{
        //获取属性的状态
        getMenuList:state=>{
            return state.menuList
        },
        currentUser:state=>{
            return state.currentUser
        },
        isLogin:state=>{
            return state.isLogin
        }
            
    },
    mutations:{
        //改变属性的状态
        setMenuItem(state,data){
            state.menuList=data
        },
        //匹配传递过来的商品项，如果匹配成功则将该商品从数组中移除
        removeMenuItems(state,data){
            state.menuList.forEach((item,index)=>{
                if(item==data){
                    state.menuList.splice(index,1)
                }
            })
        },
        //将新的商品添加到数组中
        addNewGood(state,data){
            state.menuList.push(data)
        },
        //更改用户的登录状态，已经显示用户信息
        userStatus(state,user){
            if(user){
                state.currentUser=user
                state.isLogin=true
            }else{
                state.currentUser=null
                state.isLogin=false
            }
        }
            

    },
    actions:{
        //应用mutations
        setUser({commit},user){
            commit("userStatus",user)
        }
    }
})