<template>
    <div :class="[ 'home', {'side-show':sideShow,'not-pc-home': notpc} ]">
        <div class="min-900">
            <transition name="side">
                <home-side v-if="sideShow"></home-side>
            </transition>
        </div>
        <div class="sidebar-toggle" @click="sideShow = !sideShow">
            <Icon :type="sideShow?'arrow-right-c':'arrow-left-c'" />
        </div>
        <div @click="toggleBg" :class="onloadImg?'sidebar-refresh load': 'sidebar-refresh'">
            <Icon type="loop" />
        </div>
        <!-- 主页 -->
        <div class="layout" v-if="notpc">
            <!-- 移动端加上iscroll——万恶的苹果 -->
            <iscroll-view ref="iscroll" :options="{preventDefault: false}" class="scroll-view">
                <div class="max-899">
                    <transition name="side">
                        <home-side></home-side>
                    </transition>
                </div>
                <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
                    <router-view></router-view>
                </transition>
            </iscroll-view>
        </div>
        <div class="layout" v-else>
            <!-- PC端 -->
            <div id="layout-content" :class="['layout-content', 'clearfix',{'not-pc-layout-content': notpc}]">
                <div class="max-899">
                    <transition name="side">
                        <home-side></home-side>
                    </transition>
                </div>
                <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <!-- 主页end -->
        <!-- 版权 -->
        <div class="layout-copy">
            2017- &copy; doudou
        </div>
        <!-- 版权end -->
        <!-- PC——回到顶部 -->
        <back listen="layout-content" :duration="800" class="back-top-class" :height="400">
        </Back>
        <!-- 回到顶部end -->
    </div>
</template>
<script>
import side from './side'
import back from '../public/backTop'
import Vue from 'vue'
import {
    mapState
} from 'vuex'
export default {
    components: {
        'home-side': side,
        back
    },
    mounted() {
        let timer = null
        /*iscroll——公共方法*/
        Vue.prototype.initScroll = () => {
            if (!this.notpc) return false
            this.$nextTick(() => {
                //万一手贱点了很多下切换效果，所以先停了再跑
                clearTimeout(timer)
                timer = setTimeout(() => {
                    //等待动画执行完毕计算iscroll内部的高度，过度的时候用了absolute高度计算不正确——动画默认1S
                    this.$refs.iscroll.scrollTo(0, 0, 300)
                    this.$refs.iscroll.refresh()
                }, 1100)
            })
        }
        Vue.prototype.scrollRefresh = () => {
            this.$refs.iscroll.refresh()
        }
    },
    methods: {
        toggleBg() {
            if (this.onloadImg) return false
            this.onloadImg = true
            this.bgIndex++
                if (this.bgIndex > 7) {
                    this.bgIndex = 1
                }
            var imgUrl = require('../../assets/imgs/' + this.bgIndex + '.jpg')
            var img = new Image()
            img.src = imgUrl
            img.onload = () => {
                document.body.style.background = 'url(' + imgUrl + ') no-repeat center center'
                document.body.style.backgroundSize = '100% 100%'
                document.body.style.backgroundAttachment = 'fixed'
                localStorage.setItem('imgUrl', this.bgIndex)
                    //至少1S动画
                setTimeout(() => {
                    this.onloadImg = false
                }, 1000)
            };
        }
    },
    data() {
        return {
            sideShow: true,
            bgIndex: localStorage.getItem('imgUrl') ? localStorage.getItem('imgUrl') : 1,
            onloadImg: false
        }
    }
}
</script>
<style scoped lang="less">
.home {
    height: 100%;
    padding-right: 0;
    transition: 0.5s;
}

.scroll-view {
    touch-action: none;
    /* -- Attention-- */
    position: absolute;
    top: 15px;
    bottom: 0;
    left: 5px;
    right: 0;
    overflow: hidden;
    width: calc(~"100% - 10px");
    >div {
        min-height: 100%;
        .animated {
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
}

.not-pc-home {
    min-height: 100%;
}

.layout {
    overflow: hidden;
    height: calc(~"100% - 41px");
    position: relative;
}

.layout-content {
    width: calc(~"100% - 10px");
    margin: 0 auto;
    margin-top: 15px;
    height: 100%;
    overflow: auto;
    position: relative;
    color: #333;
    .animated {
        position: absolute;
        top: 0;
        width: 100%;
    }
}

.layout-copy {
    text-align: center;
    padding: 10px 0px;
    font-size: 14px;
    color: #fff;
}

.ivu-back-top-inner {
    background: rgba(151, 147, 165, 1);
}

.sidebar-toggle,
.sidebar-refresh {
    position: fixed;
    right: 25px;
    bottom: 90px;
    border-radius: 2px;
    color: #fff;
    font-size: 24px;
    padding: 8px 14px;
    background: rgba(151, 147, 165, 0.8);
    line-height: 0;
    z-index: 1050;
    cursor: pointer;
    height: 40px;
    width: 45px;
    display: none;
}

.sidebar-refresh {
    bottom: 40px;
    &.load {
        .ivu-icon-loop {
            color: #38b7ea;
            animation: rotate 2s infinite;
        }
    }
}

.side-enter-active {
    right: 0;
    transition: 0.5s
}

.side-leave-active,
.side-enter {
    right: -320px !important;
    transition: 0.5s;
}

.top {
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}

.back-top-class {
    bottom: 140px !important;
    right: 25px !important;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@media (max-width: 580px) {
    .back-top-class {
        bottom: 50px !important;
        right: 10px !important;
    }
    .layout-content {
        width: calc(~"100% - 10px");
    }
}

@media (min-width: 900px) {
    .side-show {
        padding-right: 320px;
    }
    .sidebar-toggle {
        display: block;
    }
    .sidebar-refresh {
        display: block;
    }
    .layout-content {
        width: calc(~"100% - 200px");
    }
    .max-899 {
        display: none;
    }
    .min-900 {
        display: block;
    }
}

@media (max-width: 899px) {
    .max-899 {
        display: block;
    }
    .min-900 {
        display: none;
    }
    .list {
        top: 255px !important;
    }
    .labels,
    .about,
    .read-article,
    .history {
        top: 270px !important;
    }
}
</style>
