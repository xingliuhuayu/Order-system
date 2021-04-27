<template>
    <div class="row">

        <!-- 菜单 -->
        <div class="col-sm-12 col-md-8">
            <Alert :message="alert" v-if="alert"></Alert>
            <table class="table">
                <thead class="thead-default">
                    <tr>
                        <th>图片</th>
                        <th>菜名</th>
                        <th>折扣价格</th>
                        <th>正常价格</th>
                    </tr>
                </thead>
               
                <tbody>
                    <!-- <tr class="menuItem">
                        <td><img src="../assets/tudoushi.jpg" class="goodImg"></td>
                        <td>酸辣土豆丝</td>
                        <td><span>￥</span><span>4.8</span></td>
                        <td><span>￥</span><s>7.8</s></td>
                        <td><button class="btn btn-sm btn-outline-success">+</button></td>
                    </tr> -->
                    <!-- 菜单的每一项 -->
                    <tr class="menuItem" v-for="(item, index) in menuList" :key="index">
                        <td><img src="../assets/tudoushi.jpg" class="goodImg"></td>
                        <td>{{item.good_name}}</td>
                        <td><span>￥</span><span>{{item.good_newPrice}}</span></td>
                        <td><s><span>￥</span><span>{{item.good_oldPrice}}</span></s></td>
                        <td>
                            <!-- 添加点击事件，将商品添加到购物车 -->
                            <button 
                            @click="addGoodToCart(item)"
                            class="btn btn-sm btn-outline-success">+</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 购物车 -->
        <div class="col-md-4 col-sm-12 cart">
            <!-- 购物车里面有内容才显示 -->
            <div v-if="cart.length>0">
                <table class="table">
                    <thead class="thead-default">
                        <tr>
                            <th>菜名</th>
                            <th>价格</th>
                            <th>数量</th>
                        </tr>
                    </thead>
                    
                    <tbody v-for="(item, index) in cart" :key="index">
                        <tr>
                            <!-- 菜名 -->
                            <td>{{item.goodName}}</td>
                            <!-- 一种商品的总价 -->
                            <td>{{item.goodPrice * item.quantity}}</td>
                            <!-- 数量 -->
                            <td>
                                <button 
                                @click="reduceQuantity(item)"
                                class="btn btn-sm btn-outline-danger">-</button>

                                <span>{{item.quantity}}</span>

                                <button 
                                @click="raiseQuantity(item)"
                                class="btn btn-sm btn-outline-success">+</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="total_price">总价：{{totalPrice + "RMB"}}</p>
                <button class="btn btn-success btn-block" @click="submitOrder">提交</button>
            </div>

            <div v-else>
                <p>您的购物车里还没有任何商品！！！</p>
            </div>
        </div>
    </div>
    
</template>
<script>
import axios from 'axios'
export default {
    
    data() {
        return {
            //购物车数组
            cart:[],
            //菜单数组
            // menuList:[],
            alert:""
        }
    },
    computed:{
        //计算并返回全部商品的价格
        totalPrice(){
            let totalMoney=0
            for(let index in this.cart){
                let individualItem= this.cart[index]
                totalMoney += individualItem.quantity * individualItem.goodPrice
            }
            return totalMoney
        },
        //从vuex中获取menuList,并返回数据
        menuList(){
            //直接拿数据
            // return this.$store.state.menuList
            //通过getters获取
            return this.$store.getters.getMenuList
        }
    },
    methods:{
        //发送请求获取menu的数据
        // getMenuItem(){
        //     axios
        //     .get("/menus")
        //     .then(res=>{
        //         // console.log(res.data);
        //         this.menuList=[...res.data]
        //     })
        // },
        //将请求下来的数据存储到vuex中
        getMenuItemToVuex(){
            axios
            .get("/menus")
            .then(res=>{
                // console.log(res.data);
                // this.menuList=[...res.data]
                this.$store.commit("setMenuItem",res.data)
            })
        },
        /**
         * 1.将商品添加到购物车
         * 2.如果事先有，则只有数量加一
         * 3.否则，添加新的商品到购物车
        */
        addGoodToCart(item){
            let cartItem={
                goodName:item.good_name,
                goodPrice:item.good_newPrice,
                quantity:1
            }
            if(this.cart.length>0){
                //过滤
                let result=this.cart.filter((cartItem)=>{
                    return (cartItem.goodName===item.good_name && cartItem.goodPrice===item.good_newPrice)
                })
                //如果商品事先有，数量加一，否则添加商品到购物车
                if(result !=null && result.length >0){
                    result[0].quantity++
                }else{
                    this.cart.push(cartItem)
                }
            }else{
                this.cart.push(cartItem)
            }  
        },
        //减少商品数量,如果商品数量为零，将该商品直接从数组中移除
        reduceQuantity(item){
            item.quantity--
            if(item.quantity <= 0){
                this.removeGoodToCart(item)
            }
        },
        // 增加商品数量
        raiseQuantity(item){
            item.quantity++
        },
        //将商品从购物车中移除，当商品数量为零时触发
        removeGoodToCart(item){
            this.cart.splice(this.cart.indexOf(item,1))
        },
        //提交订单到数据库
        submitOrder(){
            //处理时间
            let localTime=new Date().toLocaleString()
            const formDate={
                "time":localTime,
                "total_price":this.totalPrice,
                "order_detail":this.cart,
                "order_status":false
            }
            axios
            .post(`/orders`,formDate)
            .then(res=>{
                this.alert="订单提交成功"
                //提交成功后清空数组
                this.cart=[]
            })

           
            
        }
    },
    created(){
        //在一开始就获取到菜单的数据
        // this.getMenuItem()
        this.getMenuItemToVuex()
    }
}
</script>

<style lang="less" scoped>
    .goodImg{
        width: 50px;
        height: 50px;
    }
    .menuItem{
        td{
            line-height: 50px;
        }
    }
    .total_price{
        border-top: 1px solid #eee;
    }
    // .menuGroup{
    //     // display: inline-block;
    //     overflow-x: hidden;
    //     overflow-y: scroll;
    //     height: 500px;
    // }

    //让购物车出滚动条
    .cart{
        overflow-x: hidden;
        overflow-y: auto;
        height: 500px;
    }
    
</style>