<template>
    <div id="quick-view">
        <!-- 顶部导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">
                购物车
                ({{blogsLength}})
            </div>
        </nav-bar>

        <cart-list></cart-list>
    </div>
</template>

<script>
// 顶部导航
import NavBar from "components/common/navbar/NavBar";

import CartList from './CartChildren/CartList'

export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList
    },
    computed: {
        blogsLength() {
            return this.$store.getters.blogsLength;
        }
    }
};
</script>

<style scoped>
#quick-view {
    height: 100vh;
}
.nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-size: 19px;
}
</style>
