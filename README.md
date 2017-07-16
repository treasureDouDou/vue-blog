# vue-blog
vue+express+mongodb

## 项目介绍

这是我第一次写后端,一直专注于前端开发,后端的开发流程一直不明白，不清楚。这次写自己的博客用express框架开发后端,总算是了解一些流程了。从开发到结束,mongodb安装,数据库搭建、配置、设计，域名的解析,express的使用,其中遇见的问题,翻墙搜这些问题都能够解决,不算难。这次后端开发虽然不怎么样,但是已经让我对后端开发有一定的了解啦。

> 有问题的童鞋联系我qq:564526299

## 项目结构

```
|-module
|----api.js  			//api接口
|----db.js  			//数据库设计，数据库连接
|-app.js  		//一些配置
|-public  			//静态资源目录
|----images  			//上传图片保存目录
|-index.js  		        //启动配制
```

## 配置
1. mongodb，nodejs安装方法请自行翻墙
2. 如不想安装mongodb，请翻墙进入mlab.com，新建账号，里面有免费500M的数据库，自己测试够用啦
3. 进入目录执行npm i，安装模块 ——推荐使用淘宝cnpm
4. module/db.js 自行设置数据库连接，默认localhost:3000/blog（需下载安装mongodb）
5. 执行npm start, 启动项目,进程守护用的nodemon
6. 账号密码默认为空，如需要新建后台账号密码，请在api.js，加入
``` javascript
      var user = { name: 账号, password: md5(名称) }
      userAdmin(user).save()
```
## 启动

``` bash
# install dependencies
npm i

# serve with hot reload at localhost:3000
npm start
```
