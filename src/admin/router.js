import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import about from "./pages/about";
import login from "./pages/login";
import header from "./components/header";
const routes = [
    {
        path: "/",
        components: {
            default: about,
            header: header
        }
    },
    {
        path: "/login",
        component: login
    }
];

export default new VueRouter({ routes});