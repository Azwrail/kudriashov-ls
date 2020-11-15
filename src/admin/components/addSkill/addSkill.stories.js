import addSkill from "./addSkill";
import { action } from "@storybook/addon-actions"

const methods = {
    onAddSkill: action("onAddSkill"),
}
export default {
    title: "addSkill",
    components: {
        addSkill
    }
}

export const defaultView = () => ({
    components: {addSkill},
    template: `
        <add-skill @addSkill="onAddSkill">
        </add-skill>
    `,
    methods
});