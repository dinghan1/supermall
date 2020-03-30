<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button
        :isChecked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";
    import {mapGetters} from "vuex"
    export default {
        name: "CartButtomBar",
        components:{
          CheckButton
        },
        computed:{
          ...mapGetters(['cartList']),
          totalPrice(){
            return '￥' + this.cartList.filter(item => {
              return item.checked
            }).reduce((preValue, item) => {
              return preValue + item.price * item.count
            },0).toFixed(2)
          },
          checkLength(){
            return this.cartList.filter(item => item.checked).length
          },
          isSelectAll(){
            if(this.cartList.length === 0) return false
            // 1.使用filter
            // return !(this.cartList.filter(item => !item.checked).length)
            // 2.使用find
            // return !this.cartList.find(item => !item.checked)
            // 3.使用普通遍历
            for (let item of this.cartList){
              if(!item.checked){
                return false
              }
            }
            return true
          },
          isSelectSome(){
            if(this.cartList.length === 0) return false
            return this.cartList.find(item => item.checked)
          }
        },
      methods:{
        checkClick(){
          if (this.isSelectAll){
            this.cartList.forEach(item => item.checked = false)
          } else {
            this.cartList.forEach(item => item.checked = true)
          }
        },
        calcClick(){
          if(!this.isSelectSome){
            this.$toast.show('请选择要购买的商品')
          }
        }
      }
    }
</script>

<style scoped>
.buttom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
  line-height: 40px;
  text-align: center;
}
  .check-content{
    display: flex;
    align-items: center;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .price{
    flex: 1;
  }
  .calculate{
    width: 90px;
    color: #fff;
    background-color: orangered;
  }
</style>
