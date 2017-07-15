<template>
    <div class="box">
        <user-reply ref="maxReplay" maxReplay=true></user-reply>
        <comment-list></comment-list>
    </div>
</template>
<script>
import reply from './reply'
import commentList from './commentList'
export default {
    components: {
        'user-reply': reply,
        commentList
    },
    data() {
        return {

        }
    },
    mounted() {

    }
};
</script>
<style lang="less" scoped>
.box {
    padding: 35px;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 3px;
    border-bottom: 3px solid #38b7ea;
    position: relative;
    overflow: hidden;
    margin-top: 30px;
    border-radius: 5px;
    overflow: hidden;
}

@media (max-width: 580px) {
    .box {
        padding: 10px;
    }
}
</style>
