<template>
    <div :class="['history',{'not-pc-history': notpc}]">
        <h1>{{$route.query.name}}</h1>
        <hr />
        <Timeline v-if="loadDone">
            <template v-for="el in list">
                <Timeline-item color="#555">
                    <template v-for="item, index in el">
                        <p class="time" v-if="index == 0">{{item.showDate.substr(0,4)}}</p>
                        <p class="content">
                            <router-link :to="{ path: 'readArticle', query: { id: item._id }}">{{item.title}}<span>{{item.showDate.substr(0,10)}}</span></router-link>
                        </p>
                    </template>
                </Timeline-item>
            </template>
        </Timeline>
    </div>
</template>
<script>
export default {
    mounted() {
            this.axios.get('/getLabelsSearchArticle', {
                params: {
                    id: this.$route.query.id
                }
            }).then(data => {
                let arr = []
                if (data.length > 1) {
                    data.forEach((item, index) => {
                        if (data[index + 1] && item.showDate.substr(0, 4) != data[index + 1].showDate.substr(0, 4)) {
                            arr.push(index)
                        }
                    })
                }
                if (arr.length > 0) {
                    arr.forEach((item, index) => {
                        this.list[index] = []
                        for (let i = 0; i < data.length; i++) {
                            if (index == 0) {
                                if (item >= i) {
                                    this.list[index].push(data[i])
                                } else {
                                    break;
                                }
                            } else {
                                if (item >= i) {
                                    if (i > arr[index - 1])
                                        this.list[index].push(data[i])
                                } else break
                            }
                        }
                    })
                    if (arr[arr.length - 1] < data.length - 1) {
                        this.list[arr.length] = data.slice(arr[arr.length - 1] + 1)
                    }
                } else {
                    this.list[arr.length] = data.slice(arr[arr.length - 1])
                }
                this.loadDone = true
                this.$nextTick(() => {
                    this.initScroll()
                    this.loadingClose()
                })
            })
        },
        data() {
            return {
                list: [],
                loadDone: false
            }
        }
}
</script>]
<style scoped lang="less">
.history {
    background: #fff;
    min-height: 100%;
    padding: 20px;
    &.not-pc-history{
        min-height: 500px;
    }
    h1 {
        margin-left: 0px;
        font-weight: 300;
        line-height: 35px;
        margin-bottom: 20px;
        text-align: center;
    }
    hr {
        height: 0;
        margin-top: 20px;
        margin-bottom: 20px;
        border-left: 0;
        border-right: 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #fff;
    }
    p {
        color: #333;
    }
    .ivu-timeline {
        float: left;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 30px;
    }
    .time {
        font-size: 18px;
        color: #696969;
    }
    .ivu-timeline {
        width: 100%;
        max-width: 700px;
    }
    .content {
        padding-left: 15px;
        margin-top: 10px;
        color: #e5e5e5;
        font-size: 16px;
        position: relative;
        &:before {
            display: block;
            content: ' ';
            height: 6px;
            width: 6px;
            border-radius: 6px;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 8px;
            background: #657180;
            overflow: hidden;
        }
        a {
            flex: 1;
            display: block;
            color: #696969;
            border-bottom: 1px dashed #ccc;
            transition: 0.3s;
            &:hover {
                border-bottom: 1px dashed #666;
            }
            span {
                float: right;
                font-size: 14px;
            }
        }
    }
}
</style>
