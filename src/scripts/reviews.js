import Vue from "vue";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import axios from "axios";
axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

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
            isDisablePrev: true,
            windowsWidth: null
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
    watch: {
        windowsWidth(value) {
            if (value < 650) {
                this.slider.params.slidesPerView = 1
                this.slider.update()
            } else {
                this.slider.params.slidesPerView = 2
                this.slider.update()
            }
        }
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
        },
        onWindowResize() {
            this.windowsWidth = window.innerWidth
        },
        cover(photo) {
            return `https://webdev-api.loftschool.com/${photo}`
        },
    },
    async created() {
        // this.reviews = require("../data/reviews.json");
        // this.reviews = this.requireImagesToArray(this.reviews)
        const {data} = await axios.get("reviews/" + 418);
        this.reviews = data;
        this.windowsWidth = window.innerWidth
        window.addEventListener("resize", this.onWindowResize);
    }
}) 