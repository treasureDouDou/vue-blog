<template>
    <div :class="['about',{'not-pc-about': notpc}]">
        <h1>关于我</h1>
        <hr />
        <div v-html="aboutMe"></div>
    </div>
</template>
<script>
import {
    markdownEditor
} from 'vue-simplemde'
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    components: {
        markdownEditor
    },
    computed: {
        ...mapState(['aboutMe']),
        simplemde() {
            return this.$refs.markdownEditor.simplemde
        }
    },
    mounted() {
        if (this.aboutMe) {
            this.$nextTick(() => {
                this.initScroll()
                this.loadingClose()
            })
            return false
        }
        this.axios.get('getAboutUser').then(res => {
            this.aboutMeData(res.content)
            this.$nextTick(() => {
                this.initScroll()
                this.loadingClose()
            })
        })
    },
    methods: mapMutations(['aboutMeData']),

}
</script>]
<style type="text/css" scoped lang="less">
.about {
    background: #fff;
    min-height: 100%;
    padding: 20px;
    word-break: break-all;
    text-indent: 2em;
    color: #696969;
    font-size: 16px;
    &.not-pc-about{
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
}
</style>
