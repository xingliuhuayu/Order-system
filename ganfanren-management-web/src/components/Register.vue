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
                        <div class="form-group">
                            <label for="confirm-password">确认密码</label>
                            <input type="password" class="form-control" v-model="confirmPassword">
                        </div>
                        <button class="btn btn-block btn-success">注册</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>、

<script>
import axios from 'axios'
// import Alert from "./Alert"
export default {
    data() {
        return {
            alert:"",
            email:"",
            password:null,
            confirmPassword:null
        }
    },
    methods:{
        onSubmit(){

            //应该加入一个验证，每个邮箱只能注册一次,不能重复注册
            if(this.password===this.confirmPassword){
                const formData={
                    userEmail:this.email,
                    userPassword:this.password,
                    isLogin:false
                }
                // console.log(formData);
                axios
                .post('/users',formData)
                .then(res=>{
                    // console.log(res);
                    // console.log(res.data);
                    
                    //注册成功后，通过alert提醒用户,并且实现自动填写用户信息。
                    this.$router.push({
                        name:"Login",
                        query:{alertText:"注册成功！",userEmail:res.data.userEmail,userPassword:res.data.userPassword}
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
            }else{
                this.alert='两次密码不一致'
            }
        }
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