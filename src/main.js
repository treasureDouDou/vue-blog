// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//iview组件
import iView from 'iview';
Vue.use(iView)
import 'iview/dist/styles/iview.css' // 使用 CSS

//vuex状态管理
import store from './vuex/vuex.js'

//iscroll
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
Vue.use(IScrollView, IScroll)

//公共方法
import myplugin from './plugin/plugin.js'
Vue.use(myplugin)

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
//微信QQ浏览上下拉动默认事件取消
document.querySelector('body').addEventListener('touchstart', function(e) {
    e.preventDefault();
});

//跳转显示加载中与进度条
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    store.state.loading = true
    store.state.loadErr = false
    let name = localStorage.getItem('adminName')
    let password = localStorage.getItem('adminPassword')
    if (to.meta.needToken) {
        if (localStorage.getItem('visit') && localStorage.getItem('visitPassword')) {
            next()
        } else if (!localStorage.getItem('token') || !name || !password) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
});
router.afterEach(route => {
    iView.LoadingBar.finish()
    if(Vue.prototype.notpc) {
        return false
    }
    window.scrollTo(0, 0);
    
})


//富文本
import VueSimplemde from 'vue-simplemde'
Vue.use(VueSimplemde)

Vue.config.productionTip = false

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
export default app
