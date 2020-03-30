<template>
  <div id="cart">
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--  商品的列表-->
    <cart-list></cart-list>
    <!--  底部汇总-->
    <cart-buttom-bar></cart-buttom-bar>
  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import CartList from "./childComps/CartList";
    import CartButtomBar from "./childComps/CartButtomBar";
    import { mapGetters } from 'vuex'
    export default {
        name: "Cart",
        components:{
          NavBar,
          CartList,
          CartButtomBar
        },
        computed:{
            //两种语法
            // ...mapGetters(['cartLength']),
            ...mapGetters({
              length:'cartLength'
            })
        }
    }
</script>

<style scoped>
  #cart{
    height: 100vh;
  }
.cart-bar{
  background-color: var(--color-tint);
  color: white;
}
</style>
