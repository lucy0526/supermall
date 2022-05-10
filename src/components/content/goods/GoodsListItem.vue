<template>
    <div class="goods-item" @click="itemClick">
        <!-- 监听图片加载 -->
        <img :src="pitem.firstpicture" @load="imgLoad" />
        <div class="goods-text">
            <p>{{pitem.description}}</p>
            <span class="item-title">{{pitem.title}}</span>
            <span class="item-createtime">{{pitem.createtime}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "GoodsListItem",
    props: {
        pitem: Object,
    },
    methods: {
        imgLoad() {
            this.$bus.$emit('imgLoad')
        },
        itemClick() {
            this.$router.push('/detail/'+this.pitem.title)
        }
    }
};
</script>

<style scoped>
.goods-item {
    /* display: flex; */
    /* width: 40%; */
    margin-top: 20px;
    width: 45%;
    /* position: relative; */
    display: inline-block;
    /* margin: 10px; */
}

.goods-item p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.goods-item img {
    width: 100%;
    border-radius: 5px;
}
.goods-item .goods-text {
    margin-top: 5px;
}
.goods-item span {
    display: inline-block;
    font-size: 12px;
    line-height: 15px;
    height: 15px;
    /* width: 72px; */
    margin-top: 5px;
}
.goods-item .item-title {
    /* color: var(--color-high-text); */
    color: var(--color-tint);
    margin-right: 10px;
    width: 100%;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
}
.goods-item .item-createtime::before {
    content: '';
    /* position: absolute; */
    display: inline-block;
    width: 14px;
    height: 14px;
    /* 0/14px必要 */
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
    margin-right: 4px;
    vertical-align: top;
}
</style>
