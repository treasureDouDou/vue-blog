<template>
    <div class="reply" :class="isSaveInfo?'reply-show':'reply-hidden'">
        <div class="reply-box">
            <input type="text" v-model="content">
            <button class="reply-btn" @click="submit"><span>提交</span></button>
        </div>
        <div :class="['reply-box-info', {'active':isSaveInfo}]">
            <div class="reply-box-info-input">
                <label for="name">昵称:</label>
                <input id="name" v-model="name" class="input" type="text" placeholder="请输入昵称!" required="required">
            </div>
            <div class="reply-box-info-input">
                <label for="mail">邮箱: </label>
                <input type="email" v-model="email" class="input" id="mail" name="mail" placeholder="example@domain.com" required="required" pattern="\w+@[a-z0-9]+\.[a-z]+" title="example@domain.com">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['maxReplay'],
    data() {
        return {
            name: '',
            email: '',
            content: '',
            timerCount: 0,
            isSaveInfo: localStorage.getItem('adminName') ? false : (this.getName() && this.getEmail()) ? false : true
        }
    },
    methods: {
        isEmail(str) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            return reg.test(str);
        },
        getName() {
            return localStorage.getItem('replyName')
        },
        getEmail() {
            return localStorage.getItem('replyEmail')
        },
        submit() {
            if (!localStorage.getItem('adminName') && !this.getName() && this.name.length < 4) {
                this.$Message.error('名称最少4个字')
                return false
            } else if (this.content.length < 8) {
                this.$Message.error('留言内容不能小于8个字')
                return false
            } else if (!localStorage.getItem('adminName')) {
                if (this.getEmail() && !this.isEmail(this.getEmail())) {
                    this.$Message.error('邮箱格式不正确')
                    return false
                } else if (!this.isEmail(this.email)) {
                    this.$Message.error('邮箱格式不正确')
                    return false
                }
            }
            let isAdmin = localStorage.getItem('adminName') ? true : false
            let data = {
                articleId: this.$route.query.id,
                replyId: '',
                toUserName: isAdmin ? '管理员-兜兜' : this.name,
                email: isAdmin ? '管理员' : this.email,
                replyTime: this.getIntactTime(),
                isAdmin: isAdmin,
                content: this.content,
                state: isAdmin ? true : false //真就是admin自己回复
            }
            if (this.isSaveInfo) {
                localStorage.setItem('replyName', this.name)
                localStorage.setItem('replyEmail', this.email)
                this.isSaveInfo = false
            }
            if (!this.maxReplay) { //其他楼层下回复
                this.$emit('replyCb', this.content)
                this.content = ''
                return false
            }
            if (this.timerCount == 0) {
                this.axios.post('/comment', data).then(() => {
                    this.isSaveInfo = localStorage.getItem('adminName') ? false : (localStorage.getItem('replyName') ? false : true)
                    this.content = ''
                    if (isAdmin) {
                        this.$Message.success('留言成功')
                    } else {
                        this.$Message.success('请等待留言审核')
                    }

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
.reply {
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    transition: .2s;
    z-index: 1;
    margin: 0;
    display: flex;
    &.reply-show {
        height: 100px;
    }
    &.reply-hidden {
        height: 50px;
    }
    .reply-box {
        position: relative;
        height: 50px;
        z-index: 10;
        width: 100%;
        input {
            width: 100%;
            border-radius: 5px;
            border: 1px solid #38b7ea;
            height: 100%;
            padding-left: 20px;
            padding-right: 78px;
        }
        .reply-btn {
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            box-sizing: border-box;
            border-bottom-right-radius: 5px;
            border-top-right-radius: 5px;
            background: #38b7ea;
            color: #fff;
            padding: 0 18px;
            display: flex;
            border: 1px solid transparent;
            cursor: pointer;
            &:active {
                background: #16a0d7;
                border: 1px solid #3096e9;
            }
        }
    }
    .reply-box-info {
        display: flex;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
        transition: .2s;
        opacity: 0;
        margin: 5px 0;
        justify-content: center;
        &.active {
            transform: translateY(50px);
            opacity: 1;
        }
        .reply-box-info-input {
            justify-content: center;
            align-items: center;
            margin: 0 10px;
            color: #eee;
            display: flex;
            label {
                margin-right: 10px;
                display: inline-block;
                max-width: 100%;
                margin-bottom: 5px;
                font-size: 16px;
                font-weight: bold;
            }
            input {
                border-radius: 5px;
                border: 1px solid #38b7ea;
                height: 32px;
                width: 220px;
                color: #464642;
                padding: 0 10px;
                font-size: 14px;
            }
        }
    }
}

@media (max-width: 1200px) {
    .reply {
        &.reply-show {
            height: 135px;
        }
        .reply-box {
            height: 40px;
        }
        .reply-box-info {
            flex-direction: column;
            height: 50px;
            justify-content: space-around;
            align-items: flex-end;
        }
    }
}
</style>
