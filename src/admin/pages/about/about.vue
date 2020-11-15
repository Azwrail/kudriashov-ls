<template>
  <div class="about-page">
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
import Blank from "../../components/blank/blank";
import IconedBtn from "../../components/button/types/iconedBtn/iconedBtn";

export default {
  components: {Blank, IconedBtn},
  data() {
    return {
      categories: [],
      emptyBlank: false
    }
  },
  created() {
    this.categories = require("../../data/blank.json");
    console.log(this.categories)
  }
}
</script>

<style scoped lang="postcss" src="./about.pcss">

</style>