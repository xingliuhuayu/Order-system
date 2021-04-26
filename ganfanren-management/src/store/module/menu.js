const state ={
    //菜单数组
    menuList:[],
    //要更新的菜名信息
    item:{}
}

const getters={
    //获取属性的状态,菜单一变都变
    getMenuList:state=>{
        return state.menuList
    },
    //获取item的改变
    getItem:state=>{
        return state.item
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
    //修改要更新的菜品信息
    setItem(state,data){
        state.item=data
    }
}

const actions={

}

export default{
    state,
    getters,
    mutations,
    actions
}