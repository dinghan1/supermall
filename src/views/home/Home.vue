<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @currentType="tabType"
                 ref="tabControl2" v-show="isTabFixed"></tab-control>
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="scroll"
            :pullUpLoad="true"
            @pullingUp="getMore">
      <HomeSwiper :banners="banners" @swiperimgload="swiperimgload"></HomeSwiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @currentType="tabType"
                   ref="tabControl1"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {itemListenerMixin} from "common/mixin";

  export default {
        name: "Home",
        components:{
          RecommendView,
          HomeSwiper,
          FeatureView,
          NavBar,
          TabControl,
          GoodsList,
          Scroll,
          BackTop
        },
      data(){
        return {
          banners:[],
          recommends:[],
          goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]},
          },
          currentType:'pop',
          isShow:false,
          tabOffsetTop:0,
          isTabFixed:false,
          saveY:0
        }
      },
      created() {
        console.log('home create');
        //1.请求多个数据
        this.getHomeMultidata()
        //请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
    mounted() {
      console.log('我不是混入的');
    },
    mixins:[itemListenerMixin],
    destroyed() {
      console.log('destroyed');
    },
    activated() {
          this.$refs.scroll.refresh()
          this.$refs.scroll.scrollTo(0,this.saveY,0)

    },
    deactivated() {
          //1.保存Y值
          this.saveY = this.$refs.scroll.scroll.y
      //2.取消全局事件的监听
          this.$bus.$off('itemimgload',this.itemImageListener)
    },
    computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      methods:{
          /**
           * 事件监听相关的方法
           */
          //获取tabControl的OffsetControl
          //所有的组件都有一个属性$el:用于获取组件中的元素
          swiperimgload(){
            this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
          },
          tabType(index){
            switch (index) {
              case 0:
                this.currentType = 'pop'
                break
              case 1:
                this.currentType = 'new'
                break
              case 2:
                this.currentType = 'sell'
                break
            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
          },
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
        },
        scroll(position){
            //1.判断backtop是否显示
          this.isShow = position.y<-1000
          //2.判断tabControl是否吸顶
            this.isTabFixed = (-position.y)>this.tabOffsetTop
        },
        getMore(){
          this.getHomeGoods(this.currentType)
        },
        /**
         * 网络请求相关的方法
         */
        getHomeMultidata(){
          getHomeMultidata().then(res => {
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
          })
        },
        getHomeGoods(type){
          const page = this.goods[type].page + 1
          getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1
            this.$refs.scroll.finishPullUp()
          })
        }

      }
    }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: white;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
.tab-control{
  position: relative;
  z-index: 9;
}
  .scroll {
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
  /*.scroll{*/
  /*  !*height: calc(100vh - 93px);*!*/
  /*  height: calc(100% - 49px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
