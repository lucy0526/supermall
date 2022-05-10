<template>
    <div class="detail">
        <!-- 顶部导航 -->
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnav"></detail-nav-bar>

        <!-- 滚动条： -->
        <!-- 必须加上高度，不然不能滚动 -->
        <scroll class="content" ref="scroll" @scroll="contentScroll" :pprobetype="3">
            <!-- <detail-nav-bar class="detail-nav"></detail-nav-bar> -->
            <detail-swiper class="detail-swiper" :pimgs="imgs"></detail-swiper>
            <detail-base-info :blog="blog" @allOffsetTop="allOffsetTop"></detail-base-info>
        </scroll>

        <!-- 返回顶部 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

        <!-- 底部购物车 -->
        <detail-bottom-bar @addClick='addQuickView'></detail-bottom-bar>
    </div>
</template>

<script>
import { detailByTitleRequest, Blog } from "network/detail";

import Scroll from "components/common/scroll/Scroll";
// 返回顶部
import BackTop from "components/content/backTop/BackTop";

import DetailNavBar from './childrenComponents/DetailNavBar'
// 轮播图
import DetailSwiper from './childrenComponents/DetailSwiper'
// 详情
import DetailBaseInfo from './childrenComponents/DetailBaseInfo'
// 底部购物车
import DetailBottomBar from './childrenComponents/DetailBottomBar'

export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        Scroll,
        DetailBottomBar,
        BackTop
    },
    data() {
        return {
            imgs: [],
            blog: {},
            themeTopYs: [0, 1000, 2000, 3000],
            currentIndex: 0,
            isShowBackTop: false,
        }
    },
    created() {
        detailByTitleRequest(this.$route.params.title)
            .then(res => {
                for (var i = 0; i < 4; i++)
                    this.imgs.push(res[0].firstpicture)
                this.blog = new Blog(res[0])
            });
    },
    methods: {
        titleClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
        },
        allOffsetTop(allY) {
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(allY[0]);
            this.themeTopYs.push(allY[1]);
            this.themeTopYs.push(allY[2]);
        },
        contentScroll(position) {
            // 1. 是否显示返回顶部按钮
            this.isShowBackTop = -position.y > 100;

            const positionY = -position.y;
            for (let i = 0; i < this.themeTopYs.length; i++) {
                if (i != this.currentIndex &&
                    (i == this.themeTopYs.length - 1 && positionY > this.themeTopYs[i]) ||
                    (i != this.themeTopYs.length - 1 && positionY > this.themeTopYs[i] && positionY <= this.themeTopYs[i + 1])
                ) {
                    this.currentIndex = i;
                }
            }
            // 不用$emit子传父，用$refs直接拿
            this.$refs.detailnav.currentIndex = this.currentIndex;
        },
        // 返回顶部点击
        backClick() {
            // 参数一：x的位置；参数二：y的位置；参数三：返回需要的时间，毫秒
            this.$refs.scroll.scrollTo(0, 0, 500)
        },

        // 加入快速访问
        addQuickView(){
            this.$store.commit('addBlog', this.blog)
        }
    }
}
</script>

<style scoped>
.detail {
    /* 高度必须设置 */
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #fff;
}
.detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
}
.content {
    height: calc(100% - 44px - 80px - 10px);
    margin-bottom: 10px;
}
</style>
