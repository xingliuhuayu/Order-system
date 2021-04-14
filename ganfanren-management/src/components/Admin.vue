<template>
    <div class="row">
        <div class="col-sm-12 col-md-8">
            <!-- 添加新菜 -->
            <add-new-good></add-new-good>
        </div>

        <div class="col-sm-12 col-md-4">
            <!-- 商品展示 -->
            <h3 class="text-muted my-5">菜单</h3>
            <table class="table">
                <thead class="table table-default">
                    <tr>
                        <th>菜名</th>
                        <th>删除</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr>
                        <td>酸辣土豆丝</td>
                        <td>
                            <button class="btn btn-outline-danger btn-sm">&times;</button>
                        </td>
                    </tr> -->
                    <tr v-for="(item, index) in menuList" :key="index">
                        <td>{{item.good_name}}</td>
                        <td>
                            <button 
                            @click="removeGood(item)"
                            class="btn btn-outline-danger btn-sm">&times;</button>
                        </td>
                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>
</template>

<script>
import AddNewGood from "./AddNewGood"
import axios from 'axios'
export default {
    data() {
        return {
            // name:"Barke",
            // menuList:[]
        }
    },
    // beforeRouteEnter (to, from, next) {
    //     //无法在该处直接访问到data中的数据
    //     // alert("hello"+ this.name)
    //     // next()
    //     next(v=>{
    //         alert("hello" + v.name)
    //     })
    // },

    //在用户即将离开路由时进行提醒
    // beforeRouteLeave (to, from, next) {
    //     //即将从一个路由离开时触发
    //     if(confirm("您确离开吗") ==true){
    //         next(true)
    //     }else{
    //         next(false)
    //     }
    // },
    methods:{
        //获取全部商品信息
        // getMenuItem(){
        //     axios
        //     .get("/menus")
        //     .then(res=>{
        //         // console.log(res.data);
        //         this.menuList=[...res.data]
        //     })
        // },
        //数据同步vuex
        removeGood(item){
            // console.log(item.id);
            axios
            .delete(`/menus/${item.id}`)
            .then(res=>{

                // console.log(res.data);
                // this.menuList=[...res.data]
                // this.getMenuItem()

                this.$store.commit("removeMenuItems",item)
            })
        }
    },
    computed:{
        menuList:{
            // return this.$store.state.menuList
            get(){
                return this.$store.state.menuList
            },
            set(){

            }
        }
    },
    // created(){
    //     // this.getMenuItem()
    // },
    components:{
        AddNewGood
    }

}
</script>