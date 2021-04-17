const state ={
    //菜单数组
    menuList:[],
}

const getters={
    //获取属性的状态
    getMenuList:state=>{
        return state.menuList
    }
}

const mutations={
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
}

const actions={

}

export default{
    state,
    getters,
    mutations,
    actions
}