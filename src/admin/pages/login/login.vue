<template>
  <div class="login-page">
    <div class="login-window">
      <div class="window-wrapper">
        <form @submit.prevent="logIn" class="input-wrapper">
          <div class="title">Авторизация</div>
          <app-input
              v-model="user.name"
              title="Логин"
              icon="user"
              :error-message="validation.firstError('user.name')"/>
          <app-input
              type="password"
              v-model="user.password"
              title="Пароль"
              icon="key"
              :error-message="validation.firstError('user.password')"/>
          <appButton :disabled="isSubmitDisabled" class="button" title="Отправить"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import appInput from "../../components/input/input"
import appButton from "../../components/button/button"
import Button from "../../components/button/button";
import { Validator, mixin as ValidatorMixin} from "simple-vue-validator"
import $axios from "../../request";
import {mapActions} from "vuex";

export default {
  mixins: [
    ValidatorMixin
  ],
  validators: {
    "user.name": value => {
      return Validator.value(value).required("Введите логин")
    },
    "user.password": value => {
      return Validator.value(value).required("Введите пароль")
    }
  },
  data() {
    return {
      user: {
        name: "",
        password: ""
      },
      isSubmitDisabled: false
    }
  },
  computed: {},
  components: {
    Button,
    appInput,
    appButton
  },
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show"
    }),
    async logIn() {
      if (await this.$validate() === false) return;
      this.isSubmitDisabled = true;

      try {
        const response = await $axios.post("login", this.user);

        const token = response.data.token;
        window.localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`

        const resp = await $axios.get("user");
        window.localStorage.setItem("userId", resp.data.user.id);

        this.$router.replace("/");
      } catch (error) {
        this.showTooltip({
          text: error.response.data.error,
          type: "error"
        })
        console.log(error.response.data.error);
      } finally {
        this.isSubmitDisabled = false;

      }
    }
  }
}
</script>

<style scoped lang="postcss" src="./login.pcss">

</style>