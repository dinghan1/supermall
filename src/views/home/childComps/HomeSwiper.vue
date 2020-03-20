<template>
  <div>
    <Swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </Swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "HomeSwiper",
        components:{
          Swiper,
          SwiperItem
        },
      props:{
          banners:{
            type:Array,
            default() {
              return [];
            }
          }
      }
    }
</script>

<style scoped>
a{
  color: #f6f6f6;
}
</style>
