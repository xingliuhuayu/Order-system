<template>
    <div class="row">
        <div class="col-sm-12 text-center" id="home">
            <Alert :message="alert" v-if="alert"></Alert>
            <div class="background">
                <h1>欢迎大家来到干饭人</h1>
                <h1>这里有各种美食</h1>
                <button class="btn btn-success" @click="goToMenu">Let's order!</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            alert:""
        }
    },
    methods:{
        goToMenu(){
            //跳转到上一次的界面
            // this.$router.go(-1)

            //指定跳转的地址,replace跳转的页面不会被压入栈中
            // this.$router.replace("/menu")

            //指定跳转路由的名字,push也可以
            // this.$router.replace({name:"Menu"})
            this.$router.push({name:"Menu"})
        }
        
    },

}
</script>
<style lang="less" scoped>
    #home{
        // width: 930px;
        background: url('../assets/tudoushi.jpg') no-repeat;
        background-size: 100% ;
        height: 85vh;
        padding: 10%;
    }
    h1,h2{
        margin: 6%;
    }
    .background{
        background: #eee;
        opacity: 0.8;
        max-width: 70vw;
        margin: 0 auto;
        padding: 20px 0;
    }

</style>