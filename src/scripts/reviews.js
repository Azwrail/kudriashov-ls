import Vue from "vue";
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);

new Vue({
    el: "#reviews-component",
    template: "#reviews-container",
    data() {
        return {
            reviews: [],
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
                    document.querySelector('.VueCarousel-navigation-next').click()
                    break;
                case "prev":
                    document.querySelector('.VueCarousel-navigation-prev').click()
                    break;
            }
        }
    },
    created() {
        this.reviews = require("../data/reviews.json");
        this.reviews = this.requireImagesToArray(this.reviews)

    }
})