<template>
    <div>
        <Alert :message="alert" v-if="alert"></Alert>
         <form class="form">
            <h3 class="text-muted my-3">更新菜</h3>

            <!-- 菜名 -->
            <div class="form-group row">
                <label class="col-sm-1">菜名</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control mt-1" v-model="newItem.good_name" >
                </div>
            </div>

            <!-- 图片的url -->
            <div class="form-group row">
                <label class="col-sm-1">图片</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control mt-1" v-model="newItem.good_imgSrc">
                </div>
            </div>

            <!-- 折扣价格 -->
            <div class="form-group row">
                <label class="col-sm-1" >折扣价</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control mt-3"  v-model="newItem.good_newPrice">
                </div>
            </div>

            <!-- 正常价格 -->
            <div class="form-group row">
                <label class="col-sm-1">正常价</label>
                <div class="col-sm-11">
                    <input type="text" class="form-control mt-3" v-model="newItem.good_oldPrice">
                </div>
            </div>

            <!-- 菜品详细信息 -->
            <div class="form-group row">
                <label class="col-sm-1">菜品信息</label>
                <div class="col-sm-11">
                    <textarea  rows="5" class="form-control" v-model="newItem.good_info"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <button
                @click='updateGood'
                class="btn btn-success btn-block" type="button" >更新</button>
            </div>
        </form>
    </div>
   
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            // newItem:{},
            alert:"",
        }
    },
    methods:{

        //从vuex中获取要更新的菜品信息
        updateGood(){
            let formData=this.newItem
            let {id}=formData
            axios
                .patch(`/menus/${id}`,formData)
                .then(res=>{
                    this.alert="更新新菜成功"
                })
                .catch(err=>{
                    console.log(err);
                })
        }

        
    },
    //如果item改变，那么输入框中的内容也改变
    //实现点击更新按钮，自动填充输入框
    computed:{
        newItem(){
            return this.$store.getters.getItem
        }
    },
    
}
</script>

<style lang="less" scoped>
    textarea{
        resize: none;
    }
    
</style>