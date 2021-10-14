<template>
    <div class="side">
        <div class="container">
            <div class="admin">
                <div class="user">
                    <div class="user-img"></div>
                </div>
                <div class="introduce">
                    <p class="name">假前端——花解语</p>
                    <p class="normal">四川-成都</p>
                    <a class="github" href="https://github.com/treasureDouDou">
                        <svg aria-hidden="true" class="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32">
                            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <span>花解语 </span>
                    </a>
                </div>
            </div>
            <div class="info">
                <ul class="tabs">
                    <li :class="{'active': $route.path == '/home/showArticleList'}">
                        <router-link replace to="showArticleList">最新文章</router-link>
                    </li>
                    <li :class="{'active': $route.path == '/home/labelsList'}">
                        <router-link replace to="labelsList">标签页</router-link>
                    </li>
                    <li :class="{'active': $route.path == '/home/aboutMe'}">
                        <router-link replace to="aboutMe">关于我</router-link>
                    </li>
                </ul>
                <!--  <div class="phone">联系方式：qq-564526299</div> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                showIndex: 1
            }
        },
        methods: {
            toggle() {

            }
        }
}
</script>
<style scoped lang="less">
.side {
    position: fixed;
    right: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    display: block;
    width: 320px;
    .container {
        width: 100%;
        margin: 100px auto 0;
    }
    .user {
        height: 150px;
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        .user-img {
            background: url(../../assets/imgs/doudou.jpg) no-repeat;
            background-size: 150px 150px;
            width: 150px;
            height: 150px;
            border-radius: 100px;
            overflow: hidden;
        }
        margin: 0 auto 20px;
        position: relative;
        &:hover {
            .ivu-icon-person {
                opacity: 1;
            }
        }
        .ivu-icon-person {
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            text-align: center;
            color: #fff;
            line-height: 100px;
            display: none;
            transition: 1s;
            cursor: pointer;
            opacity: 0;
            &:hover {
                opacity: 1;
            }
            &:before {
                font-size: 30px;
            }
        }
    }
    p {
        color: #fff;
        text-align: center;
        font-size: 14px;
        &+p {
            margin-top: 15px;
        }
    }
    p.name {
        font-size: 20px;
        animation: move 1.2s;
        font-weight: 700;
    }
    p.motto {
        animation: move 1.6s;
    }
    p.normal {
        animation: move 1.4s;
    }
    div.phone {
        color: #fff;
        font-size: 14px;
        text-align: center;
    }
    a.github {
        color: #fff;
        cursor: pointer;
        fill: currentColor;
        display: block;
        width: 200px;
        margin: 0 auto;
        text-align: center;
        margin-top: 15px;
        animation: move 1.8s;
        span {
            position: relative;
            top: -10px;
            margin: 5px 10px;
            font-size: 14px;
        }
    }
    .tabs {
        animation: move 1.8s;
        padding: 15px;
        display: flex;
        li {
            flex: 1;
            margin: 0 3px;
            width: 68px;
            position: relative;
            cursor: pointer;
            display: block;
            width: 68px;
            line-height: 100%;
            box-sizing: border-box;
            transition: all .2s ease;
            text-align: center;
            font-size: 14px;
            padding: 5px 0;
            color: #fff;
            text-decoration: none;
            border: 1px solid transparent;
            &.active {
                border: 1px solid #38b7ea;
                background: transparent;
                color: #38b7ea;
                border-radius: 5px;
                a {
                    color: #38b7ea;
                }
            }
            a {
                transition: 0.5s;
                color: #fff;
                &:hover {
                    color: #38b7ea;
                }
            }
        }
    }
}

@keyframes move {
    0% {
        transform: translateX(60px);
        opacity: 0;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}

@media (max-width: 899px) {
    .side {
        width: 100%;
        height: 250px;
        justify-content: center;
        position: static;
        display: flex;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 20px;
        .container {
            max-width: 720px;
            margin: 0  auto;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .admin {
                margin-left: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                .user {
                    margin: 0;
                }
                .introduce {
                    margin-top: 20px;
                }
            }
            .info {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
            }
            .tabs {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 300px;
                flex: 1;
                margin-top: 20px;
            }
            .phone {
                width: 300px;
            }
        }
    }
}
</style>
