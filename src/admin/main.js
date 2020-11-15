import Vue from 'vue';
import App from './App.vue'
import { store } from "./store/store";
import router from "./router";
import VueSimpleValidator from "simple-vue-validator"
import axios from 'axios'
import VueAxios from "vue-axios";


Vue.use(VueSimpleValidator, {mode: 'manual'});
Vue.use(VueAxios, axios)

new Vue({
  el: "#app-root",
  store,
  router,
  render: h => h(App)
});