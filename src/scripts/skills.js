import Vue from "vue";

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
    created() {
        this.skills = require("../data/skills.json");
    }
});