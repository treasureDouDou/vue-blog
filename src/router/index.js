import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        //前台页面
        path: '/home',
        component: resolve => require(['../components/home/home'], resolve),
        children: [{
            //前台首页
            path: 'showArticleList',
            component: resolve => require(['../components/home/articleList/articleList'], resolve)
        }, {
            //关于我
            path: 'aboutMe',
            component: resolve => require(['../components/home/about'], resolve)
        }, {
            //标签
            path: 'labelsList',
            component: resolve => require(['../components/home/labels'], resolve)
        }, { //标签历史文章
            path: 'labelHistory',
            component: resolve => require(['../components/home/labelHistory'], resolve)
        }, { //文章详情
            path: 'readArticle',
            component: resolve => require(['../components/home/readArticle/readArticle'], resolve)
        }]
    }, , {
        path: '/login',
        component: resolve => require(['../components/login/login'], resolve)
    }, {
        //后台页面
        path: '/manage',
        meta: {
            needToken: true
        },
        component: resolve => require(['../components/manage/home'], resolve),
        children: [{
            //后台文章查看
            path: 'saveArticle',
            name: 'saveArticle',
            meta: {
                needToken: true
            },
            component: resolve => require(['../components/manage/child/saveArticle'], resolve)
        }, {
            //后台文章新建
            path: 'newArticle',
            name: 'newArticle',
            meta: {
                needToken: true
            },
            component: resolve => require(['../components/manage/child/saveArticle'], resolve)
        }, {
            //后台文章列表
            path: 'articleList',
            name: 'articleList',
            meta: {
                needToken: true
            },
            component: resolve => require(['../components/manage/child/articleList'], resolve)
        }, {
            //后台标签管理
            path: 'labels',
            name: 'labels',
            meta: {
                needToken: true
            },
            component: resolve => require(['../components/manage/child/labels'], resolve)
        }, {
            //后台标签管理
            path: 'about',
            name: 'about',
            meta: {
                needToken: true
            },
            component: resolve => require(['../components/manage/child/about'], resolve)
        }, {
            //后台留言板管理
            path: 'comment',
            name: 'comment',
            meta: {
                needToken: true
            },
            component: resolve => require(['../components/manage/child/commentList'], resolve)
        }]
    }, {
        path: '*',
        redirect: '/home/showArticleList'
    }]
})
