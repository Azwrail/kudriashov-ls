import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import about from "./pages/about";
import login from "./pages/login";
import header from "./components/header";
import works from "./pages/works";
import reviews from "./pages/reviews";
import store from "./store/store";
import axios from "axios";
import $axios from "./request";

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
        component: login,
        meta: {
            public: true
        }
    },
    {
        path: "/works",
        components: {
            default: works,
            header: header
        }
    },
    {
        path: "/reviews",
        components: {
            default: reviews,
            header: header
        }
    }
];

const router = new VueRouter({ routes});

// const guard = axios.create({
//     baseURL: "https://webdev-api.loftschool.com/"
// })
router.beforeEach(async (to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLoggedIn = store.getters["user/userIsLoggedIn"];
    console.log(isUserLoggedIn)
    console.log(isPublicRoute)
    if (isPublicRoute === false && isUserLoggedIn === false) {
        try {
            const response = await $axios.get("user");
            store.dispatch("user/login", response.data.user);
            next();
        } catch (error) {
            router.replace("/login");
            localStorage.removeItem("token");
        }
    } else {
        next();
    }
});
export default router;