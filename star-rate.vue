/**
* 星星评分组件
* @author dongyu
* @createDate 2018/05/07
*/
<template>
  <div class="star-line">
    <span v-for="n in wholeRate"  @click="handleRate(n)" :key="timeStr + n"><svg-icon :style="{fontSize: fontSize}" icon-class="star-whole"/></span>
    <span v-if="halfRate"><svg-icon icon-class="star-half" :style="{fontSize: fontSize}" /></span>
    <span v-for="(m,index) in nullRate" :data-index="m" :key="index" @click="handleRate(rate+m)"><svg-icon icon-class="star-null" :style="{fontSize: fontSize}"/></span>
    <span class="score-span" v-if="showScore">{{rate*2}}分</span>
  </div>
</template>

<script>
export default {
    name: 'star',
    props: {
        rate: {
            type: Number,
            default: 0
        },
        fontSize: {
            type: String,
            default: '12px'
        },
        showScore: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            wholeRate: parseInt(this.rate),
            nullRate: parseInt(5 - this.rate),
            timeStr: new Date().getTime()
        };
    },
    watch: {
        rate() {
            this.wholeRate = parseInt(this.rate);
            this.timeStr = new Date().getTime();
            this.nullRate = parseInt(5 - this.rate);
        }
    },
    computed: {
        halfRate() {
            return String(this.rate).includes('.');
        }
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.star-line{
  @include flex-style(row,center,center);
  >span{
    margin-left: 4px;
    cursor: pointer;
    font-size: $fourteen-font;
    color: $black;
    @include flex-style(column,center,center);
  }
  .score-span{
    margin-left: 10px;
  }
}
</style>
