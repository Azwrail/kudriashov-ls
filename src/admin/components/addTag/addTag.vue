<template>
  <div
      :class="['add-tag-component']">
    <div class="add-title">
      <app-input
          v-if="withAdd"
          title="Добавление тега"
          v-model="currentTags"
          @input="$emit('change', currentTags)"
          :error-message="error"
      />
      <ul class="tags">
        <li class="item"
            v-for="tag in tagsArray"
            :key="`${tag}`"
            v-if="tag.trim()">
          <tag
              @click="removeTag(tag)"
              :title="tag"
              :interactive="withAdd">
          </tag>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AppInput from "../input/input"
import Tag from "../tag/tag";
export default {
  components: {Tag, AppInput},
  props: {
    tags: {
      type: String,
      default: ""
    },
    withAdd: Boolean,
    error: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "tags",
    event: "change"
  },
  data() {
    return {
      currentTags: this.tags,
    }
  },
  computed: {
    tagsArray() {
      return this.currentTags.trim().split(', ')
    }
  },
  methods: {
    removeTag(tag) {
      const tags = [...this.tagsArray];
      const tagNdx = tags.indexOf(tag)

      if (tagNdx < 0) return;

      tags.splice(tagNdx, 1);
      this.currentTags = tags.join(", ")

      this.$emit('change', this.currentTags)
    }
  }
}
</script>

<style scoped src="./addTag.pcss">

</style>