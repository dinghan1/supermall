import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return {
      itemImageListener:null,
      refresh:null
    }
  },
  mounted(){
    //监听item中图片加载完成
    this.refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImageListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemimgload',this.itemImageListener)
  }
}

export const backtopMixin = {
  data(){
    return {
      isShow:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    ifshow(position){
      this.isShow = position.y<-1000
    }
  }
}
