<template>
    <transition  :enter-active-class="defaultClass[Math.floor(Math.random()*7)] +' animated'" leave-active-class="animated bounceOutRight">
        <div class="single-article" v-show="data">
            <div class="article" @click="readmore(data._id)">
                <h2 class="header">{{data.title}}</h2>
                <div class="content">
                    <p class="user"><span>By:兜兜</span>日期：{{data.showDate}}</p>
                    <div v-html="data.abstract" class="abstract"></div>
                </div>
                <div class="more">
                    <span>阅读更多</span>
                </div>
            </div>
            <div class="article-info">
                <ul>
                    <li v-for="el in data.labels">
                        <Tag type="border" color="blue" v-for="item in labels" @click.native="link(item)" v-if="item._id == el">
                            {{item.content}}</Tag>
                        {{el.label}}
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>
<script>
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    props: ['data','index'],
    computed: mapState(['labels']),
    data() {
        return {
            showIndex: 1,
            defaultClass: ['bounceInDown','bounceInLeft','rubberBand','wobble','rotateIn','rotateInDownLeft']
        }
    },
    methods: {
        link(item) {
            this.$router.push({
                path: 'labelHistory',
                query: {
                    id: item._id,
                    name: item.content
                }
            })
        },
        readmore(id) {
            this.$router.push({
                path: 'readArticle',
                query: {
                    id: id
                }
            })

        }
    }
}
</script>
<style lang="less" scoped>
.single-article {
    transform: translate(0px, 0px);
    color: #565a5f;
    border-radius: 5px;
    overflow: hidden;
    line-height: 28px;
    position: relative;
    margin-top: 15px;
    .article:hover {
        cursor: pointer;
        h2 {
            color: #38b7ea;
            &:after {
                opacity: 0;
            }
            &:before {
                background: #38b7ea;
                width: 100%;
                content: ' ';
                opacity: 1;
                transition: 1s;
            }
        }
        .more span {
            background: #fff;
            border: 2px solid #38b7ea;
            color: #333;
        }
    }
    .article {
        background: #fff;
        padding: 35px;
        background: rgba(255, 255, 255, 0.9);
        h2 {
            color: rgb(86, 90, 95);
            text-align: center;
            transition: color .2s ease;
            position: relative;
            padding-bottom: 20px;
            margin: 0;
            font-size: 20px;
            font-weight: 500;
            line-height: 1.2;
            position: relative;
            transition: 0.5s;
            &:after {
                position: absolute;
                bottom: 0;
                height: 3px;
                width: 100%;
                content: ' ';
                left: 50%;
                transform: translateX(-50%);
                background: #000;
                animation: change 1s;
            }
            &:before {
                position: absolute;
                bottom: 0;
                height: 3px;
                width: 0%;
                content: ' ';
                left: 50%;
                opacity: 0;
                transform: translateX(-50%);
                background: #000;
            }
        }
        .user {
            text-align: center;
            font-size: 14px;
            color: #696969;
            span {
                margin-right: 15px;
            }
        }
        .more {
            margin-top: 20px;
            text-align: center;
            span {
                display: inline-block;
                padding: 0 15px;
                font-size: 14px;
                color: #fff;
                background: #222;
                border: 2px solid #222;
                transition: 0.5s;
                border-radius: 4px;
            }
        }
        .content {
            margin-top: 15px;
            font-size: 14px;
            .abstract {
                word-break: break-all;
                text-indent: 2em;
            }
        }
    }
    .article-info {
        display: flex;
        height: 50px;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, .8);
        ul {
            display: flex;
            flex: 1;
            li {
                margin-left: 5px;
            }
        }
        span,
        ul li {
            font-size: 16px;
            line-height: 50px;
            color: #fff;
        }
    }
}

@keyframes change {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}

@media (max-width: 580px) {
    .single-article {
        .article {
            padding: 5px;
            overflow: hidden;
            h2 {
                padding-top: 15px;
            }
        }
    }
}
</style>
