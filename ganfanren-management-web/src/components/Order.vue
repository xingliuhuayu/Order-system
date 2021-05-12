<template>
    <div class="order row">
        <!-- 订单 -->
        <div class="col-sm-12 col-md-6">
            <Alert :message="alert" v-if="alert"></Alert>
            <table class="table">
                <thead class="thead-default">
                    <tr>
                        <th>订单号</th>
                        <th>时间</th>
                        <th>状态</th>
                        <th>详情</th>
                        <th>删除</th>
                    </tr>
                </thead>
               
                <tbody>
                    <!-- <tr>
                        <td>1</td>
                        <td>
                            <span>4/25</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-success btn-sm">已完成</button>
                        </td>
                        <td>
                            <button class="btn btn-outline-primary btn-sm">订单详情</button>
                        </td>
                    </tr> -->
                    <tr v-for="(item, index) in orderItem" :key="index">
                        <td>{{item.id}}</td>
                        <td>
                            <span>{{item.time}}</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-warning btn-sm" v-if='!item.order_status' @click="changeOrderStatus(item,false)">未完成</button>
                            <button class="btn btn-outline-success btn-sm" v-if='item.order_status' @click="changeOrderStatus(item,true)">已完成</button>
                        </td>
                        <td>
                            <button class="btn btn-outline-primary btn-sm" @click="orderDetail(item)">详情</button>
                        </td>
                        <td>
                            <button class="btn btn-outline-danger btn-sm" @click="removeOrderItem(item)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 订单详情 -->
         <div class="col-sm-12 col-md-6">
            <!-- <Alert :message="alert" v-if="alert"></Alert> -->

            <div class="heade row ">
                <p class="col-md-3"><span>订单号:</span><span>{{orderObj.id}}</span></p>
                <p class="col-md-6"><span>时间:</span><span>{{orderObj.time}}</span></p>
                <p class="col-md-3">
                    <span>状态:</span>
                    <span v-if="orderObj.order_status" class="text-primary">已完成</span>
                    <span v-else class="text-danger">未完成</span>
                </p>
            </div>

            <table class="table">
                <thead class="thead-default">
                    <tr>
                        <th>菜名</th>
                        <th>数量</th>
                        <th>价格</th>
                    </tr>
                </thead>
               
                <tbody>
                    <tr v-for="(item, index) in orderObj.order_detail" :key="index">
                        <td>{{item.goodName}}</td>
                        <td>{{item.goodPrice}}</td>
                        <td>{{item.quantity}}</td>
                    </tr>
                    <tr>
                        <td>总价</td>
                        <td><span>￥</span><span>{{orderObj.total_price}}</span></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            orderObj:{},
            alert:null
        }
    },
    methods:{
        //将订单中的数据全部请求下来，并且存储到vuex中
        getOrderItemToVuex(){
            axios
            .get("/orders")
            .then(res=>{
                //深拷贝，并且反转数组
                let rsOrderItem= [...res.data].reverse()
                this.orderObj=rsOrderItem[0]
                // console.log(this.orderObj);
                
                // console.log('修改后的数组',rsArr);                
                this.$store.commit("setOrderItem",rsOrderItem)
            })
        },
        orderDetail(item){
            console.log(item);
            this.orderObj=item
        },

        // 修改订单的状态（是否完成订单?）
        changeOrderStatus(item,status){

            //item代表当前菜单，status代表订单的状态
            let formData = Object.assign(item,{})
            let {id} = formData
            formData.order_status=!status
            axios
            .patch(`/orders/${id}`,formData)
            // .then(res=>{
            //     this.alert="更新订单状态成功"
            // })
            // .catch(err=>{
            //     this.alert="更新订单状态失败"
            // })
        },
        //删除订单
        removeOrderItem(item){
            let {id} = item
            if(confirm(`
                真的要删除${id}号订单嘛?
                无法恢复呦~~
            `)){
                axios
                .delete(`/orders/${id}`)
                .then(res=>{
                    // this.alert="删除订单成功"
                    this.getOrderItemToVuex()
                })
                // .catch(err=>{
                //     this.alert="删除订单失败"
                // })
            }
        }
        
    },
    computed:{
        orderItem(){
            return this.$store.getters.getOrderItem
        }
    },
    created(){
        //调用方法，将数据存储到vuex中
        this.getOrderItemToVuex()
    }
    
}
</script>