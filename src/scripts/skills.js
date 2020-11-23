import Vue from "vue";
import axios from "axios";
axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

const skillsItem = {
    template: "#skill-item",
    props: ["skill"],
    methods: {
        drawCircle() {
            const circle = this.$refs["circle"];
            const dashArray = parseInt(
                getComputedStyle(circle).getPropertyValue("stroke-dasharray")
            );
            const percent = (dashArray / 100) * (100 - this.skill.percent);
            circle.style.strokeDashoffset = percent;
        }
    },
    mounted() {
        this.drawCircle()
    }
};

const skillsRow = {
    template: "#skills-row",
    components: {
        skillsItem
    },
    props: ["category"]
};

new Vue({
    el: "#skills-component",
    template: "#skills-list",
    components: {
        skillsRow
    },
    data() {
        return {
            skills: []
        }
    },
    async created() {
        // this.skills = require("../data/skills.json");
        const {data} = await axios.get("categories/" + 418);
        this.skills = data;
    }
});