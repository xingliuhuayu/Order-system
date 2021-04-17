const state ={
    //记录登录状态
    isLogin:false,
    //记录用户的id
    userId:1,
    currentUser:null,
    
}

const getters={
    isLogin:state=>{
        return state.isLogin
    },
    currentUser:state=>{
        return state.currentUser
    },
}

const mutations={
     
    setUserId(state,data){
        state.userId=data
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
    },
}

const actions={
     //应用mutations
     setUser({commit},user){
        commit("userStatus",user)
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}