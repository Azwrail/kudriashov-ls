<template>
  <div class="headline-component">
      <div class="container headline-container">
        <slot></slot>
        <div class="title">
          {{title}}
        </div>
        <div class="buttons">
          <button class="btn" type="button">Выйти</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Панель администрирования"
    }
  },
}
</script>

<style scoped src="./headline.pcss">

</style>