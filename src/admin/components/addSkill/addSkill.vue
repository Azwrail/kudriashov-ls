<template>
  <div
      :class="['add-skill-component', {blocked: blocked}]">
    <div class="add-title">
      <app-input
          v-model="newSkill.title"
          noSidePaddings
          placeholder="Новый навык"
          :error-message="validation.firstError('newSkill.title')"/>
    </div>
    <div class="add-percent">
      <app-input
          type="number"
          min="0"
          max="100"
          maxlength="3"
          v-model="newSkill.percent"
          placeholder="%"
          :error-message="validation.firstError('newSkill.percent')"/>
    </div>
    <div class="add-button">
      <iconed-btn type="iconed" @click="onAdd" title="" />
    </div>
  </div>
</template>

<script>
import AppInput from "../input/input"
import IconedBtn from "../button/types/iconedBtn/iconedBtn";
import { Validator, mixin as ValidatorMixin} from "simple-vue-validator"

export default {
  mixins: [
    ValidatorMixin
  ],
  validators: {
    "newSkill.title": value => {
      return Validator.value(value).required("Введите имя скила")
    },
    "newSkill.percent": value => {
      return Validator.value(value)
          .integer("Должно быть пустым")
          .between(0, 100, "Должно быть от 0 до 100")
          .required("Укажите проценты")
    }
  },
  components: {IconedBtn, AppInput},
  props: {
    blocked: Boolean
  },
  data() {
    return {
      newSkill: {
        title: "",
        percent: ""
      }
    }
  },
  methods: {
    async onAdd() {
      if (await this.$validate() === false) return;
      try {
        await this.$emit('addSkill', this.newSkill)
      } catch (error) {
        console.log(error.response.data)
      } finally {
        this.newSkill.title = ""
        this.newSkill.percent = ""
      }
    }
  }
}
</script>

<style scoped src="./addSkill.pcss">

</style>