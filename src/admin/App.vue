<template>
  <div class="app-container" >
    <router-view name="header" />
    <router-view />
    <div :class="['notify-container', {active: isTooltipShown}]">
      <div class="notification">
        <notification
        :text="tooltipText"
        :type="tooltipType"
        @click="hideTooltip"/>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "./components/notification/notification";
import {mapState, mapActions} from "vuex";

export default {
  components: {Notification},
  computed: {
    ...mapState("tooltips", {
      isTooltipShown: state => state.isShown,
      tooltipText: state => state.text,
      tooltipType: state => state.type
    })
  },
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide"
    })
  }
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