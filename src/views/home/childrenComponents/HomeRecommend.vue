<template>
    <div class="recommend">
        <div class="recommend-item" v-for="(recommend, index) in precommends" :key="index">
            <a :href="recommend.link">
                <img :src="recommend.image" alt />
                <div>{{recommend.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeRecommend",
    props: {
        precommends: Array,
    },
};
</script>

<style scoped>
.recommend {
    display: flex;
    margin-top: 10px;
    text-align: center;
    border-bottom: 8px solid #eee;
    height: 120px;
}
.recommend-item {
    /* width: 100px; */
    /* 设置每项均等分 */
    flex: 1;
}
.recommend-item img{
    width: 70px;
    margin-bottom: 10px;
}
</style>
