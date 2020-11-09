<template>
  <div
      :class="['add-skill-component', {blocked: blocked}]">
    <div class="add-title">
      <app-input v-if="ifValidated" v-model="newSkill.title" noSidePaddings placeholder="Новый навык" />
      <app-input v-else v-model="newSkill.title" v-on:input="ifValidated = true" error-message="Заполните поле"/>
    </div>
    <div class="add-percent">
      <app-input
          type="number"
          min="0"
          max="100"
          maxlength="3"
          v-model="newSkill.percent"
          placeholder="%"
      />
    </div>
    <div class="add-button">
      <iconed-btn type="iconed" @click="onAdd" title="" />
    </div>
  </div>
</template>

<script>
import AppInput from "../input/input"
import IconedBtn from "../button/types/iconedBtn/iconedBtn";
export default {
  components: {IconedBtn, AppInput},
  props: {
    blocked: Boolean
  },
  data() {
    return {
      newSkill: {
        title: "",
        percent: 100
      },
      ifValidated: Boolean
    }
  },
  methods: {
    onAdd() {
      if (this.newSkill.title === "") {
        this.ifValidated = false
      } else {
        const skill = this.newSkill;
        // this.$emit('addSkill', skill)
        this.newSkill.title = ""
        this.newSkill.percent = 100
      }
    }
  }
}
</script>

<style scoped src="./addSkill.pcss">

</style>