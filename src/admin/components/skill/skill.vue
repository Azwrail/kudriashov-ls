<template>
  <div class="skill-component" v-if="currentSkill.editmode === false">
    <div class="title">{{ skill.title }}</div>
    <div class="percent">{{ skill.percent }}    %</div>
    <div class="buttons">
      <icon symbol="pencil" class="btn" grayscale @click="currentSkill.editmode = true"></icon>
      <icon symbol="trash" class="btn" grayscale @click="$emit('remove', skill)"></icon>
    </div>
  </div>
  <div class="skill-component" v-else>
    <div class="title">
      <app-input
          v-model="currentSkill.title"
          noSidePaddings
          :error-message="validation.firstError('currentSkill.title')"
      />
    </div>
    <div class="percent">
      <app-input
          type="number"
          min="0"
          max="100"
          maxlength="3"
          v-model="currentSkill.percent"
          :error-message="validation.firstError('currentSkill.percent')"/>
    </div>
    <div class="buttons">
      <icon symbol="tick" class="btn" @click="editSkill"></icon>
      <icon symbol="cross" class="btn" @click="currentSkill.editmode = false"></icon>
    </div>
  </div>

</template>

<script>
import Icon from "../icon/icon";
import AppInput from "../input/input"
import { Validator, mixin as ValidatorMixin} from "simple-vue-validator"

export default {
  components: {Icon, AppInput},
  props: {
    skill: {
      type: Object,
      required: true
    }
  },
  mixins: [
    ValidatorMixin
  ],
  validators: {
    "currentSkill.title": value => {
      return Validator.value(value).required("Введите имя скила")
    },
    "currentSkill.percent": value => {
      return Validator.value(value)
          .integer("Должно быть пустым")
          .between(0, 100, "Должно быть от 0 до 100")
          .required("Укажите проценты")
    }
  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        editmode: false
      }
    }
  },
  methods: {
    createSkill() {
      this.$emit('approve', ...this.currentSkill)
    },
    async editSkill() {
      if (await this.$validate() === false) return;

      this.$emit('approve', this.currentSkill);
    }
  }
}
</script>

<style scoped src="./skill.pcss">

</style>