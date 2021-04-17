<template>
    <div class="card text-dark bg-light mb-3">
        <div class="card-header">联系我们</div>
        <div class="card-body">
            <h4 class="card-title">联系我们</h4>
            <p class="cart-text">283928@qq.com</p>
            <!-- <router-view :to="{name:'Phone'}"></router-view> -->
            <router-link :to="{name:'Phone'}">电话</router-link>
            <router-link :to="{name:'PersonName'}">联系人</router-link>
            <router-view></router-view>
        </div>
    </div>
</template>