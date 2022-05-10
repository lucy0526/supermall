<template>
    <!-- ref 父组件获取它的子组件 -->
    <!-- ref 如果绑定在普通的元素中，通过this.$refs.xx获取到的就是元素对象 -->
    <div class="wrapper" ref="wrapper">
        <!-- wrapper里面必须只有一个独立元素 -->
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    data() {
        return {
            scroll: null,
        }
    },
    props: {
        pprobetype: { type: Number, default: 0 },
        ppullUpLoad: { type: Boolean, default: false }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: this.pprobetype,
            pullUpLoad: this.ppullUpLoad
        })
        // 监听滚动
        this.scroll.on('scroll', position => {
            this.$emit('scroll', position)//发出自定义事件
        })
        // 监听底部上拉更多
        this.scroll.on('pullingUp', () => {
            this.$emit('pullUpload')
        })
    },
    methods: {
        // 返回顶部方法调用
        scrollTo(x, y, time = 300) {
            this.scroll.scrollTo(x, y, time);
        },
        // 加载更多方法调用
        finishPullUp(){
            this.scroll.finishPullUp();
        },
        // 重新计算高度
        refresh() {
            this.scroll.refresh();
        }
    }
}
</script>

<style scoped>
</style>
