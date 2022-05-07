<template>
    <div class="tab-control-item" @click="itemClick">
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControlItem",
    methods: {
        itemClick() {
            this.$router.replace(this.path);
        },
    },
    computed: {
        activeStyle() {
            return this.isActive ? { color: this.activeColor } : {};
        },
        isActive() { return this.path == this.$route.path}
    },
    props: {
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    }
};
</script>

<style scoped>
.tab-control-item {
    flex: 1;
    text-align: center;
    height: 25px;
    font-size: 14px;
}
</style>
