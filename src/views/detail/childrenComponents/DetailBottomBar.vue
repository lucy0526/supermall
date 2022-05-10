<template>
    <div class="detail-bottom-bar">
        <div class="left">
            <div class="contact">
                <div class="icon"></div>
                <div class="text">联系</div>
            </div>
            <div class="more">
                <div class="icon"></div>
                <div class="text">更多</div>
            </div>
            <div class="save">
                <div class="icon"></div>
                <div class="text">收藏</div>
            </div>
        </div>
        <div class="right">
            <div class="add" @click="addClick">加入访问</div>
            <div class="pick">点赞</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailBottomBar',
    methods: {
        addClick() {
            this.$emit('addClick');
        }
    }
}
</script>

<style scoped>
.detail-bottom-bar {
    position: relative;
    display: flex;
    height: 80px;
    background-color: #fff;
}
.detail-bottom-bar .left {
    display: flex;
    flex: 1;
    margin-left: 10px;
    margin-top: 10px;
}
.detail-bottom-bar .left > div {
    flex: 1;
}
.detail-bottom-bar .right {
    display: flex;
    flex: 1;
}
.detail-bottom-bar .contact .icon {
    width: 44px;
    height: 40px;

    /* display: block; */
    /* margin: 10px auto 3px; */
    /* 记得加px单位 */
    background: url('~assets/img/detail/detail_bottom.png') 0 193px;
}
.detail-bottom-bar .more .icon {
    width: 42px;
    height: 40px;
    text-align: center;
    /* display: block; */
    /* margin: 10px auto 3px; */
    /* 记得加px单位 */
    background: url('~assets/img/detail/detail_bottom.png') 7px 152px;
}
.detail-bottom-bar .save .icon {
    width: 42px;
    height: 40px;

    /* display: block; */
    /* margin: 10px auto 3px; */
    /* 记得加px单位 */
    background: url('~assets/img/detail/detail_bottom.png') 0 0;
}
.detail-bottom-bar .left .text {
    margin-top: 10px;
    font-size: 18px;
}

.detail-bottom-bar .right {
    font-size: 18px;
}

.detail-bottom-bar .right > div {
    flex: 1;
    text-align: center;
    height: 80px;
    line-height: 80px;
}

.detail-bottom-bar .right .add {
    background-color: #ffe91e;
}

.detail-bottom-bar .right .pick {
    background-color: #ff649d;
}
</style>
