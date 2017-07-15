# vue-blog

## 博客来源

> 由于工作公司原因，上线项目不能演示，自己想要一个属于自己的博客，同时了解一下后端的开发流程，遂用了vue写前台,express+mongodb写后端,花了一个多月的休息时间完成。

> 博客上线地址：[doudoujs.com](http://doudoujs.com) 拜访者登录后台地址 [doudoujs.com/login](http://doudoujs.com/login), 支持手机浏览，自适应,第一次加载有点慢

## 项目结构

```
|-src  					//开发
|----App.vue  			//背景初始化
|----main.js  			//初始化各种配置
|----router.js  		//路由
|----assets  			//资源
|----plugin       //一些公共方法
|----components  		//组件
|----utils  			//axios——http插件
|----vuex  				//状态管理
```

## 启动

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
