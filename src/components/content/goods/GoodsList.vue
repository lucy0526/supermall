<template>
    <div class="goods-list">
        <goods-list-item v-for="(item, index) in pgoods" :key="index" :pitem="item"></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
    name: "GoodsList",
    components: {
        GoodsListItem,
    },
    props: {
        pgoods: Array,
    },
};
</script>

<style scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    /* 均等分 */
    justify-content: space-around;
    padding:5px;

    margin-top: 10px;
    border-top: 4px solid #EEEEEE;
    padding-top: 10px;
    margin-bottom: 70px;
}
</style>
