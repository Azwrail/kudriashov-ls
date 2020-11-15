<template>
  <div class="app-container" >
    <router-view name="header" />
    <router-view />
  </div>
</template>

<script>

export default {

}
</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
@import '../styles/blocks/adaptive.pcss';
</style>

<style lang="postcss" scoped src="./app.pcss">

</style>