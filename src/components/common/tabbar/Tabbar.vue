<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "Tabbar"
    }
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    height: 49px;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    -webkit-box-shadow: 0px -2px 2px rgba(100,100,100,0.2);
    -moz-box-shadow: 0px -2px 2px rgba(100,100,100,0.2);
    box-shadow: 0px -2px 2px rgba(100,100,100,0.2);
  }

</style>
