<template>
  <div class="user-component">
    <avatar size="2.9" :src="userPic" />
    <div class="username">Владимир Астахов</div>
  </div>
</template>

<script>
import Avatar from "../avatar/avatar";
export default {
  components: {Avatar},
  computed: {
    userPic() {
      return require("../../../images/content/user.jpg").default;
    }
  }
}
</script>

<style scoped src="./user.pcss">

</style>