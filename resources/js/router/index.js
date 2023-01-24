import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Create from "../pages/Create.vue";
import Edit from "../pages/Edit.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/create",
        name: "create",
        component: Create,
    },
    {
        path: "/edit/:id",
        name: "edit",
        component: Edit,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
