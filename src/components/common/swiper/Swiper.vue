<template>
    <div id="hy-swiper">
        <!-- 放图片 -->
        <div class="swiper" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove">
            <slot></slot>
        </div>

        <!-- <slot name="indicator"></slot> -->

        <!-- 放小点 -->
        <div class="indicator">
            <slot name="indicator" v-if="showIndicator && slideCount > 1">
                <div
                    v-for="(item, index) in slideCount"
                    :class="{active: index=== currentIndex-1}"
                    :key="index"
                    class="indicator-item"
                ></div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "swipe",
    props: {
        interval: {
            type: Number,
            default: 2000,
        },
        // 动画间隔
        animDuration: {
            type: Number,
            default: 0,
        },
        moveRatio: {
            type: Number,
            default: 0.25,
        },
        showIndicator: {
            type: Boolean,
            default: true,
        },
    },
    data: function () {
        return {
            slideCount: 0, //图片个数
            totalWidth: 0,
            swiperStyle: {}, //样式
            currentIndex: 1,
            scrolling: false, //是否正在滚动
        };
    },
    // 组件挂载后调用
    mounted: function () {
        setTimeout(() => {
            // 初始化
            this.handleDom();
            // 开启定时器
            this.startTimer();
        }, 100);
    },
    methods: {
        handleDom: function () {
            // 要操作的元素
            let swiperDiv = document.querySelector(".swiper");
            let slideDivs = document.querySelectorAll(".slide");
            // 获得个数
            this.slideCount = slideDivs.length;
            //
            if (this.slideCount > 1) {
                let cloneFirst = slideDivs[0].cloneNode(true);
                let cloneLast = slideDivs[this.slideCount - 1].cloneNode(true);
                // 复制最后一个图片到第一个位置
                // 复制第一个图片到最后
                swiperDiv.insertBefore(cloneLast, slideDivs[0]);
                swiperDiv.appendChild(cloneFirst);
                //
                this.totalWidth = swiperDiv.offsetWidth;
                this.swiperStyle = swiperDiv.style;
            }
            // 设置滚动位置，让图片显示第一个
            this.setTransform(-this.totalWidth);
        },
        // 直接设置位置
        setTransform: function (position) {
            // this.swiperStyle.transform = "translate3d(${position}px,0,0)";
            // this.swiperStyle["-webkit-transform"] =
            //     "translate3d(${position}px,0,0)";
            // this.swiperStyle["-moz-transform"] =
            //     "translate3d(${position}px,0,0)";
            // 注意引号
            this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
            this.swiperStyle[
                "-webkit-transform"
            ] = `translate3d(${position}px), 0, 0`;
            this.swiperStyle[
                "-ms-transform"
            ] = `translate3d(${position}px), 0, 0`;
        },
        
        // 定时器操作
        startTimer: function () {
            this.playTimer = window.setInterval(() => {
                this.currentIndex++;
                this.scrollContent(-this.currentIndex * this.totalWidth);
            }, this.interval);
        },

        stopTimer: function () {
            window.clearTimeout(this.playTimer);
        },

        // 设置滚动位置
        scrollContent: function (currentPosition) {
            this.scrolling = true;
            //过渡动画
            this.swiperStyle.transition =
                "transform" + this.animDuration + "ms";
            this.setTransform(currentPosition);
            this.checkPosition(); //矫正位子
            this.scrolling = false;

            // console.log("----------"+this.currentIndex)
        },
        // 矫正滚到正确位子
        checkPosition() {
            window.setTimeout(() => {
                this.swiperStyle.transition = "0ms";
                // 移动到最后一个，返回第一个
                if (this.currentIndex >= this.slideCount + 1) {
                    this.currentIndex = 1;
                    this.setTransform(-this.currentIndex * this.totalWidth);
                    // 移动到第一个，返回最有一个
                } else if (this.currentIndex <= 0) {
                    this.currentIndex = this.slideCount;
                    this.setTransform(-this.currentIndex * this.totalWidth);
                }
                //
                this.$emit("transitionEnd", this.currentIndex - 1);
            }, this.animDuration);
        },

        // 手指移动事件
        touchStart: function (e) {
            // 如果正在动，不执行
            if (this.scrolling) return;
            this.stopTimer();
            // 保存开始滚动的地方
            this.startX = e.touches[0].pageX;
        },
        touchEnd: function (e) {
            let currentMove = Math.abs(this.distance);
            if (this.distance == 0) return;
            else if (
                this.distance > 0 &&
                currentMove > this.totalWidth * this.moveRatio
            )
                this.currentIndex--;
            else if (
                this.distance < 0 &&
                currentMove > this.totalWidth * this.moveRatio
            )
                this.currentIndex++;
            this.scrollContent(-this.currentIndex * this.totalWidth);
            this.startTimer();
        },
        touchMove(e) {
            this.currentX = e.touches[0].pageX;
            // 手指移动的距离
            this.distance = this.currentX - this.startX;

            let currentPosition = -this.currentIndex * this.totalWidth;
            // 移动距离 = 手指移动的距离+当前位置
            let moveDistance = this.distance + currentPosition;
            this.setTransform(moveDistance);
        },
    },
};
</script>

<style scoped>
#hy-swiper {
    overflow: hidden;
    /* background-color:red; */

    position: relative;
}
.swiper {
    /* background-color:red; */
    display: flex;
}
.indicator {
    position: flex;
    text-align: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;

}
.indicator-item {
    display: inline-block;
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: white;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
}
/* .indicator-item .active { */
.indicator .active {
    /* position: relative; */
    background-color: rgba(212, 62, 46, 1);
}
</style>
