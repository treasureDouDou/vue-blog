<template>
    <Form :label-width="80">
        <Form-item label="发布时间">
            <Row>
                <Col span="7">
                <Date-picker v-model="formItem.date" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" @on-change="dataChange"></Date-picker>
                </Col>
                <Col span="16" offset="1">
                <div class="lc-upload">
                    <Input v-model="imgUrl" placeholder="图片路径..." disabled>
                    </Input>
                    <Upload accept="image/*" :show-upload-list="false" action="http://localhost:3000/api/uploadImg" :on-success="uploadSuccess" :on-progress="uploadProgress" :on-error="uploadErr" name="img">
                        <Button type="ghost">
                            <Icon type="load-a" size=16 class="spin-icon-load" v-if="isloading"></Icon>
                            <Icon type="ios-cloud-upload-outline" size=16 v-else></Icon>
                        </Button>
                    </Upload>
                </div>
                </Col>
            </Row>
        </Form-item>
        <Form-item label="添加标签">
            <Select v-model="formItem.labels" multiple placeholder="请选择">
                <Option :value="el._id" v-for="el in labels">{{el.content}}</Option>
            </Select>
        </Form-item>
        <Form-item label="文章标题">
            <Input v-model="formItem.title" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="文章详情">
            <markdown-editor v-model="formItem.initContent" :configs="configs" ref="markdownEditor"></markdown-editor>
        </Form-item>
        <Form-item style="text-align: center;">
            <Button type="info" @click="submit(false)" style="margin-right: 50px;">草稿</Button>
            <Button type="success" @click="submit(true)">发布</Button>
        </Form-item>
    </Form>
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
        this.formItem.date = this.getIntactTime()
        this.labels = await this.axios.get('/getLabels')
            //判断是否传参，存在即是修改,否则为新增
        if (this.$route.query.id) {
            this.axios.get('queryArticle', {
                params: {
                    id: this.$route.query.id
                }
            }).then(res => {
                this.formItem = res
                this.$nextTick(() => {
                    this.loadingClose()
                })
            })
        } else {
            this.$nextTick(() => {
                this.loadingClose()
            })
        }
    },
    computed: {
        simplemde() {
            return this.$refs.markdownEditor.simplemde
        }
    },
    methods: {
        submit(type) {
            if (this.formItem.labels.length == 0) {
                this.$Message.warning('标签不能为空')
                return false
            } else if (this.formItem.labels > 5) {
                this.$Message.warning('标签最多5个')
                return false
            } else if (!this.formItem.title) {
                this.$Message.warning('标题不能为空')
                return false
            }
            let id = this.$route.query.id
            if (id) {
                Object.assign(this.formItem, {
                    id: id
                })
            }
            if (type) { //发布
                //转换文章详情显示的内容
                this.formItem.content = this.simplemde.markdown(this.formItem.initContent)
                    //转换首页文章列表显示的简介
                let reg = /<[^>]+>/g
                let abstract = this.formItem.content.replace(reg, '').replace(/(^\s+)|(\s+$)|(\s)/g, '').replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
                this.formItem.abstract = abstract.substr(0, 200) + '...'
                this.axios.post('/saveArticle', this.formItem)
                    .then(res => {
                        this.$Message.success(id ? '修改成功' : '新建成功');
                        this.$router.replace({
                            name: 'articleList'
                        })
                    })
                this.formItem.abstract = abstract.substr(0, 200) + '...'
            } else { //草稿
                this.axios.post('/saveArticle', this.formItem)
                    .then(res => {
                        this.$Message.success(id ? '修改成功' : '新建成功');
                        this.$router.replace({
                            name: 'articleList'
                        })
                    })
            }

        },
        dataChange(date) {
            this.formItem.date = date
        },
        uploadSuccess(res) {
            this.imgUrl = res.url
            this.isloading = false
        },
        uploadProgress(e) {
            this.isloading = true
        },
        uploadErr() {
            this.$Message.error('上传失败');
            this.isloading = false
        },
    },
    data() {
        return {
            labels: [],
            isloading: false, //是否正在上传
            imgUrl: '', //上传的图片路径
            uploadHeader: {
                'Content-Type': 'multipart/form-data'
            },
            formItem: {
                labels: [], //标签
                date: '', //时间
                title: '', //标题
                content: '', //详情
                initContent: '', //草稿
                abstract: '' //简介
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
<style type="text/css" lang="less" scoped>
.lc-upload {
    display: flex;
    .ivu-input-type {
        flex: 1;
    }
    .ivu-upload {
        position: relative;
        top: -1px;
    }
}
</style>
