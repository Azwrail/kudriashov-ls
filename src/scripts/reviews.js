import Vue from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

new Vue({
    el: "#reviews-component",
    template: "#reviews-container",
    data() {
        return {
            reviews: [],
            sliderOptions: {}
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
    methods: {
        requireImagesToArray(data) {
            return data.map(item => {
                const requiredImage = require(`../images/content/${item.authorPic}`).default;
                item.authorPic = requiredImage;
                return item;
            })
        }
    },
    created() {
        this.reviews = require("../data/reviews.json");
        this.reviews = this.requireImagesToArray(this.reviews)
    }
})