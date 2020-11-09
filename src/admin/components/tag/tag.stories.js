import tag from "./tag.vue";

export default {
  title: "tag",
  components: {tag}
}

export const defaultView = () => ({
  components: { tag },
  template: `
    <tag title="tag" />
  `
});

export const interactiveView = () => ({
  components: { tag },
  template: `
    <tag title="tag" interactive/>
  `
});

defaultView.story = {
  name: "Стандартный вид",
  parameters: {
    backgrounds: [
      { name: 'grey', value: '#8395a7', default: true },
    ],
  },
};
interactiveView.story = {
  name: "С контроллом",
  parameters: {
    backgrounds: [
      { name: 'grey', value: '#8395a7', default: true },
    ],
  },
}
