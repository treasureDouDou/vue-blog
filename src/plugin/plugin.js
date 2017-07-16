//vuex状态管理
import store from '@/vuex/vuex.js'
import http from '@/util/axios.js'
const plugin = {
    install(vue) {
        //页面等待中
        vue.prototype.loading = () => {
            store.state.loading = true
        };
        vue.prototype.loadingClose = () => {
            store.state.loading = false
        };
        //ajax——挂原型
        vue.prototype.axios = http
            //获取当前时间
        vue.prototype.getIntactTime = () => {
            let date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth(),
                day = date.getDate(),
                hours = date.getHours(),
                min = date.getMinutes();
            month = (month+1) < 10 ? '0' + (month + 1) : (month + 1);
            day = day < 10 ? '0' + day : day;
            hours = hours < 10 ? '0' + hours : hours;
            min = min < 10 ? '0' + min : min;
            date = year + '-' + month + '-' + day + ' ' + hours + ':' + min;
            return date
        }
        //当前设备类型
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        vue.prototype.notpc = !flag;

    }
}

export default plugin
