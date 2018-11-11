/**
* 首页
* @author dongyu
* @createDate 2018/03/06
* @update dongyu 2018/03/08
*/
<template>
<div class="out-wrapper">
  <div class="avtor-box">
    <img :src="avtor" />
    <p @click="handleAvtor" v-if="changeAvtor">更改头像</p>
    <input type="file" @change="handleFile" ref="inputFile" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" style="display:none"/>
  </div>
  <ul @click="handleToCenter">
    <li v-for="(item, index) in renderArr" :key="index" :class="[slideIndex === index ? 'active-tab' : 'usual-tab']" :data-path="item.path"><svg-icon :icon-class="item.icon" class="icon-bar"/>{{item.content}}<span :class="[slideIndex === index ? 'active-span' : 'usual-span']"/></li>
  </ul>
  <div class="newsM">
    <svg-icon class="new-point" icon-class="point" v-show="unRead === true"/>
  </div>
  <span @click="handleLogOut">退出登录</span>
</div>
</template>

<script>
import NetworkRequest from '@/utils/networkRequest';
import Cookies from 'js-cookie';
export default {
    name: 'slidebar',
    props: {
        slideIndex: {
            type: Number,
            default: 0
        },
        changeAvtor: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        renderArr() {
            return this.role === 'teacher' ? this.teacherArr : this.studentArr;
        },
        avtor() {
            return this.$store.state.user.avtor || 'https://gitee.com/uploads/58/1650058_rainyday66.png?1511432604';
        },
        unRead() {
            return this.$store.state.message.read;
        }
    },
    mounted() {

    },
    data() {
        return {
            role: Cookies.get('page-enter'),
            studentArr: [{
                path: 'user',
                icon: 'user-course',
                content: '我的课程'
            }, {
                path: 'collect',
                icon: 'collect',
                content: '我的收藏'
            }, {
                path: 'message',
                icon: 'user-message',
                content: '我的消息'
            }, {
                path: 'info',
                icon: 'user-info',
                content: '我的资料'
            }],
            teacherArr: [{
                path: 'issue-course',
                icon: 'user-course',
                content: '发布课程'
            }, {
                path: 'comment',
                icon: 'user-comment',
                content: '课程评论'
            }, {
                path: 'message',
                icon: 'user-message',
                content: '我的消息'
            }, {
                path: 'my-release',
                icon: 'user-publish',
                content: '我的发布'
            }, {
                path: 'earning',
                icon: 'user-wallet',
                content: '我的收益'
            }, {
                path: 'teacher',
                icon: 'user-info',
                content: '我的资料'
            }]
        };
    },
    methods: {
        handleToCenter(e) {
            if (e.target.getAttribute('data-path')) {
                this.$router.push(`${e.target.getAttribute('data-path')}`);
                if (e.target.getAttribute('data-path') === 'issue-course') {
                    Cookies.remove('addCourseId');
                }
            }
        },
        handleFile(e) {
            let file = e.target.files[0];
            let imageType = /image.*/;
            const reader = new FileReader();
            if (file.type.match(imageType)) {
                reader.onload = () => {
                    this.$store.commit('SET_AVATAR', reader.result);
                    this.beforeUpload(file);
                    const newForm = new FormData();
                    newForm.append('file', file);
                    NetworkRequest.streamRequest({
                        url: '/user/uploadHeadImg',
                        method: 'post',
                        data: newForm
                    }, response => {
                        this.$store.commit('SET_AVATAR', response);
                        this.$emit('onchange', response);
                    });
                };
            }
            reader.readAsDataURL(file);
        },
        beforeUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            if (!isImg) {
                this.$message.error('上传头像图片只能是JPG、GIF或PNG格式!');
            }
            return isLt2M && isImg;
        },
        handleAvtor() {
            this.$refs.inputFile.click();
        },
        handleLogOut() {
            this.$confirm('您确定要退出当前账号么？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('logOut').then(() => {
                    this.$message({
                        message: '当前账号已退出',
                        type: 'success'
                    });
                    this.$router.push('/');
                }).catch(() => {
                    this.$message.error('退出失败');
                });
            }).catch(() => {
                // 用户取消退出
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
.out-wrapper{
  width: 160px;
  height: 667px;
  background-color: $white;
  @include flex-style(column,center,flex-start);
  .avtor-box{
    width: 80px;
    height: 80px;
    border-radius: 100%;
    margin:60px auto;
    overflow: hidden;
    position: relative;
    img{
      width: 80px;
      height: 80px;
      border-radius: 100%;
      cursor: pointer;
    }
    p{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      background: rgba(0,0,0,0.6);
      color: $white;
      font-size: $twelve-font;
      text-align: center;
      line-height: 24px;
      cursor: pointer;
    }
  }
  ul{
    width:100%;
    height: 192px;
    li{
      width: 106px;
      height: 32px;
      list-style: none;
      font-size: $sixteen-font;
      letter-spacing: 1px;
      line-height: 32px;
      cursor: pointer;
      position: relative;
      padding-left: 38px;
      margin-bottom: 10px;
      >span{
        position: absolute;
        right: -16px;
        top: 0;
        display:inline-block;
        width:0;
        height:0;
        border-width:16px 0 16px 16px;
        border-style:solid;
      }
      &:hover{
        background-color: $light-blue;
        color: $blue;
        span{
          border-color:transparent transparent transparent $light-blue;
        }
      }
    }
  }
  >span{
    margin-top: 192px;
    width: 92px;
    height: 32px;
    @include usual-btn($blue,$white);
    border-radius: 6px;
    font-size: $fourteen-font;
    box-shadow:2px 0px 20px rgba(52,93,245,0.4)
  }
}
.icon-bar{
  margin-right: 10px;
}
.active-tab{
  background-color: $light-blue;
  color: $blue;
}
.usual-tab{
  background-color: $white;
  color: $light-gray;
}
.usual-span{
  border-color:transparent transparent transparent $white;
}
.active-span{
  border-color:transparent transparent transparent $light-blue;
}
.newsM {
  position: relative;
  .new-point {
    background-color: $yellow;
    color: $yellow;
    position: absolute;
    width: 8px;
    height: 8px;
    top: -128px;
    left: -50px;
    border-radius: 100%;
  }
}
</style>
