<template>
  <div id="detail">
    <DetailNavBar class="detail-navbar" @titleClick="titleClick" ref="titlenb"></DetailNavBar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <DetailSwiper :top-images="topImages"></DetailSwiper>
        <DetailBaseInfo :goods="goods"></DetailBaseInfo>
        <DetailShopInfo :shop="shop"></DetailShopInfo>
        <DetailGoodsInfo :detailInfo="detailInfo" @imgload="imageLoad"></DetailGoodsInfo>
        <DetailParamInfo :paramInfo="paramsInfo" ref="params"></DetailParamInfo>
        <DetailCommentInfo :comment-info="commentInfo" ref="comment"></DetailCommentInfo>
        <GoodsList :goods="recommends" ref="recommend"></GoodsList>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
<!--    <toast :message="message" :show="show"></toast>-->
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "components/common/scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import GoodsList from "components/content/goods/GoodsList";
    // import Toast from "components/common/toast/Toast";
    // import BackTop from "../../components/content/backTop/BackTop";
    import {itemListenerMixin,backtopMixin} from "common/mixin";
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
    import {debounce} from "../../common/utils";
    import { mapActions } from 'vuex'

    export default {
        name: "Detail",
        components:{
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          Scroll,
          DetailGoodsInfo,
          DetailParamInfo,
          DetailCommentInfo,
          GoodsList,
          // Toast,
          DetailBottomBar,
          // BackTop
        },
        data(){
          return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramsInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            scrollIndex:0,
            // isShow:false,
            // show:false,
            // message:''
          }
        },
      created(){
          //1.保存传入的iid
          this.iid = this.$route.params.iid
        //2.根据iid请求详数据
        getDetail(this.iid).then(res => {
          //1.获取顶部的图片轮播数据
          const data = res.result
          // console.log(data);
          this.topImages = data.itemInfo.topImages
          //2.获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //3.创建店铺信息
          this.shop = new Shop(data.shopInfo)
          //4.保存商品的详情数据
          this.detailInfo = data.detailInfo
          //5.获取参数信息
          this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          //6.取出评论信息
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
          //1.第一次获取值不对，原因是this.$refs.params.$el压根没有渲染
          // this.themeTopYs = []
          // this.themeTopYs.push(0)
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs);
          // this.$nextTick(() => {
          //   //2.第二次获取值不对，原因是图片没有计算再累
          //   //根据最新的数据，对应的DOM是已经被渲染出来
          //   //但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
          //   //offsetTop值不对的时候，都是因为图片的问题
          //   this.themeTopYs = []
          //   this.themeTopYs.push(0)
          //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //   console.log(this.themeTopYs);
          // })
        })
        //3.请求推荐数据
        getRecommend().then(res => {
          this.recommends = res.data.list
        })
        //4.给getThemeTopY赋值
        this.getThemeTopY = debounce(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log(this.themeTopYs);
        },300)
      },
      methods:{
          ...mapActions(['addCart']),
        // backClick(){
        //   this.$refs.scroll.scrollTo(0,0)
        // },
        imageLoad(){
          this.refresh()
          // this.$refs.scroll.refresh()
          this.getThemeTopY()
        },
        titleClick(index){
          // console.log(index);
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        contentScroll(position){
          //1.获取y值
          const positionY = -position.y
          //2.positionY和主题中的值进行对比
          let length = this.themeTopYs.length
          for (let i = 0;i<length-1;i++){
            if(this.scrollIndex !== i && (positionY >= this.themeTopYs[i] && positionY <this.themeTopYs[i+1])){
              this.scrollIndex = i
              this.$refs.titlenb.currentIndex = this.scrollIndex
            }
          }
          this.ifshow(position)
          // for(let i = 0; i< length;i++){
          //   if(this.scrollIndex !== i &&
          //     ((i < length - 1 && positionY >= this.themeTopYs[i]
          //       && positionY < this.themeTopYs[i+1])
          //       || (i === length -1 && positionY >= this.themeTopYs[i]))){
          //     this.scrollIndex = i
          //     this.$refs.titlenb.currentIndex = this.scrollIndex
          //   }
          // }
          //1.判断backtop是否显示
          // this.isShow = position.y<-1000
        },
        addToCart(){
          //1.获取购物车需要展示的信息
          const product = {}
          product.image = this.topImages[0]
          product.title = this.goods.title
          product.desc = this.goods.desc
          product.price = this.goods.realPrice
          product.iid = this.iid
          //2.将商品添加到购物车
          //2.1 actions可以返回一个Promise
          //2.2 mapActions的映射关系
          // this.$store.commit('addCart',product)
          this.addCart(product).then(res => {
            this.$toast.show(res,1000)
            // this.show = true
            // this.message = res
            // setTimeout(() => {
            //   this.show = false
            // },1000)
          })
          // this.$store.dispatch('addCart',product).then(res => {
          //   console.log(res);
          // })
        }
      },
      mixins:[itemListenerMixin,backtopMixin],
      destroyed() {
        this.$bus.$off('itemimgload',this.itemImageListener)
      }
    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-navbar{
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  .content{
    height: calc(100% - 44px - 58px);
    background-color: #fff;
  }
</style>
