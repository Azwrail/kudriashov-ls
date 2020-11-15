<template>
  <div
      :class="['tag', {interactive: interactive}]"><span>{{ title }}</span>
    <button class="remove" v-if="interactive" type="button" v-on="$listeners"></button>
  </div>
</template>

<script>
import Icon from "../icon/icon";
import Button from "../button/button";
export default {
  components: {Button, Icon},
  props: {
    title: {
      type: String,
      default: ""
    },
    interactive: {
      type: Boolean
    }
  }
}
</script>

<style lang="postcss" scoped src="./tag.pcss"></style>