<template>
    <div class="detail">
        <tab-comtrol></tab-comtrol>
        <router-view></router-view>
    </div>
</template>

<script>
import TabControl from "components/content/tabControl/TabControl";

export default {
    name: "HomeDetail",
    components: {
        TabControl,
    },
};
</script>

<style scoped>
</style>
