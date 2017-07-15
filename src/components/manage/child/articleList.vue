<template>
    <div class="article-list">
        <div class="article-wrap">
            <Table border :columns="columns" :data="data"></Table>
        </div>
        <div class="page">
            <Page :total="total" placement="top" show-sizer :page-size="pageSize" :current="current" :page-size-opts="[1, 20, 30]" show-total @on-change="change" @on-page-size-change="sizeChange"></Page>
        </div>
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
                current: 1, //当前页码
                pageSize: 20, //每页条数
                total: 0,
                delIndex: null,
                modal_loading: false,
                delComment: false,
                columns: [{
                    title: '文章名称',
                    key: 'title',
                }, {
                    title: '创建时间',
                    key: 'showDate'
                }, {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        let data = this.data[params.index]
                                        this.$router.push({
                                            name: 'saveArticle',
                                            query: {
                                                id: data._id
                                            }
                                        })
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.delIndex = params.index
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
            remove(index) {
                this.data6.splice(index, 1);
            },
            change(current) {
                this.current = current
                this.search()
            },
            delSure() {
                this.modal_loading = true
                this.axios.post('delArticle', {
                    id: this.data[this.delIndex]._id
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
            sizeChange(pageSize) {
                this.pageSize = pageSize
                this.search()
            },
            async search() {
                let data = await this.axios.get('/getArticleList', {
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
        float: left;
        transform: translateX(-50%);
        margin-left: 50%;
    }
}
</style>
