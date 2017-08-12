<template>
    <div>
        <div v-for="el,index in list" v-if="list.length > 0">
            <div class="comments-ask">
                <div class="header"><span class="name">{{el.toUserName}}</span> ·
                    <span>{{el.time}}</span> <span> · <span class="reply" @click="reply(el, index)">回复</span></span>
                </div>
                <div class="content"><span>{{el.content}}</span></div>
            </div>
            <div class="comments-reply">
                <user-reply ref="userReply" v-if="el.reply" @replyCb="replyCb"></user-reply>
                <div class="comments-reply-user" v-if="el.childReply.length" v-for="item in el.childReply">
                    <div class="header"><span class="name">{{item.toUserName}}</span> ·
                        <span>{{item.time}}</span></div>
                    <div class="content"><span>{{item.content}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import reply from './reply'
export default {
    components: {
        'user-reply': reply,
    },
    data() {
        return {
            list: [],
            replyIndex: null,
            timerCount: 0,
        }
    },
    mounted() {
        this.axios.get('/getComment', {
            params: {
                showView: true,
                id: this.$route.query.id
            }
        }).then(data => {
            let arr = data.list
            arr.forEach((item, index) => {
                arr[index].reply = false
            })
            this.list = arr
        })
    },
    methods: {
        reply(el, index) {
            this.list.forEach((item, index) => {
                this.list[index].reply = false
            })
            this.list[index].reply = true
            this.replyIndex = index
            this.$nextTick(() => {
                this.scrollRefresh()
            })
        },
        replyCb(content) {
            let isAdmin = localStorage.getItem('adminName') ? true : false
            if (this.timerCount == 0) {
                this.axios.post('/comment', {
                    articleId: this.$route.query.id,
                    replyId: this.list[this.replyIndex]._id,
                    toUserName: isAdmin ? '管理员-兜兜' : localStorage.getItem('replyName'),
                    content: content,
                    email: isAdmin ? '管理员' : localStorage.getItem('replyEmail'),
                    isAdmin: isAdmin,
                    state: isAdmin ? true : false //真就是admin自己回复
                }).then(() => {
                    if (isAdmin) {
                        this.$Message.success('留言成功')
                    } else {
                        this.$Message.success('请等待管理员审核您的留言')
                        this.list.forEach((item, index) => {
                            this.list[index].reply = false
                        })
                    }
                    this.$nextTick(() => {
                            this.scrollRefresh()
                        })
                        //倒计时回复
                    this.timerCount = 10
                    let timer = setInterval(() => {
                        if (this.timerCount == 0) {
                            clearInterval(timer)
                        } else {
                            this.timerCount--
                        }
                    }, 1000)
                })
            } else {
                this.$Message.warning(this.timerCount + 's后重新发表留言');
            }
        }
    }
};
</script>
<style lang="less" scoped>
.header {
    font-size: 14px;
    line-height: 130%;
    padding: 5px 0;
    color: #ececec;
    .name {
        font-size: 18px;
        color: #38b7ea;
    }
}

.content {
    font-size: 14px;
    line-height: 150%;
    padding: 5px 0;
    color: #fff;
}

.comments-ask {
    box-sizing: content-box;
    padding: 10px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
    .reply {
        color: #ff9700;
    }
    &:after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 0;
        width: 100%;
        height: 0;
        border-top: 1px solid #fff;
    }
}

.comments-reply {
    padding-left: 80px;
    .comments-reply-user {
        padding: 5px;
        margin-bottom: 0;
        border-bottom: 1px solid #fff;
        position: relative;
        .header {
            font-size: 14px;
            line-height: 130%;
            padding: 3px 0;
            color: #fff;
        }
        .name {
            font-size: 14px;
            color: #38b7ea;
        }
    }
}

@media (max-width: 580px) {
    .comments-reply {
        padding-left: 30px;
    }
}
</style>
