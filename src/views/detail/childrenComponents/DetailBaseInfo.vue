<template>
    <div class="base-info">
        <div class="description">{{blog.description}}</div>
        <div class="sign">
            <div class="title">{{blog.title}}</div>
            <div class="nature">{{blog.nature}}</div>
        </div>
        <div class="num-info">
            <div class="view">浏览数量 {{blog.view}}</div>
            <div class="recommend" v-show="blog.recommend">推荐</div>
            <div class="supportreview" v-show="blog.supportreview">支持预览</div>
        </div>
        <div class="time-info" ref="timeref">
            <div class="id">编号 {{blog.id}}</div>
            <div class="createtime">创建时间 {{blog.createtime}}</div>
            <div class="updatetime">更新时间 {{blog.updatetime}}</div>
        </div>
        <div class="type" ref="moreref">
            <img :src="blog.firstpicture" @load="allOffsetTop"/>
            <div class="type-name">{{blog.name}}</div>
        </div>
        <div class="content" ref="contentref">{{blog.content}}</div>
    </div>
</template>

<script>
export default {
    name: 'DetailBaseInfo',
    data() {
        return {
        }
    },
    props: {
        blog: Object
    },
    methods: {
        allOffsetTop(){
            let allY = [];
            allY.push(this.$refs.timeref.offsetTop);
            allY.push(this.$refs.moreref.offsetTop);
            allY.push(this.$refs.contentref.offsetTop);
            this.$emit('allOffsetTop', allY);
        }
    }
}
</script>

<style scoped>
.base-info {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
}
.base-info .description {
    font-size: 19px;
    color: var(--color-text);
}
.base-info .sign {
    margin-top: 10px;
}
.base-info .title {
    display: inline-block;
    color: var(--color-high-text);
    font-size: 19px;
}
.base-info .nature {
    background-color: var(--color-tint);
    border-radius: 3px;
    color: white;
    display: inline-block;
    font-size: 15px;
    margin-left: 30px;
}
.num-info {
    display: flex;
    margin-top: 20px;
    font-size: 12px;
    color: #bbbbbd;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 8px;
}
.view{
    margin-right: 44px;
}
.recommend {
    /* margin: 0 93px 0; */
    margin-right: 44px;
}
.time-info {
    /* display: flex; */
    margin-top: 30px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 30px;
    font-size: 12px;
}
.createtime {
    margin: 0 0 0;
}
.type {
    height: 80px;
    margin-top: 50px;
    margin-bottom: 50px;
}
.type img {
    height: 80px;
    margin-left: 2px;
    vertical-align: middle;
}
.type .type-name {
    display: inline-block;
    height: 80px;
    line-height: 80px;
    font-size: 19px;
    margin-left: 10px;
}
/* .content{

} */
</style>
