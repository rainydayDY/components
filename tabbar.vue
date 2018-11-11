/**
* 条形箭头组件
* @author dongyu
* @createDate 2018/05/14
*/
<template>
  <div class="top-tab">
    <p v-for="(item, index) in topTab" :key="index" :class="[index === currentTab ? 'active-tab' : 'usual-tab']">{{index+1}}.{{item}}<span v-show="index <= currentTab && index !== topTab.length-1"/></p>
  </div>
</template>

<script>
export default {
    name: 'tab',
    props: {
        topTab: {
            type: Array,
            default: () => []
        },
        currentTab: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.top-tab{
  width: 100%;
  height: 60px;
  border-radius: 4px;
  @include flex-style(row,center,flex-start);
  >p{
    width: 325px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: $fourteen-font;
    letter-spacing: 3px;
    position: relative;
    span{
      display:block;
      width:0;
      height:0;
      position: absolute;
      right: -30px;
      top: 0;
      border-width:30px 0 30px 30px;
      border-style:solid;
      z-index: 10;
    }
  }
}
.active-tab{
  color: $white;
  background-color: #222;
  >span{
    border-color:transparent transparent transparent #222;
  }
}
.usual-tab{
  color: $light-gray;
  background-color: #ccc;
  >span{
    border-color:transparent transparent transparent #ccc;
  }
}
</style>
