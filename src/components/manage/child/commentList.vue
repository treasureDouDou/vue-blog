<template>
    <div class="article-list">
        <div class="article-wrap">
            <Table :columns="columns" :data="data"></Table>
        </div>
        <div class="page">
            <Page :total="total" placement="top" show-sizer :page-size="pageSize" :current="current" :page-size-opts="[1, 20, 30]" show-total @on-change="change" @on-page-size-change="sizeChange"></Page>
        </div>
        <Modal v-model="dialog" :styles="{top: '300px'}" title="留言详情">
            <p>{{dialogContent}}</p>
            <div slot="footer">
                <Button type="primary" size="large" @click="dialog = false">确定</Button>
            </div>
        </Modal>
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
            this.search()
        },
        data() {
            return {
                dialog: false, //隐藏对话框
                dialogContent: '', //对话框内容
                delComment: false,
                modal_loading: false,
                delId: '', //要删除id
                current: 1, //当前页码
                pageSize: 20, //每页条数
                total: 0,
                columns: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                }, {
                    title: '姓名',
                    key: 'toUserName',
                }, {
                    title: '邮箱',
                    key: 'email'
                }, {
                    title: '内容',
                    key: 'content',
                    ellipsis: true
                }, {
                    title: '留言审核',
                    key: 'state',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.state ? '通过审核' : '未通过审核')
                        ]);
                    }
                }, {
                    title: '操作',
                    width: 200,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        let data = this.data[params.index]
                                        this.dialog = true
                                        this.dialogContent = data.content
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: (e) => {
                                        let data = this.data[params.index]
                                        this.axios.post('/isAllowComment', {
                                            id: data._id,
                                            state: !data.state
                                        }).then(() => {
                                            this.data[params.index].state = !data.state
                                            this.$Message.success('操作成功');
                                        })
                                    }
                                }
                            }, this.data[params.index].state ? '拒绝' : '通过'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let index = params.index
                                        this.delId = this.data[index]._id
                                        this.delComment = true
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }],
                data: []
            }
        },
        methods: {
            delSure() {
                this.modal_loading = true
                this.axios.post('delComment', {
                    id: this.delId
                }).then(() => {
                    this.$Message.success('删除成功');
                    this.delComment = false
                    this.modal_loading = false
                    this.search()
                },() => {
                    this.delComment = false
                    this.modal_loading = false
                })
            },
            remove(index) {
                this.data6.splice(index, 1);
            },
            change(current) {
                this.current = current
                this.search()
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize
                this.search()
            },
            async search() {
                let data = await this.axios.get('/getComment', {
                    params: {
                        current: this.current,
                        pageSize: this.pageSize
                    }
                })
                this.data = data.list
                this.total = data.total
                this.$nextTick(() => {
                    this.loadingClose()
                })
            }
        }
}
</script>
<style lang="less" scoped>
.article-list {
    height: 100%;
    .article-wrap {
        height: calc(~"100% - 60px");
        overflow: auto;
    }
    .page {
        margin-top: 20px;
        transform: translateX(-50%);
        margin-left: 50%;
        float: left;
    }
}
</style>
