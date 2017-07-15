<template>
    <div class="read-article" v-if="article">
        <div class="article-info">
            <h1>{{article.title}}</h1>
            <div class="user">
                <span data-v-09a5d688="">By:兜兜</span> 日期: {{article.showDate}}
            </div>
            <div class="show-content" v-html="article.content">
                {{article.content}}
            </div>
        </div>
        <article-comment></article-comment>
    </div>
</template>
<script>
import comment from './comment.vue'
export default {
    components: {
        'article-comment': comment
    },
    data() {
        return {
            article: null,
            loadDone: false
        }
    },
    mounted() {
        this.axios.get('queryArticle', {
            params: {
                id: this.$route.query.id
            }
        }).then(res => {
            this.article = Object.assign({}, this.article, res)
            this.loadDone = true
            this.$nextTick(() => {
                this.initScroll()
                this.loadingClose()
            })
        })
    }
}
</script>
<style scoped lang="less">
.read-article {
    min-height: 100%;
    padding: 20px 60px;
    .article-info{
        border-radius: 5px;
        overflow: hidden;
    }
    h1 {
        background: #fff;
        padding: 10px 35px;
        text-align: right;
        min-height: 52px;
        width: 100%;
        box-sizing: border-box;
        font-size: 36px;
        font-weight: 500;
        line-height: 1.2;
        color: #565a5f;
    }
    .user {
        text-align: right;
        font-size: 14px;
        color: #fff;
        background: rgba(0, 0, 0, .5);
        padding: 10px 35px;
        box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, .8);
        align-items: center;
        span {
            margin-right: 15px;
        }
    }
    .show-content {
        padding: 20px;
        background: #fff;
        font-size: 16px;
    }
}
@media (max-width: 580px) {
    .read-article{
        padding: 0px;
    }
}
</style>
