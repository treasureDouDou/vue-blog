<template>
    <div class="login">
        <Row>
            <Col :lg="{span: 6, offset: 8}" :sm="{span: 12, offset: 4}" :xs="{span: 16, offset: 2}">
            <Form :model="login" :rules="ruleCustom" :label-width="80">
                <Form-item label="账号" prop="name">
                    <Input type="text" v-model="login.name" @on-enter="submit()"></Input>
                </Form-item>
                <Form-item label="密码" prop="pwd" >
                    <Input type="password" v-model="login.password" @on-enter="submit()"></Input>
                </Form-item>
                <Form-item>
                    <Button type="info" @click="submit" long>登录</Button>
                </Form-item>
                <Form-item>
                    <span class="visit">拜访账号密码：admin——123123</span>
                </Form-item>
            </Form>
            </Col>
        </Row>
    </div>
</template>
<script>
import {
    mapMutations
} from 'vuex'
export default {
    data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                login: {
                    name: '',
                    password: '',
                },
                ruleCustom: {
                    name: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    pwd: [{
                        validator: validatePassCheck,
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            ...mapMutations(['isLoginType', 'reLoginType']),
            submit() {
                if (this.login.name == 'admin' && this.login.password == 123123) {
                    localStorage.setItem('visit', 'admin')
                    localStorage.setItem('visitPassword', '123123')
                    this.$router.replace('/manage/articleList')
                } else {
                    this.axios.post('/login', this.login).then(data => {
                        localStorage.setItem('adminName', this.login.name)
                        localStorage.setItem('adminPassword', this.login.password)
                        this.$router.replace('/manage/articleList')
                    })
                }

            },
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.login {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    label {
        font-size: 14px !important;
        color: #000 !important;
    }
    .visit {
        color: #2db7f5;
        font-size: 16px;
    }
}
</style>
