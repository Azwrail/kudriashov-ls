<template>
  <div class="skill-component" v-if="editmode === false">
    <div class="title">{{ skill.title }}</div>
    <div class="percent">{{ skill.percent }}    %</div>
    <div class="buttons">
      <icon symbol="pencil" class="btn" grayscale @click="editmode = true"></icon>
      <icon symbol="trash" class="btn" grayscale @click="$emit('remove', skill.id)"></icon>
    </div>
  </div>
  <div class="skill-component" v-else>
    <div class="title">
      <app-input v-model="currentSkill.title" noSidePaddings />
    </div>
    <div class="percent">
      <app-input
          type="number"
          min="0"
          max="100"
          maxlength="3"
          v-model="currentSkill.percent"
      />
    </div>
    <div class="buttons">
      <icon symbol="tick" class="btn" @click="$emit('approve', currentSkill)"></icon>
      <icon symbol="cross" class="btn" @click="editmode = false"></icon>
    </div>
  </div>

</template>

<script>
import Icon from "../icon/icon";
import AppInput from "../input/input"
export default {
  components: {Icon, AppInput},
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      editmode: false,
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent
      }
    }
  }
}
</script>

<style scoped src="./skill.pcss">

</style>