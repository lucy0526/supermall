<template>
    <div class="nav-bar">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    box-shadow: 0 1px 1px rgba(1, 1, 1, .1);
}
.left,
.right {
    width: 60px;
}
.center {
    /* 占据剩余空间 */
    flex: 1;
    text-align: center;
}
</style>
