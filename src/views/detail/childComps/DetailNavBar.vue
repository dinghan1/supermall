<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="detailtitle">
        <div v-for="(item,index) in titles"
             class="navbar"
             @click="detileClick(index)"
             :class="{active:currentIndex===index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
    export default {
      name: "DetailNavBar",
      components:{
        NavBar
      },
      data(){
        return {
          titles:['商品','参数','评论','推荐'],
          currentIndex:0,
        }
      },
      methods:{
        backClick(){
          this.$router.back()
        },
        detileClick(index){
          this.currentIndex = index
          this.$emit('titleClick',index)
        }
      }
    }
</script>

<style scoped>
  .detailtitle{
    display: flex;
    font-size: 13px;
  }
  .navbar{
    flex: 1;
  }
  .active{
    color: var(--color-tint);
  }
  .back img {
    margin-top: 12px;
  }
</style>
