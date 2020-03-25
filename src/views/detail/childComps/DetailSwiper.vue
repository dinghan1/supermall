<template>
    <swiper class="detailSwiper">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {SwiperItem,Swiper} from 'components/common/swiper'
    export default {
        name: "DetailSwiper",
        components:{
          SwiperItem,
          Swiper
        },
      props:{
        topImages:{
          type:Array,
          default(){
            return []
          }
        }
      }
    }
</script>

<style scoped>
.detailSwiper{
  height: 300px;
  overflow: hidden;
}
</style>
