<template>
    <div class="row">
        <div class="col-sm-12 col-md-8">
            <!-- 条件渲染，status为一显示添加新菜页面，为而显示更新新菜页面 -->
            <!-- 添加新菜 -->
            <add-new-good v-if="status===2"></add-new-good>
            <update-good v-if="status===1" ></update-good>
        </div>

        <div class="col-sm-12 col-md-4">
            <!-- 商品展示 -->
            <h3 class="text-muted my-3">菜单</h3>
            <table class="table">
                <thead class="table table-default">
                    <tr>
                        <th>菜名</th>
                        <th>更新</th>
                        <th>添加</th>
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


                        <!-- 更新 -->
                        <td>
                            <button 
                            @click="setStatus(1,item)"
                            class="btn btn-outline-primary btn-sm">	&#969;</button>
                        </td>

                        <!-- 添加   -->
                        <td>
                            <button 
                            @click="setStatus(2)"
                            class="btn btn-sm btn-outline-success">+</button>
                        </td>

                        <!-- 删除 -->
                        <td>
                            <button 
                            @click="removeGood(item)"
                            class="btn btn-outline-danger btn-sm ">&times;</button>
                        </td>
                        
                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>
</template>

<script>
import AddNewGood from "../components/manage/AddNewGood"
import UpdateGood from "../components/manage/UpdateGood"
import axios from 'axios'
export default {
    data() {
        return {
            // name:"Barke",
            // menuList:[]
            status:1,
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

        //删除一个菜的方法
        removeGood(item){
            // console.log(item.id);
            //弹出comfirm,用户确定才删除，否则不删除,避免用户误操作
            if(confirm(`
            真的要删除
            ${item.good_name}?,
            无法取消呦~~`)){
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

        /**
         * 变更status来决定渲染添加页面还是更新页面
         * 如果是更新，那么就自动帮助用户填写数据
        */
        setStatus(status,item){
            this.status=status
            if(item){
                this.$store.commit("setItem",item)
            }
            
        }
    },
    computed:{
        menuList(){
            return this.$store.getters.getMenuList
            // get(){
            //     return this.$store.state.menuList
            // },
            // set(){

            // }
        }
    },
    // created(){
    //     // this.getMenuItem()
    // },
    components:{
        AddNewGood,UpdateGood
    }

}
</script>