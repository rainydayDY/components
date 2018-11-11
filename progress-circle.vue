/**
* 环形进度条
* @author dongyu
* @createDate 2018/05/05
*/
<template>
<div class="prgress-box">
    <canvas id="myCanvas1" width="126" height="126" class="canvas"> 您的浏览器不支持canvas标签。 </canvas>
        <div>
              完成课时<br />{{proess}}%
        </div>
        <span id="ball"></span>
</div>
</template>

<script>
import { IMG_URL } from '@/utils/constant';
import Cookies from 'js-cookie';
let monitorTime = null;
export default {
    name: 'progress',
    components: {
    },
    data() {
        return {
            colorPng: IMG_URL.CONFIG_IMG.COLOR,
            showProgress: 0,
            proess: 56,
        };
    },
    created() {
       if (this.proess !== 0) {
            this.drawProgress('myCanvas1', {
                strokeColor: '#456eff',
                lineWidth: 4,
                cirR: 59
             });
        }
    },
    methods: {
        drawProgress(eleId, circle) {
            const canvas = document.getElementById(eleId);
            const ball = document.getElementById('ball');
            let ctx2 = canvas.getContext('2d');
            let pro = 0;
            monitorTime = setInterval(() => {
                if (pro >= this.courseDetail.proess) {
                    clearInterval(monitorTime);
                    return false;
                }
                pro += 1;
                this.showProgress = pro;
                this.moveBall(ball, pro);
                let img = new Image();
                img.src = this.colorPng;
                // img.src = 'https://user-gold-cdn.xitu.io/2018/5/8/1633ebb7b8800c07?imageView2/0/w/1280/h/960/format/webp/ignore-error/1';
                img.onload = ctx2.drawImage(img, 0, 0, 126, 126);
                ctx2.beginPath();
                ctx2.strokeStyle = ctx2.createPattern(canvas, 'no-repeat');
                ctx2.clearRect(0, 0, 126, 126);
                ctx2.lineWidth = circle.lineWidth;
                ctx2.lineCap = 'round';
                // 绘制圆或者弧线，x,y坐标，半径，起始角度，结束角度，顺时针开始绘制
                ctx2.arc(circle.cirR + circle.lineWidth, circle.cirR + circle.lineWidth, circle.cirR, -(Math.PI / 2), Math.PI * 2 / 100 * (pro - 25), false);
                ctx2.stroke();
            }, 50);
        },
        moveBall(ball, pro) {
            let angle = Math.PI * (pro / 100) * 360 / 180;
            ball.style.left = (Math.sin(angle) + 1) * 59 + 'px';
            ball.style.top = -(Math.cos(angle) - 1) * 59 + 'px';
        },
    }
};
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
.prgress-box{
  width: 126px;
  height: 126px;
  margin-top: 12px;
  @include flex-style(row,center,center);
  position: relative;
  canvas{
    position: absolute;
    top:0;
    left:0;
  }
  >div{
    width: 100px;
    height: 100px;
    @include flex-style(row,center,center);
    border-radius: 100%;
    color: $blue;
    background-color: $light-blue;
    font-size: $twelve-font;
    line-height: 20px;
    font-weight: bold;
    text-align: center;
  }
  >span{
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: $blue;
    position: absolute;
    top:0;
    left: 57px;
  }
}
</style>
