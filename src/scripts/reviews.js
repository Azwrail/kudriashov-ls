import Vue from "vue";
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);

new Vue({
    el: "#reviews-component",
    template: "#reviews-container",
    data() {
        return {
            reviews: []
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
                    slider.slideNext()
                    break;
                case "prev":
                    slider.slidePrev()
                    break;
            }
        }
    },
    created() {
        this.reviews = require("../data/reviews.json");
        this.reviews = this.requireImagesToArray(this.reviews)
    }
})