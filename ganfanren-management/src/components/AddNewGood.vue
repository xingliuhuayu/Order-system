<template>
    <div>
        <Alert :message="alert" v-if="alert"></Alert>
         <form class="form">
            <h3 class="text-muted my-5">添加新菜</h3>

            <!-- 菜名 -->
            <div class="form-group row">
                <label class="col-sm-1">菜名</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control mt-1" v-model="newGood.good_name">
                </div>
            </div>

            <!-- 图片的url -->
            <div class="form-group row">
                <label class="col-sm-1">图片</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control mt-1" v-model="newGood.good_imgSrc">
                </div>
            </div>

            <!-- 折扣价格 -->
            <div class="form-group row">
                <label class="col-sm-1" >折扣价</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control mt-3"  v-model="newGood.good_newPrice">
                </div>
            </div>

            <!-- 正常价格 -->
            <div class="form-group row">
                <label class="col-sm-1">正常价</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control mt-3" v-model="newGood.good_oldPrice">
                </div>
            </div>

            <!-- 菜品详细信息 -->
            <div class="form-group row">
                <label class="col-sm-1">菜品信息</label>
                <div class="col-sm-11">
                    <textarea  rows="5" class="form-control" v-model="newGood.good_info"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <button
                @click="addNewGood" 
                class="btn btn-success btn-block" type="button" >添加</button>
            </div>
        </form>
    </div>
   
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            newGood:{},
            alert:"",
        }
    },
    methods:{
        //添加新菜
        //数据同步到vuex中
        addNewGood(){
            // console.log(this.newGood);
            const formData=Object.assign({},this.newGood)
            axios
                .post('/menus',formData)
                .then(res=>{
                    // console.log(res.data);
                    this.$store.commit("addNewGood",formData)


                    // 请求成功清除输入
                    this.newGood={}
                    //并提醒用户
                    this.alert="添加新菜成功"
                })
                .catch(err=>{
                    console.log(err);
                })

            // let strObj=JSON.stringify(data)
            // console.log(strObj);
            
            // return
            // //会服务器400，暂时搁置
            // fetch("http://localhost:3000/menus",{
            //     method:"POST",
            //     headers:{
            //         "Content-type":"application/json"
            //     },
            //     body:{
            //         body:JSON.stringify(data)
            //     }
            // })
            // .then(res=>{
            //     console.log(res);
            // })
            // .catch(err=>{
            //     console.log(err);
            // })
        },  
    },
}
</script>

<style lang="less" scoped>
    textarea{
        resize: none;
    }
    // .form{
    //     input{
    //         display: block ;
    //         margin: auto 0;
    //     }
    // }
</style>