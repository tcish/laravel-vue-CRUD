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
        component: () => import("../views/Dashboard.vue"),
        redirect: "/body",
        meta: { authOnly: true },
        children: [
            {
                path: "/body",
                name: "Home",
                component: () => import("../views/Home.vue"),
                meta: {
                    title: "Home",
                },
            },
            {
                path: "/dashboard/list",
                name: "List",
                component: () => import("../views/pages/crud/Home.vue"),
                meta: {
                    title: "List",
                },
            },
            {
                path: "/dashboard/create",
                name: "Create",
                component: () => import("../views/pages/crud/Create.vue"),
                meta: {
                    title: "Create",
                },
            },
            {
                path: "/dashboard/edit/:id",
                name: "Edit",
                component: () => import("../views/pages/crud/Edit.vue"),
                meta: {
                    title: "Edit",
                },
            },
        ],
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
                path: "/",
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
