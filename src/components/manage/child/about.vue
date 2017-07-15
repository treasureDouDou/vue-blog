<template>
    <div>
        <markdown-editor v-model="about.initContent" :configs="configs" ref="markdownEditor"></markdown-editor>
        <div style="text-align: center;margin-top: 30px;">
            <Button type="primary" @click="submit">提交</Button>
        </div>
    </div>
</template>
<script>
import {
    markdownEditor
} from 'vue-simplemde'
export default {
    components: {
        markdownEditor
    },
    async mounted() {
            //判断是否传参，存在即是修改
        this.axios.get('getAboutUser').then(res => {
            this.about = res
            this.$nextTick(() => {
                this.loadingClose()
            })
        })
    },
    computed: {
        simplemde() {
            return this.$refs.markdownEditor.simplemde
        }
    },
    methods: {
        submit() {
            this.axios.post('/setAboutUser', {
                    content: this.simplemde.markdown(this.about.initContent),
                    initContent: this.about.initContent,
                    id: this.about._id
                })
                .then(res => {
                    this.$Message.success('保存成功');
                })
        },
    },
    data() {
        return {
            about: {
                content: '',
                initContent: ''
            },
            configs: {
                status: false, // 禁用底部状态栏
                initialValue: '', // 设置初始值
                renderingConfig: {
                    codeSyntaxHighlighting: true, // 开启代码高亮
                    highlightingTheme: 'monokai' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
                }
            }
        }
    }


}
</script>
<style>
.markdown-editor .CodeMirror,
.markdown-editor .CodeMirror-scroll {
    min-height: 400px;
    font-size: 16px;
}
</style>
