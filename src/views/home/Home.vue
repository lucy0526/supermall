<template>
    <div id="home">
        <!-- 顶部标签 -->
        <nav-bar class="home-nav">
            <div slot="center" class="center">购物街</div>
        </nav-bar>

        <tab-control
            class="tab-control-fixed"
            ref="tabControlFixed"
            :ptitles="titles"
            @tabClick="changeList"
            v-show="isShowTabControl"
        ></tab-control>

        <scroll
            class="content"
            ref="scroll"
            :pprobetype="3"
            @scroll="contentScroll"
            :ppullUpLoad="true"
            @pullUpload="loadMore"
        >
            <!-- 轮播图 -->
            <home-swiper :pbanners="banners" @swiperImgLoad="swiperFinishLoad"></home-swiper>

            <!-- 推荐nav -->
            <home-recommend :precommends="recommends"></home-recommend>

            <!-- 本周流程 -->
            <home-feature></home-feature>

            <!-- 选项卡 -->
            <!-- @tabClick="changeList"不带参数 -->
            <tab-control
                class="tab-control-position"
                ref="tabControl"
                :ptitles="titles"
                @tabClick="changeList"
                v-show="!isShowTabControl"
            ></tab-control>
            <!-- <tab-control :ptitles="['流行', '新款', '精选']"></tab-control> -->

            <!-- list -->
            <goods-list :pgoods="goods[currentType].list"></goods-list>
        </scroll>

        <!-- 返回顶部 -->
        <!-- native：实现组件点击事件的监听，否则组件不能被监听 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import { homeMultidataRequest, homeGoodsRequest } from "network/home";
// import BScroll from 'better-scroll'
import { debounce } from "common/utils"

// 顶部标签
import NavBar from "components/common/navbar/NavBar";
// 滚动条
import Scroll from "components/common/scroll/Scroll";
// 选项卡
import TabControl from "components/content/tabControl/TabControl";
// list
import GoodsList from "components/content/goods/GoodsList";
// 返回顶部
import BackTop from "components/content/backTop/BackTop";

// 轮播图
import HomeSwiper from "./childrenComponents/HomeSwiper";
// 推荐nav
import HomeRecommend from "./childrenComponents/HomeRecommend";
// 本周流行
import HomeFeature from "./childrenComponents/HomeFeature";

export default {
    name: "Home",
    data() {
        return {
            banners: [],
            recommends: [],
            titles: ["流行", "新款", "精选"],
            goods: {
                pop: { page: 0, list: [] },
                new: { page: 0, list: [] },
                selected: { page: 0, list: [] },
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabControlOffsetTop: 0,
            // isFixedTabControl: false,
            isShowTabControl: false,
        };
    },
    components: {
        NavBar,
        HomeSwiper,
        HomeRecommend,
        HomeFeature,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    // 在vue被创建的时候就发送网络请求
    created() {
        // 请求轮播图数据
        this.getHomeMutidata();
        // 请求具体数据
        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("selected");
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 100)
        // 注册监听事件：图片加载
        this.$bus.$on('imgLoad', () => {
            // this.$refs.scroll.refresh();
            refresh();
        })
    },
    methods: {
        getHomeMutidata() {
            homeMultidataRequest().then((res) => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            });
        },
        getHomeGoods(type) {
            // 112个数据
            // 每页请求10个，共4页，每类40个
            // 共3类，每类40个，120个数据
            // 第一类：0~9， 10~19， 20~29， 30~39
            // 第二类：40~49， 50~59, 60~69, 70~79
            // 第三类：80~89， 90~99， 100~109
            // const page = this.goods[type].page + 1;

            homeGoodsRequest(type).then((res) => {
                // console.log(res);
                // 解析数组的元素，放到数组中
                // this.goods[type].list.push(...res.data.list);

                // 112个数据
                // 每次放10个 到对应类型的list里面
                // console.log(type, this.goods[type].page)

                if (this.goods[type].page < 3 || (type != 'selected' && this.goods[type].page < 4)) {
                    let start = this.goods[type].page * 10; //默认 pop

                    switch (type) {
                        case "new":
                            start = 40 + this.goods[type].page * 10;
                            break;
                        case "selected":
                            start = 80 + this.goods[type].page * 10;
                            break;
                    }
                    let end = start + 10;
                    // console.log(start + " ~ " + end)

                    for (let i = start; i < end; i++) {
                        this.goods[type].list.push(res[i]);
                    }

                    this.goods[type].page++;

                }
                // 完成加载后恢复加载更多，每加载完成后就要调用一次，才不会影响下一次加载
                this.$refs.scroll.finishPullUp();
            });
        },

        // 选项卡点击
        changeList(index) {
            switch (index) {
                case 0: this.currentType = 'pop'
                    break;
                case 1: this.currentType = 'new'
                    break;
                case 2: this.currentType = 'selected'
                    break;
            }
            // 让两个选项卡一致
            this.$refs.tabControl.currentIndex = index;
            this.$refs.tabControlFixed.currentIndex = index;
        },

        // 返回顶部点击
        backClick() {
            // 参数一：x的位置；参数二：y的位置；参数三：返回需要的时间，毫秒
            this.$refs.scroll.scrollTo(0, 0, 500)
        },

        contentScroll(position) {
            // 1. 是否显示返回顶部按钮
            this.isShowBackTop = -position.y > 100;
            // 2. 是否吸顶
            // this.isFixedTabControl = -position.y > this.tabControlOffsetTop
            this.isShowTabControl = -position.y > this.tabControlOffsetTop;
        },

        loadMore() {
            // 加载更多数据，并更新加载完成方法
            this.getHomeGoods(this.currentType);
            // 重新计算scroll高度：创建一个监听，每次加载图片都要重新算
            // this.$refs.scroll.scroll.refresh();

        },

        // 获得选项卡的高度
        swiperFinishLoad() {
            // $el：表示组件中的元素
            this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
            // console.log(this.tabControlOffsetTop)
        }
    },
};
</script>

<style scoped>
#home {
    /* padding-top: 44px; */
    /* vh:视口高度，表示100%视口 */
    height: 100vh;
}
.home-nav {
    /* position: fixed; */
    /* z-index: 1;
    left: 0;
    right: 0;
    top: 0; */

    background-color: var(--color-tint);
}
.home-nav .center {
    color: white;
}
/* 移动到顶部后 固定 */
/* #home .tab-control-position {
    position: sticky;
    top: 88px;
} */

.content {
    /* height: 900px; */
    /* height: calc(100% - 93px); */
    height: calc(100% - 49px);
    overflow: hidden;
    /* margin-top: 44px; */
}
</style>
