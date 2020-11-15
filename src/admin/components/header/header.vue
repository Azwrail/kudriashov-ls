<template>
  <div class="header-component">
    <headline title="Панель администрирования">
      <user />
    </headline>
    <navigation />
  </div>
</template>

<script>
import navigation from "../nav/navigation";
import Headline from "../headline/headline";
import User from "../user/user";
export default {
  components: {User, Headline, navigation}
}
</script>

<style scoped>

</style>