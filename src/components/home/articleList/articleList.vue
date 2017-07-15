<template>
    <div class="list clearfix">
        <single-article :data="el" :index="index" v-for="el,index in  articleList" v-if="showLoad"></single-article>
        <div class="page" v-if="showLoad && articleList.length > 0">
            <Page :total="total" placement="top" :page-size="pageSize" :current="current" show-total @on-change="change" @on-page-size-change="sizeChange"></Page>
        </div>
    </div>
</template>
<script>
import singleArticle from './singleArticle.vue'
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    components: {
        singleArticle
    },
    computed: mapState(['articleList', 'labels']),
    data() {
        return {
            showIndex: 1,
            current: 1, //当前页码
            pageSize: 15, //每页条数
            total: 30,
            showLoad: false,
        }
    },
    async mounted() {
        //存一下数据，重复切换免去不停请求初始页面数据
        //同时成立原因，有可能在标签页刷新页面，再进入最新文章就没有文章列表数据
        //所以同时成立
        if (this.articleList && this.labels) {
            this.showLoad = true
            this.$nextTick(() => {
                this.initScroll()
                this.loadingClose()
            })
            return false
        } else if (!this.articleList) {
            this.search(async dataList => {
                this.articleListData(JSON.parse(JSON.stringify(dataList)))
                if (!this.labels) {
                    let labels = await this.axios.get('/getLabels')
                    this.lablesData(labels)
                    this.showLoad = true
                    this.$nextTick(() => {
                        this.initScroll()
                        this.loadingClose()
                    })
                } else {
                    this.showLoad = true
                    this.$nextTick(() => {
                        this.initScroll()
                        this.loadingClose()
                    })
                }
            })
        }
    },
    methods: {
        ...mapMutations(['articleListData', 'lablesData']),
        change(current) {
            this.current = current
            this.search()
        },
        sizeChange(pageSize) {
            this.pageSize = pageSize
            this.search()
        },
        async search(cb) {
            this.loading()
            let data = await this.axios.get('/getArticleList', {
                params: {
                    current: this.current,
                    pageSize: this.pageSize
                }
            })
            this.total = data.total
            this.$nextTick(() => {
                this.initScroll()
                this.loadingClose()
            })
            cb && cb(data.list)
        }
    }
}
</script>
<style scoped lang="less">
.page {
    margin: 20px 0;
    float: left;
    transform: translateX(-50%);
    position: relative;
    left: 50%;
    display: inline-block;
}
</style>
