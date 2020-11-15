import addTag from "./addTag";
import { action } from "@storybook/addon-actions"

const methods = {
}
export default {
    title: "addTag",
    components: {
        addTag
    }
}

export const defaultView = () => ({
    components: {addTag},
    data() {
        return {
            tags: "One, two, three"
        }
    },
    template: `
        <div>
            <pre >{{tags}}</pre>
            <add-tag v-model="tags">
            </add-tag>
        </div>
 
    `,
    methods
});