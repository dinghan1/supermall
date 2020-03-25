import {debounce} from "./utils";

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
