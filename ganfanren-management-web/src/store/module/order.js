const state ={
    orderItem:[]
}

const getters={
    //获取属性的状态,菜单一变都变
    getOrderItem:state=>{
        return state.orderItem
    },
}

const mutations={
    //改变属性的状态
    setOrderItem(state,data){
        state.orderItem=data
    },
   
}

const actions={

}

export default{
    state,
    getters,
    mutations,
    actions
}