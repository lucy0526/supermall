<template>
    <nav-bar class="detail-nav">
        <div class="left" slot="left" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div class="center" slot="center">
            <div
                v-for="(item, index) in titles"
                :key="index"
                :class="{active:currentIndex == index}"
                class="title"
                @click='titleClick(index)'
            >{{item}}</div>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data() {
        return {
            titles: ['博客', '时间', '更多', '内容'],
            currentIndex: 0,
        }
    },
    methods: {
        titleClick(index){
            this.currentIndex = index;
            this.$emit('titleClick', index);
        },
        backClick(){
            this.$router.back();
        }
    }
}
</script>

<style scoped>
/* 实现均等分： */
/* 父标签flex布局
    子标签flex等于1
*/
.center {
    display: flex;
}
.title {
    display: inline-block;
    flex: 1;
    font-size: 13px;
}
.active {
    color: var(--color-high-text);
}
.left img {
    vertical-align: middle;
    margin-left: 15px;
}
</style>
