<template>
  <nav class="navigation-component">
    <div class="admin-container navigation-container">
      <ul class="list">
        <li :class="['item', {active: this.$route.path === '/'}]">
          <router-link to="/" class="link">Обо мне</router-link>
        </li>
        <li :class="['item', {active: this.$route.path === '/works'}]">
        <router-link to="/works" class="link">Работы</router-link>
        </li>
        <li :class="['item', {active: this.$route.path === '/reviews'}]">
          <router-link to="/reviews" class="link">Отзывы</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {

}
</script>

<style scoped src="./navigation.pcss">

</style>