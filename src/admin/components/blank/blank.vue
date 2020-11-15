<template>
  <div class="blank-component">
    <card>
      <edit-line
          slot="title"
          v-model="blankTitle"
          :edit-mode-by-default="empty"
          @remove="$emit('remove', $event)"
          @remove-blank="$emit('remove-blank')"
          @approve="validationTitle()"
          :isValidTitle="isTitleNotEmpty">
      </edit-line>
      <template slot="content">
        <ul class="skills">
          <li class="item" v-for="skill in skills" :key="skill.id" v-if="empty === false">
            <skill
                :skill="skill"
                @remove="$emit('remove-skill', $event)"
                @approve="$emit('edit-skill', $event)"></skill>
          </li>
        </ul>
        <div class="add-skill-line">
          <add-skill @addSkill="pushNewSkill" :blocked="empty"></add-skill>
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
      blankTitle: this.title
    }
  },
  computed: {
    isTitleNotEmpty() {
      return this.blankTitle !== ""
    }
  },
  methods: {
    pushNewSkill(newSkill) {
      this.skills.push(newSkill)
    }
  }
}
</script>

<style scoped src="./blank.pcss">

</style>