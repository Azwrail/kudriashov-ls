<template>
  <div class="blank-component">
    <card>
      <edit-line
          slot="title"
          v-model="blankTitle"
          :edit-mode-by-default="empty"
          @cancel="$emit('cancel', $event)"
          @remove="$emit('removeCategory')"
          @approve="approveTitle"
          :isValidTitle="isTitleNotEmpty">
      </edit-line>
      <template slot="content">
        <ul class="skills">
          <li class="item" v-for="skill in skills" :key="skill.id" v-if="empty === false">
            <skill
                :skill="skill"
                @remove="$emit('removeSkill', $event)"
                @approve="$emit('editSkill', $event)"></skill>
          </li>
        </ul>
        <div class="add-skill-line">
          <add-skill @addSkill="$emit('createSkill', $event)" :blocked="empty"></add-skill>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import Card from "../Card/card";
import Icon from "../icon/icon";
import EditLine from "../editLine/editLine";
import Skill from "../skill/skill";
import AddSkill from "../addSkill/addSkill";

export default {
  components: {AddSkill, EditLine, Icon, Card, Skill},
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      blankTitle: this.title,
    }
  },
  computed: {
    isTitleNotEmpty() {
      return this.blankTitle !== ""
    }
  },
  methods: {
    createNewSkill($event) {
      this.$emit('createSkill', $event)
    },
    approveTitle($event) {
      if (this.empty === true) {
        this.$emit('createCategory', $event)
        console.log('createCategory')
      } else {
        this.$emit('editCategory', $event)
        console.log('editCategory')
      }
    }
  }
}
</script>

<style scoped src="./blank.pcss">

</style>