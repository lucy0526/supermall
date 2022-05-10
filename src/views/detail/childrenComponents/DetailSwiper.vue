<template>
    <swiper>
        <swiper-item v-for="(item, index) in pimgs" :key="index">
            <img :src="item" />
        </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper"
export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    data() {
        return {
        }
    },
    props: {
        pimgs: Array
    },
    methods: {
    }

}
</script>

<style scoped>
img {
    height: 50vh;

}
</style>
