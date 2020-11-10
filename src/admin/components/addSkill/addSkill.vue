<template>
  <div
      :class="['add-skill-component', {blocked: blocked}]">
    <div class="add-title">
      <app-input v-if="ifValidatedTitle" v-model="newSkill.title" noSidePaddings placeholder="Новый навык" />
      <app-input v-else v-model="newSkill.title" v-on:input="ifValidatedTitle = true" error-message="Заполните поле"/>
    </div>
    <div class="add-percent">
      <app-input
          v-if="ifValidatedPercent"
          type="number"
          min="0"
          max="100"
          maxlength="3"
          v-model="newSkill.percent"
          placeholder="%"
      />
      <app-input
          v-else
          type="number"
          min="0"
          max="100"
          maxlength="3"
          v-model="newSkill.percent"
          placeholder="%"
          error-message="Заполните поле"
          v-on:input="ifValidatedPercent = true"
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
      ifValidatedTitle: true,
      ifValidatedPercent: true
    }
  },
  methods: {
    onAdd() {
      if (this.newSkill.title === "") {
        this.ifValidatedTitle = false
      }
      if (this.newSkill.percent === ""){
        this.ifValidatedPercent = false
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