<template>
    <div class="row mt-3">
        <div class="column-md-12 col-lg-12">
            <Alert :message="alert" v-if="alert"></Alert>
            <div class="card">
                <div class="card-body">
                    <img src="../assets/logo.jpeg" class="mx-auto d-block" >
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="email">邮箱</label>
                            <input type="emial" class="form-control" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" v-model="password">
                        </div>
                        <button class="btn btn-block btn-success">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>、

<script>
// import Alert from "./Alert"
import axios from 'axios'
export default {
    data() {
        return {
            alert:"",
            email:"",
            password:"",
        }
    },
    methods:{
        onSubmit(e){
            /**
             * 1.根据用户的邮箱查询用户的密码，
             * 2.如果能返回数据，则用户存在，如果输入的密码与后台返回的密码一致则成功登录
             * 3.否则用户不存在，提醒用户是否邮箱输入错误
             * 4.如果密码错误则提醒用户密码错误
            */
            let that=this
            axios
            .get(`/users?userEmail=${this.email}`)
            .then(res=>{
                // console.log(res.data);
                // console.log(res.data[0].userPassword,that.password);
                
                //如果没有返回数据，提醒用户邮箱输入错了
                if(res.data.length===0){
                    this.alert="用户不存在！,去注册？"
                }else if(res.data[0].userPassword!==that.password){
                    this.alert="密码不正确"
                    this.$store.dispatch("setUser",that.email)
                }else if(res.data[0].userPassword===that.password){
                    // console.log("可以登录了");
                    /**
                     * 登录后自动跳转到home界面
                     * 并且发起请求将用户登录状态变成true，记录用户信息
                    */
                //    setUserId()
                    this.$store.commit("setUserId",res.data[0].id)
                    axios
                    .put(`/users/${res.data[0].id}`,{
                        "userEmail": res.data[0].userEmail,
                        "userPassword": res.data[0].userPassword,
                        "isLogin": true,
                    })
                    .then(res=>{
                        //    console.log(res);
                        this.$store.dispatch("setUser",that.email)
                        this.$router.push({name:"Menu"})
                    })
                }
                
            })
        }
    },
    created(){
        //注册成功后,自动填写用户信息
        // console.log(this.$route.query);
        
        if(this.$route.query){
            let userInfo=this.$route.query
            this.alert = userInfo.alertText
            this.email=userInfo.userEmail
            this.password=userInfo.userPassword
        }
    },
    //组件内守卫
    beforeRouteEnter (to, from, next) {
        // this.$store.dispatch("setUser",that.email)
        next(v=>{
            v.$store.dispatch("setUser",null)
        })
    },
    components:{
        // Alert
    }
}
</script>
<style lang="less" scoped>
    img{
        width: 225px;
        height: auto;
    }
</style>