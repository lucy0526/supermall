<template>
    <div class="tab-control">
        <!-- <div>流行</div>
        <div>新款</div>
        <div>精选</div>-->
        <div class="tab-control-item" v-for="(item, index) in ptitles" :key="index">
            <span :class="{isActive:currentIndex == index}" @click="tabClick(index)">{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",
    data() {
        return {
            currentIndex: 0,
        };
    },
    props: {
        ptitles: Array,
    },
    methods: {
        tabClick(index) {
            this.currentIndex = index;
            this.$emit("tabClick", index);
        },
    },
};
</script>

<style scoped>
.tab-control {
    display: flex;
    /* margin-top: 15px; */
    background-color: #ffffff;
}
.tab-control-item {
    flex: 1;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
}
.tab-control-item .isActive {
    display: inline-block;
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
    width: 40px;
    height: 35px;
}
</style>
