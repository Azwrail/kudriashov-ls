import Vue from "vue";

const sliderBtns = {
    template: "#slider-btns",
    methods: {
        slide(direction) {
            this.$emit("slide", direction)
        }
    }
};
const previewDisplay = {
    props: ["currentWork", "portfolio", "currentIndex", "previewImage"],
    template: "#preview-display",
    components: {
        sliderBtns
    },
    methods: {
        slide(direction) {
            this.$emit("slide", direction)
        },
        show(key) {
            this.$emit("show", key)
        }
    },
    computed: {
        reversedWorks() {
            return this.portfolio.slice(0,4)
        }
    }
};
const previewTag = {
    props: ["tags"],
    template: "#preview-tag"
};
const previewInfo = {
    props: ["currentWork"],
    template: "#preview-info",
    components: {
        previewTag
    },
    computed: {
        tagsArray() {
            return this.currentWork.skills.split(",")
        }
    }
}
new Vue({
    el: "#portfolio-component",
    template: "#portfolio-container",
    components: {
        previewDisplay,
        previewInfo
    },
    data() {
        return {
            portfolio: [],
            currentIndex: 0,
            key: ""
        }
    },

    computed: {
      currentWork() {
          return this.portfolio[0]
      },
        previewImage() {
          if (this.key === "") {
              return this.portfolio[0].photo
          } else {
              return this.portfolio[this.key].photo
          }
        }
    },
    watch: {
        currentIndex(value) {
        this.makeInfiniteLoopForNdx(value)
        }
    },
    methods: {
        requireImagesToArray(data) {
            return data.map(item => {
                const requiredImage = require(`../images/content/${item.photo}`).default;
                item.photo = requiredImage;
                return item;
            })
        },
        slide(direction) {
            const lastItem = this.portfolio[this.portfolio.length - 1];
            switch (direction) {
                case "next":
                    this.portfolio.push(this.portfolio[0]);
                    this.portfolio.shift();
                    this.currentIndex = this.portfolio[0].id;
                    break;
                case "prev":
                    this.portfolio.unshift(lastItem);
                    this.portfolio.pop();
                    this.currentIndex = this.portfolio[0].id;
                    break;
            }
        },
        show(key) {
            this.key = key - 1;
        },
        makeInfiniteLoopForNdx(index) {
            const worksNumber = this.portfolio.length - 1;
            if (index < 0) this.currentIndex = worksNumber;
            if (index > worksNumber) this.currentIndex = 0;
        }
    },

    created() {
        this.portfolio = require("../data/portfolio.json");
        this.portfolio = this.requireImagesToArray(this.portfolio)
    }
})