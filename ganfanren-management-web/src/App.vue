<template>
  <div id="app">
    <div class="container">
      <my-header></my-header>
    </div>
    <div class="container">
      <!-- 一级路由的普通路由出口 -->
      <router-view></router-view>
    </div>
    <br/>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <!-- 命名路由 -->
          <router-view name="orderingGuide"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <!-- 命名路由 -->
          <router-view name="delivery"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <!-- 命名路由 -->
          <router-view name="history"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MyHeader from "./components/MyHeader"
export default {
  name: 'App',
  components:{
    MyHeader
  }
}
</script>

<style>

</style>
