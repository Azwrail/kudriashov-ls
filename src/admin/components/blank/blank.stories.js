import blank from "./blank";
import { action } from "@storybook/addon-actions"

const methods = {
    onRemove: action("onRemove"),
    onRemoveSkill: action("onRemoveSkill"),
    onEditSkill: action("onEditSkill")
}
export default {
    title: "blank",
    components: {
        blank
    }
}
const skills = [
    {id: 0, title: "Html", percent: 80},
    {id: 1, title: "Git", percent: 50},
    {id: 2, title: "Css", percent: 40}
];
export const defaultView = () => ({
    components: {blank},
    data() {
        return {
          title: "Frontend",
          skills
        }
    },
    template: `
        <blank 
            :title="title" 
            :skills="skills" 
            @remove="onRemove"
            @remove-skill="onRemoveSkill"
            @edit-skill="onEditSkill">
        </blank>
    `,
    methods
});