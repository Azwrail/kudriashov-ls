<template>
  <div class="app-container">
    <headline title="Панель администрирования">
      <user></user>
    </headline>
    <navigation></navigation>
    <div class="page-content">
      <div class="admin-container page-content-container">
        <div class="header">
          <div class="title">Блок "Обо мне"</div>
          <iconed-btn
              type="iconed"
              @click="emptyBlank = true"
              title="Добавить группу"
              v-if="emptyBlank === false">
          </iconed-btn>
        </div>
        <ul class="blanks">
          <li class="item" v-if="emptyBlank">
            <blank
                empty
                @remove="emptyBlank = false">
            </blank>
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <blank :title="category.category" :skills="category.skills"></blank>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Headline from "./components/headline/headline";
import User from "./components/user/user";
import Navigation from "./components/nav/navigation";
import IconedBtn from "./components/button/types/iconedBtn/iconedBtn";
import Blank from "./components/blank/blank";
export default {
  components: {Blank, IconedBtn, User, Headline, Navigation},
  data() {
    return {
      categories: [],
      emptyBlank: false
    }
  },
  created() {
    this.categories = require("./data/blank.json");
    console.log(this.categories)
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