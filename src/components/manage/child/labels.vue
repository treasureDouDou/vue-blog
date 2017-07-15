<template>
    <div>
        <Form :model="formItem" label-position="left" :label-width="60">
            <Form-item label="标签名称">
                <Row>
                    <Col span="20">
                    <Input v-model="formItem.content" @on-enter="add" placeholder="请输入标签名称"></Input>
                    </Col>
                    <Col span="3" offset="1">
                    <Button type="info" @click="add">添加</Button>
                    </Col>
                </Row>
            </Form-item>
        </Form>
        <Table border :columns="columns" :data="labels"></Table>
        <Modal v-model="delComment" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>您真的要删除吗</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="delSure">删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    mounted() {
            this.init()
        },
        methods: {
            add() { //添加标签
                if (this.formItem.content == '') {
                    this.$Message.error('标签内容不能为空');
                    return false
                }
                this.axios.post('/savelabels', this.formItem)
                    .then(res => {
                        this.init()
                        this.formItem.content = ''
                    })
            },
            init() {
                this.axios.get('/getLabels').then(res => {
                    this.labels = res
                    this.$nextTick(() => {
                        this.loadingClose()
                    })
                })
            },
            delSure() {
                this.axios.post('/delLabels', {
                    id: this.delId
                }).then(res => {
                    this.labels.splice(this.delIdIndex, 1)
                    this.$Message.success('删除成功');
                    this.delComment = false
                    this.modal_loading = false
                }, () => {
                    this.delComment = false
                    this.modal_loading = false
                })
            }

        },
        data() {
            return {
                labels: [],
                delId: '', //需要删除的id
                delIdIndex: '', //序号
                delComment: false,
                modal_loading: false,
                formItem: {
                    content: '', //标签
                },
                columns: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                }, {
                    title: '标签名称',
                    key: 'content'
                }, {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                },
                                on: {
                                    click: () => {
                                        this.delComment = true
                                        let index = params.index
                                        this.delId = this.labels[index]._id
                                        this.delIdIndex = index
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }],
            }
        }


}
</script>
<style>
.markdown-editor .CodeMirror,
.markdown-editor .CodeMirror-scroll {
    min-height: 400px;
}
</style>
<style lang="less">
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal {
        top: 0;
    }
}
</style>
