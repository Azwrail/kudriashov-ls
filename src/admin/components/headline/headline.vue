<template>
  <div class="headline-component">
      <div class="admin-container headline-container">
        <slot></slot>
        <div class="title">
          {{title}}
        </div>
        <div class="buttons">
          <button class="btn" type="button" @click="handle">Выйти</button>
        </div>
      </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Панель администрирования"
    }
  },
  methods: {
    ...mapActions({
      logout: "user/logout"
    }),
    handle() {
      this.logout();
    }
  }
}
</script>

<style scoped src="./headline.pcss">

</style>