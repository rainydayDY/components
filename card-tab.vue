/**
* 卡片形选项卡切换
* @author dongyu
* @createDate 2018/04/02
*/
<template>
  <div class="select-wrapper" @click="handleClick">
    <span class="select-btn" v-for="(item, index) in tabArray" :key="index" :data-index="index" :class="[currentIndex === index ? 'active-btn' : '']" >
      {{item}}
      <svg-icon class="new-point" icon-class="point" v-show="newsRead[index] === true"/>
    </span>
    <div v-if="isSortShow">
      <p @click="handleSort('Study')" :class="[isStudySort ? 'active-sort' : 'usual-sort']">学习时长<span><svg-icon icon-class="sort-up" class="sort-icon sort-up" :class="[isStudySort && isStudyUp ? 'active-sort' : 'usual-sort']"/><svg-icon icon-class="sort-down" class="sort-icon sort-down" :class="[isStudySort && !isStudyUp ? 'active-sort' : 'usual-sort']"/></span></p>
      <p @click="handleSort('Time')" :class="[isStudySort ? 'usual-sort' : 'active-sort']">加入时间<span><svg-icon icon-class="sort-up" class="sort-icon sort-up" :class="[!isStudySort && isTimeUp ? 'active-sort' : 'usual-sort']"/><svg-icon icon-class="sort-down" class="sort-icon sort-down" :class="[!isStudySort && !isTimeUp ? 'active-sort' : 'usual-sort']"/></span></p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'card-tab',
    props: {
        tabArray: {
            type: Array,
            default: () => []
        },
        currentTab: {
            type: Number,
            default: 0
        },
        studyTime: {
            type: String,
            default: ''
        },
        newsRead: {
            type: Array,
            default: () => []
        },
        isSortShow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
    },
    data() {
        return {
            currentIndex: this.currentTab,
            isStudySort: false,
            isStudyUp: false,
            isTimeUp: false,
            isNewsRead: []
        };
    },
    methods: {
        handleClick(e) {
            if (e.target.nodeName.toLowerCase() === 'span') {
                this.currentIndex = parseInt(e.target.getAttribute('data-index'));
                this.$emit('onchange', this.currentIndex);
            }
        },
        handleSort(flag) {
            this.isStudySort = flag !== 'Time';
            this[`is${flag}Up`] = !this[`is${flag}Up`];
            this.$emit('onsort', {
                type: this.isStudySort,
                value: this[`is${flag}Up`]
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.select-wrapper{
  width: 100%;
  height: 76px;
  background-color: $white;
  box-sizing: border-box;
  padding-left: 30px;
  position: relative;
  @include flex-style(row, center, flex-start);
  > span:not(:first-child){
    margin-left: 4px;
  }
  >div{
    position: absolute;
    width: 180px;
    height: 30px;
    right: 30px;
    @include flex-style(row,center,space-between);
    >p{
      height: 20px;
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 20px;
      cursor: pointer;
      @include flex-style(row,center,flex-start);
      >span{
        display: inline-block;
        width: 10px;
        height: 20px;
        margin-left: 10px;
        position: relative;
      }
    }
  }
}
.select-btn{
  padding: 0 17px;
  height: 30px;
  @include usual-btn($white,$black);
  border-radius: 6px;
  font-size: $fourteen-font;
}
.active-btn{
  @include usual-btn(#222 !important,$white !important) ;
}
.select-btn {
  position: relative;
  .new-point {
    color: $yellow;
    position: absolute;
    width: 14px;
    height: 14px;
    top: 4px;
    left: 75%;
  }
}
.active-sort{
  color: $blue;
}
.usual-sort{
  color: $dark-gray;
}
.sort-icon{
  width: 6px !important;
  height: 6px !important;
  position: absolute;
}
.sort-up{
  top:2px;
  left:0;
}
.sort-down{
  bottom: 2px;
  left:0;
}
</style>
