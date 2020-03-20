<template>
  <tabbar>
    <tabberitem path="/home" activeColor="DeepPink">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-name">首页</div>
    </tabberitem>
    <tabberitem path="/category" activeColor="DeepPink">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-name">分类</div>
    </tabberitem>
    <tabberitem path="/cart" activeColor="DeepPink">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-name">购物车</div>
    </tabberitem>
    <tabberitem path="/profile" activeColor="DeepPink">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-name">我的</div>
    </tabberitem>
  </tabbar>
</template>

<script>
  import Tabbar from 'components/common/tabbar/Tabbar'
  import Tabberitem from 'components/common/tabbar/Tabbaritem'
    export default {
        name: "MainTabBar",
      components:{
        Tabbar,
        Tabberitem
      }
    }
</script>

<style scoped>

</style>
