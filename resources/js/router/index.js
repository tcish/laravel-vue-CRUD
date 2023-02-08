import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";

// import Home from "../pages/Home.vue";
// import Create from "../pages/Create.vue";
// import Edit from "../pages/Edit.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
        meta: { guestOnly: true },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { guestOnly: true },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { authOnly: true },
    },

    // {
    //     path: "/",
    //     name: "home",
    //     component: Home,
    // },
    // {
    //     path: "/create",
    //     name: "create",
    //     component: Create,
    // },
    // {
    //     path: "/edit/:id",
    //     name: "edit",
    //     component: Edit,
    // },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

function isLoggedIn() {
    return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.authOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                path: "/login",
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.guestOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                path: "/dashboard",
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

export default router;
