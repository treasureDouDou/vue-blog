<template>
    <div class="manage">
        <div class="header">
            <div class="nav">
                <a href="/" class="logo"><img src="../../assets/imgs/doudou.jpg"></a>
                <div class="wrap">
                    <Button type="ghost" @click="exitDialog = true">注销</Button>
                    <Button type="ghost" @click="$router.push('/')">回到首页</Button>
                </div>
            </div>
        </div>
        <Modal v-model="exitDialog" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>注销账号</span>
            </p>
            <div style="text-align:center">
                <p>您真的账号吗</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="exit">注销</Button>
            </div>
        </Modal>
        <div class="layout">
            <Row type="flex">
                <i-col span="3">
                    <div class="menu">
                        <Menu theme="light" :active-name="$route.name" width="auto" @on-select="linkUrl">
                            <Menu-group title="后台管理">
                                <Menu-item name="newArticle">新建文章</Menu-item>
                                <Menu-item name="articleList">文章列表</Menu-item>
                                <Menu-item name="comment">留言管理</Menu-item>
                                <Menu-item name="labels">标签管理</Menu-item>
                                <Menu-item name="about">关于我</Menu-item>
                            </Menu-group>
                        </Menu>
                    </div>
                </i-col>
                <i-col span="21">
                    <div class="wrapper-content">
                        <div class="layout-content">
                            <router-view></router-view>
                            <Spin size="large" fix v-if="loading">
                                <template v-if="!loadErr">
                                    <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                                    <div>Loading</div>
                                </template>
                                <template v-else>网络异次元！请刷新重试</template>
                            </Spin>
                        </div>
                        <div class="layout-copy">
                            2017 &copy; doudou
                        </div>
                    </div>
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'
export default {
    data(){
        return {
            exitDialog: false
        }
    },
    methods: {
        linkUrl(name) {
            this.$router.push({
                name: name
            })
        },
        exit() {
            this.exitDialog = false
            localStorage.removeItem('adminName')
            localStorage.removeItem('adminPassword')
            localStorage.removeItem('token')
            localStorage.removeItem('visit')
            localStorage.removeItem('visitPassword')
            this.$router.push('/login')
        }
    },
    computed: mapState(['loading', 'loadErr']),

}
</script>
<style scoped lang="less">
.manage {
    background: #eee;
    height: 100%;
}

.layout {
    position: relative;
    height: calc(~"100% - 130px");
    margin: 0 15px;
    border-radius: 5px;
    overflow: hidden;
    >div {
        height: 100%;
    }
}

.layout-content {
    background: #f5f7f9;
    background: #fff;
    border-radius: 4px;
    padding: 10px;
    height: calc(~"100% - 40px");
    overflow: auto;
    position: relative;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.menu {
    height: 100%;
    background: #fff;
}

.wrapper-content {
    height: 100%;
    background: #fff;
    &:after {
        content: "";
        display: block;
        width: 1px;
        background: #d7dde4;
        position: absolute;
        top: 0;
        bottom: 0;
        left: -1px;
    }
}

.header {
    box-shadow: 0 1px 1px rgba(0, 0, 0, .08);
    background: #fff;
    height: 80px;
    line-height: 80px;
    margin-bottom: 30px;
    .nav {
        width: 90%;
        margin: 0 auto;
        display: flex;
        .wrap {
            flex: 1;
            text-align: right;
        }
    }
    .logo {
        display: block;
        height: 70px;
        width: 70px;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
