<template>
    <div :class="['labels',{'not-pc-labels': notpc}]">
        <h1>tags</h1>
        <hr />
        <p class="count">共计<span>{{labels && labels.length}}</span>个标签</p>
        <div class="tags">
            <router-link :style="{ fontSize: Math.ceil(Math.random()*10) + 12 + 'px' }" replace :to="{path: 'labelHistory',query: {id:el._id,name: el.content}}" v-for="el in labels">{{el.content}}</router-link>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    computed: mapState(['labels']),
    mounted() {
        if (this.labels) {
            this.$nextTick(() => {
                this.initScroll()
                this.loadingClose()
            })
        } else {
            this.init()
        }

    },
    methods: {
        ...mapMutations(['lablesData']),
        async init() {
            let labels = await this.axios.get('/getLabels')
            this.lablesData(labels)
            this.$nextTick(() => {
                this.initScroll()
                this.loadingClose()
            })
        }
    }
}
</script>
<style scoped lang="less">
.labels {
    background: #fff;
    min-height: 100%;
    margin: 0 auto;
    padding: 30px;
    color: #696969;
    &.not-pc-labels {
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
    .count {
        text-align: center;
        font-size: 16px;
        span {
            margin: auto 0.5em;
            font-weight: bold;
        }
    }
    a {
        font-size: 16px;
        color: #808080;
        margin-right: 1em;
        line-height: 65px;
        border-bottom: 1px solid gray;
        &:hover {
            font-style: italic;
        }
    }
    .tags {
        width: 100%;
        margin: 1em auto;
        margin-top: 0em;
        text-align: center;
    }
}

.ivu-tag+.ivu-tag {
    margin-left: 15px;
}
</style>
