import Vue from "vue";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

new Vue({
    el: "#reviews-component",
    template: "#reviews-container",
    data() {
        return {
            reviews: [],
            sliderOptions: {
                slidesPerView: 2,
                loop: false
            },
            isDisableNext: false,
            isDisablePrev: true
        }
    },
    computed: {
        slider() {
            return this.$refs["slider"].$swiper;
        },
        maxPageNumber() {
            return this.reviews.length / 2
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
        },
        slide(direction) {
            switch (direction) {
                case "next":
                    this.isDisablePrev = false;
                    this.slider.slideNext();
                    break;
                case "prev":
                    this.isDisableNext = false;
                    this.slider.slidePrev();
                    break;
            }
        }
    },
    created() {
        this.reviews = require("../data/reviews.json");
        this.reviews = this.requireImagesToArray(this.reviews)
    }
}) 