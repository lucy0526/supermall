<template>
    <swiper>
        <swiper-item v-for="(banner, index) in pbanners" :key="index">
            <a :href="banner.link">
                <img :src="banner.image" @load="imgLoad" />
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
    components: {
        Swiper,
        SwiperItem,
    },
    props:{
        pbanners: Array
    },
    methods: {
        imgLoad(){
            this.$emit('swiperImgLoad');
        }
    }
};
</script>

<style scoped>
</style>
